import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  type SettingsState,
  changeChatGptApiKey,
  changeChatGptEngine,
  changeLanguage,
  changeOllamaUrl,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsLanguage,
  selectSettingsOllamaUrl,
  selecteSettingsOllamaModel,
  updateOllamaModel,
} from '../store/reducers/settingsSlice';
import { useGetLanguagesQuery } from '../store/service/tldraidApi';
import { setToastError } from '../store/reducers/loadAndErrorSlice';
import useFetchOllamaModels from '../hooks/useFetchOllamaModels';
import { CHAT_GPT_ENGINES } from '../@types';

interface SettingsFormInputs {
  language: SettingsState['language'];
  chatGptEngine: SettingsState['chatGptEngine'];
  chatGptApiKey: SettingsState['chatGptApiKey'];
  ollamaUrl: SettingsState['ollamaUrl'];
  ollamaModel: string;
}

const Settings = () => {
  const history = useHistory();

  const { data: languagesResponse, isLoading, isError } = useGetLanguagesQuery('');

  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);

  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);
  const ollamaUrl = useAppSelector(selectSettingsOllamaUrl);
  const ollamaModel = useAppSelector(selecteSettingsOllamaModel);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<SettingsFormInputs>({
    defaultValues: {
      language,
      chatGptEngine,
      chatGptApiKey,
      ollamaUrl,
      ollamaModel,
    },
  });

  const { isServerFound, serverModels } = useFetchOllamaModels(getValues('ollamaUrl'));

  useEffect(() => {
    if (!isServerFound) {
      setError('ollamaUrl', {
        message: 'API server with this address not found',
      });
    }

    if (serverModels.length) {
      if (serverModels.find(model => model.name === ollamaModel)) {
        setValue('ollamaModel', ollamaModel);
      } else {
        setValue('ollamaModel', serverModels[0].name);
      }
    } else {
      setValue('ollamaModel', '');
    }
  }, [isServerFound, ollamaModel, serverModels, setError, setValue]);

  const updateSettings: SubmitHandler<SettingsFormInputs> = data => {
    dispatch(changeLanguage(data.language));
    dispatch(changeChatGptEngine(data.chatGptEngine));
    dispatch(changeChatGptApiKey(data.chatGptApiKey));
    dispatch(changeOllamaUrl(data.ollamaUrl));
    dispatch(updateOllamaModel(data.ollamaModel));

    history.push('/');
  };

  if (isError) {
    dispatch(setToastError('Failed to get available languages'));

    return null;
  }

  if (isLoading) {
    return (
      <div className='flex flex-grow justify-center items-center'>
        <Spinner size='xl' />
      </div>
    );
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
              rules={{
                minLength: {
                  value: 15,
                  message: 'API key is too short',
                },
                pattern: {
                  value: new RegExp(/^(?=.*\D)[^\s]+$/), // do not allow numeric-only and whitespaces
                  message: 'API key format is invalid',
                },
              }}
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
              rules={{
                pattern: {
                  value: new RegExp(/^https?:\/\/.+$/),
                  message: 'Invalid URL',
                },
              }}
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
                <Select {...field}>
                  {serverModels.map(({ digest, model, name }) => (
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
            (getValues('ollamaUrl').length > 0 && serverModels.length === 0)
          }>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
