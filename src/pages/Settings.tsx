import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { CHAT_GPT_ENGINES } from '../@types';
import { getOllamaModels, handleOllamaServerError, OllamaModel } from '../api/ollamaApi';
import Loader from '../components/molecules/Loader';
import useAppError from '../hooks/useAppError';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  changeChatGptApiKey,
  changeChatGptEngine,
  changeLanguage,
  changeOllamaUrl,
  selecteSettingsOllamaModel,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsLanguage,
  selectSettingsOllamaUrl,
  updateOllamaModel,
} from '../store/reducers/settingsSlice';
import { useGetLanguagesQuery } from '../store/service/tldraidApi';

const settingsSchema = yup.object({
  language: yup.string().required(),
  chatGptEngine: yup.string().oneOf(CHAT_GPT_ENGINES).required(),
  chatGptApiKey: yup
    .string()
    .trim()
    .ensure()
    .matches(/^.{15,}$/, {
      message: 'API ket is too short',
      excludeEmptyString: true,
    })
    .matches(/^(?=.*\D)[^\s]+$/, {
      message: 'Not a valid API key',
      excludeEmptyString: true,
    }),
  ollamaUrl: yup
    .string()
    .ensure()
    .matches(/^https?:\/\/.+$/, { message: 'Not a valid URL', excludeEmptyString: true })
    .matches(/[^/]$/, {
      message: 'Remove trailing slash from the url',
      excludeEmptyString: true,
    }),
  ollamaModel: yup.string().ensure(),
});

type SettingsFormInputs = yup.InferType<typeof settingsSchema>;

const Settings = () => {
  const history = useHistory();

  const {
    data: languagesResponse,
    isLoading: isLanguagesLoading,
    isError: isLanguagesError,
  } = useGetLanguagesQuery('');

  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);

  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);
  const ollamaUrl = useAppSelector(selectSettingsOllamaUrl);
  const ollamaModel = useAppSelector(selecteSettingsOllamaModel);

  const { throwAppError, clearAppError } = useAppError();

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm<SettingsFormInputs>({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      language,
      chatGptEngine,
      chatGptApiKey,
      ollamaUrl,
      ollamaModel,
    },
  });

  const [ollamaServerModels, setOllamaServerModels] = useState<OllamaModel[]>([]);

  const currentOllamaUrl = getValues('ollamaUrl').trim();
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
    if (!currentOllamaUrl.trim()) {
      clearAppError();

      setOllamaServerModels([]);
      setValue('ollamaModel', '');
    } else if (/^https?:\/\/.+$/.test(currentOllamaUrl.trim())) {
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
    fetchOllamaModels,
    ollamaModel,
    queryClient,
    setValue,
    throwAppError,
  ]);

  const updateSettings: SubmitHandler<SettingsFormInputs> = data => {
    dispatch(changeLanguage(data.language));
    dispatch(changeChatGptEngine(data.chatGptEngine));
    dispatch(changeChatGptApiKey(data.chatGptApiKey));
    dispatch(changeOllamaUrl(data.ollamaUrl));
    dispatch(updateOllamaModel(data.ollamaModel));

    history.push('/');
  };

  if (isLanguagesLoading) {
    return <Loader size='xl' />;
  }

  if (isLanguagesError) {
    throwAppError('Failed to get available languages');

    return null;
  }

  return (
    <div className='w-11/12 md:w-5/12 mx-auto mt-8 opacity-0 animate-fade-in-no-delay'>
      <form
        onSubmit={handleSubmit(updateSettings)}
        className='flex w-full flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='language'
              value='Language:'
            />
          </div>
          <Controller
            name='language'
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
            <div className='mb-2 block'>
              <Label
                htmlFor='chatGptEngine'
                value='GPT engine version:'
              />
            </div>
            <Controller
              name='chatGptEngine'
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {CHAT_GPT_ENGINES.map(engine => (
                    <option key={engine}>{engine}</option>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='chatGptApiKey'
                value='OpenAI API key:'
              />
            </div>
            <Controller
              name='chatGptApiKey'
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type='password'
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
            <div className='mb-2 block'>
              <Label
                htmlFor='ollamaUrl'
                value='Ollama API server URL:'
              />
            </div>
            <Controller
              name='ollamaUrl'
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type='text'
                  placeholder='http://localhost:11434'
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
            <div className='mb-2 block'>
              <Label
                htmlFor='ollamaModels'
                value='Ollama model:'
              />
            </div>
            <Controller
              name='ollamaModel'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  disabled={ollamaServerModels.length === 0}>
                  {ollamaServerModels.map(({ digest, model, name }) => (
                    <option
                      key={digest}
                      value={model}>
                      {name}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>
        </>

        <Button
          type='submit'
          disabled={
            Object.keys(errors).length > 0 ||
            (currentOllamaUrl !== '' && ollamaServerModels.length === 0)
          }>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
