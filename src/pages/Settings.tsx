import { useHistory } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  SettingsState,
  changeChatGptApiKey,
  changeChatGptEngine,
  changeLanguage,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsLanguage,
} from '../store/reducers/settingsSlice';
import { useGetLanguagesQuery } from '../store/service/tldraidApi';
import { setError } from '../store/reducers/loadAndErrorSlice';
import { CHAT_GPT_ENGINES } from '../@types';

interface SettingsFormInputs {
  language: SettingsState['language'];
  chatGptEngine: SettingsState['chatGptEngine'];
  chatGptApiKey: SettingsState['chatGptApiKey'];
}

const Settings = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);

  const { data: languagesResponse, isLoading, isError } = useGetLanguagesQuery('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SettingsFormInputs>({
    defaultValues: {
      language,
      chatGptEngine,
      chatGptApiKey,
    },
  });

  const updateSettings: SubmitHandler<SettingsFormInputs> = data => {
    dispatch(changeLanguage(data.language));
    dispatch(changeChatGptEngine(data.chatGptEngine));
    dispatch(changeChatGptApiKey(data.chatGptApiKey));

    history.push('/');
  };

  if (isError) {
    dispatch(setError('Failed to get available languages'));

    return null;
  }

  if (isLoading) {
    return (
      <div className='flex flex-grow justify-center items-center'>
        <Spinner
          size='xl'
          className=''
        />
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
                onChange={e => {
                  field.onChange(e);
                  trigger('chatGptApiKey');
                }}
              />
            )}
          />
          {errors.chatGptApiKey && (
            <p className='mt-2 text-xs text-red-700 dark:text-red-700'>
              {errors.chatGptApiKey.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={Object.keys(errors).length > 0}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
