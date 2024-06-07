import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { z } from 'zod';

import { getOllamaModels } from '../api/ollamaApi';
import { getLanguages } from '../api/tldraidApi';
import { globalErrorAtom } from '../atoms/globalError';
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
import useDebouncedValue from '../hooks/debouncedValue';

const SettingsSchema = z.object({
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
    data: availableLanguages,
    isLoading: isLanguagesLoading,
    isError: isLanguagesError,
  } = useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages,
    staleTime: 1000 * 60 * 60,
  });

  const [language, setLanguage] = useAtom(languageAtom);

  const [chatGptEngine, setChatGptEngine] = useAtom(chatGptEngineAtom);
  const [chatGptApiKey, setChatGptApiKey] = useAtom(chatGptApiKeyAtom);
  const [ollamaUrl, setOllamaUrl] = useAtom(ollamaUrlAtom);
  const [ollamaModel, setOllamaModel] = useAtom(ollamaModelAtom);

  const [, setGlobalError] = useAtom(globalErrorAtom);

  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SettingsFormInputs>({
    resolver: zodResolver(SettingsSchemaAdjusted),
    defaultValues: {
      language,
      chatGptEngine,
      chatGptApiKey,
      ollamaUrl,
      ollamaModel,
    },
    mode: 'onChange',
  });

  const updateSettings: SubmitHandler<SettingsFormInputs> = data => {
    setLanguage(data.language);
    setChatGptEngine(data.chatGptEngine);
    setChatGptApiKey(data.chatGptApiKey);
    setOllamaUrl(data.ollamaUrl);
    setOllamaModel(data.ollamaUrl ? data.ollamaModel : '');

    history.push('/');
  };

  const currentOllamaUrl = watch('ollamaUrl');
  const { debouncedValue: debouncedCurrentOllamaUrl } = useDebouncedValue(currentOllamaUrl);

  const { data, error, isSuccess } = useQuery({
    queryKey: ['ollamaModels', debouncedCurrentOllamaUrl],
    queryFn: () => getOllamaModels(debouncedCurrentOllamaUrl),
    enabled: !!debouncedCurrentOllamaUrl && !errors.ollamaUrl,
    retry: false,
  });

  useEffect(() => {
    if (error || (isSuccess && !data.models)) {
      setGlobalError('No available models found at this URL');
    } else {
      setGlobalError('');
    }
  }, [data, error, isSuccess, setGlobalError]);

  if (isLanguagesLoading) {
    return <Loader size="xl" />;
  }

  if (isLanguagesError) {
    setGlobalError('Failed to get available languages');

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
              <Select {...field} aria-label="language">
                {availableLanguages?.map(language => <option key={language}>{language}</option>)}
              </Select>
            )}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="chatGptEngine" value="GPT engine version:" />
          </div>
          <Controller
            name="chatGptEngine"
            control={control}
            render={({ field }) => (
              <Select {...field} aria-label="chatGptEngine">
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
                aria-label="chatGptApiKey"
                color={errors.chatGptApiKey ? 'failure' : 'gray'}
                helperText={errors.chatGptApiKey && <span>{errors.chatGptApiKey.message}</span>}
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
                aria-label="ollamaServerUrl"
                placeholder="http://localhost:11434"
                color={errors.ollamaUrl ? 'failure' : 'gray'}
                helperText={errors.ollamaUrl && <span>{errors?.ollamaUrl.message}</span>}
              />
            )}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="ollamaModel" value="Ollama model:" />
          </div>
          <Controller
            name="ollamaModel"
            aria-label="ollamaModel"
            control={control}
            render={({ field }) => (
              <Select {...field} disabled={!data?.models}>
                {data?.models.map(({ digest, model, name }) => (
                  <option key={digest} value={model}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0 || (!!currentOllamaUrl && !data?.models)}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
