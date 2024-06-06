import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { z } from 'zod';

import { getOllamaModels, handleOllamaServerError, OllamaModel } from '../api/ollamaApi';
import { getLanguages } from '../api/tldraidApi';
import {
  chatGptApiKeyAtom,
  chatGptEngineAtom,
  ChatGptEngineSchema,
  languageAtom,
  ollamaModelAtom,
  ollamaUrlAtom,
  PlatformSchema,
} from '../atoms/settings';
import Loader from '../components/molecules/Loader';
import useAppError from '../hooks/useAppError';

export const SettingsSchema = z.object({
  language: z.string().min(2).max(5),
  platform: PlatformSchema,
  chatGptEngine: ChatGptEngineSchema,
  chatGptApiKey: z.string().trim().min(15, { message: 'API key is too short' }).or(z.literal('')),
  ollamaUrl: z
    .string()
    .trim()
    .url()
    .regex(/[^/]$/, { message: 'Remove trailing slash' })
    .or(z.literal('')),
  ollamaModel: z.string().or(z.literal('')),
});

const SettingsSchemaAdjusted = SettingsSchema.omit({ platform: true });
type SettingsFormInputs = z.infer<typeof SettingsSchemaAdjusted>;

const Settings = () => {
  const history = useHistory();

  const {
    data: languagesResponse,
    isLoading: isLanguagesLoading,
    isError: isLanguagesError,
  } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
    staleTime: Infinity,
  });

  const [language, setLanguage] = useAtom(languageAtom);

  const [chatGptEngine, setChatGptEngine] = useAtom(chatGptEngineAtom);
  const [chatGptApiKey, setChatGptApiKey] = useAtom(chatGptApiKeyAtom);
  const [ollamaUrl, setOllamaUrl] = useAtom(ollamaUrlAtom);
  const [ollamaModel, setOllamaModel] = useAtom(ollamaModelAtom);

  const { throwAppError, clearAppError } = useAppError();

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm<SettingsFormInputs>({
    resolver: zodResolver(SettingsSchemaAdjusted),
    defaultValues: {
      language,
      chatGptEngine,
      chatGptApiKey,
      ollamaUrl,
      ollamaModel,
    },
  });

  const [ollamaServerModels, setOllamaServerModels] = useState<OllamaModel[]>([]);

  const currentOllamaUrl = getValues('ollamaUrl');
  const queryClient = useQueryClient();
  const { refetch: fetchOllamaModels } = useQuery({
    queryKey: ['ollamaModels', ollamaModel, errors],
    queryFn: () => getOllamaModels(currentOllamaUrl),
    enabled: false,
    retry: false,
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (errors.ollamaUrl || !currentOllamaUrl) {
      clearAppError();

      setOllamaServerModels([]);
      setValue('ollamaModel', '');
    } else {
      const timeout = setTimeout(async () => {
        queryClient.removeQueries({ queryKey: ['ollamaModels'] });

        const { data, isError, isSuccess, error } = await fetchOllamaModels();

        if (isError) {
          setOllamaServerModels([]);
          setValue('ollamaModel', '');

          throwAppError(handleOllamaServerError(error));
        }
        if (isSuccess) {
          clearAppError();

          setOllamaServerModels(data.models);

          if (data.models.find(m => m.name === ollamaModel)) {
            setValue('ollamaModel', ollamaModel);
          } else {
            setValue('ollamaModel', data.models[0].name);
          }
        }
      }, 1e3);

      return () => clearTimeout(timeout);
    }
  }, [
    clearAppError,
    currentOllamaUrl,
    errors,
    fetchOllamaModels,
    ollamaModel,
    queryClient,
    setValue,
    throwAppError,
  ]);

  const updateSettings: SubmitHandler<SettingsFormInputs> = data => {
    setLanguage(data.language);
    setChatGptEngine(data.chatGptEngine);
    setChatGptApiKey(data.chatGptApiKey);
    setOllamaUrl(data.ollamaUrl);
    setOllamaModel(data.ollamaModel);

    history.push('/');
  };

  if (isLanguagesLoading) {
    return <Loader size="xl" />;
  }

  if (isLanguagesError) {
    throwAppError('Failed to get available languages');

    return null;
  }

  return (
    <div className="mx-auto mt-8 w-11/12 animate-fade-in-no-delay opacity-0 md:w-5/12">
      <form onSubmit={handleSubmit(updateSettings)} className="flex w-full flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="language" value="Language:" />
          </div>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                {languagesResponse &&
                  languagesResponse.map(language => <option key={language}>{language}</option>)}
              </Select>
            )}
          />
        </div>

        <>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="chatGptEngine" value="GPT engine version:" />
            </div>
            <Controller
              name="chatGptEngine"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {ChatGptEngineSchema.options.map(engine => (
                    <option key={engine}>{engine}</option>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="chatGptApiKey" value="OpenAI API key:" />
            </div>
            <Controller
              name="chatGptApiKey"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="password"
                  color={errors.chatGptApiKey ? 'failure' : 'gray'}
                  helperText={errors.chatGptApiKey && <span>{errors.chatGptApiKey.message}</span>}
                  onChange={e => {
                    field.onChange(e);
                    trigger('chatGptApiKey');
                  }}
                />
              )}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ollamaUrl" value="Ollama API server URL:" />
            </div>
            <Controller
              name="ollamaUrl"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="text"
                  placeholder="http://localhost:11434"
                  onChange={e => {
                    field.onChange(e);
                    trigger('ollamaUrl');
                  }}
                  color={errors.ollamaUrl ? 'failure' : 'gray'}
                  helperText={errors.ollamaUrl && <span>{errors?.ollamaUrl.message}</span>}
                />
              )}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ollamaModels" value="Ollama model:" />
            </div>
            <Controller
              name="ollamaModel"
              control={control}
              render={({ field }) => (
                <Select {...field} disabled={ollamaServerModels.length === 0}>
                  {ollamaServerModels.map(({ digest, model, name }) => (
                    <option key={digest} value={model}>
                      {name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>
        </>

        <Button
          type="submit"
          disabled={
            Object.keys(errors).length > 0 ||
            (currentOllamaUrl !== '' && ollamaServerModels.length === 0)
          }
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
