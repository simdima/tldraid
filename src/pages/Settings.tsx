import { useHistory } from 'react-router-dom';
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  changeChatGptApiKey,
  changeChatGptEngine,
  changeLanguage,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsLanguage,
} from '../store/reducers/settingsSlice';
import { useGetLanguagesQuery } from '../store/service/tldraidApi';
import React, { useState } from 'react';
import { setError } from '../store/reducers/loadAndErrorSlice';
import { CHAT_GPT_ENGINES, ChatGptEngine } from '../@types';

const Settings = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);

  const { data: languagesResponse, isLoading, isError } = useGetLanguagesQuery('');

  const [manpagesLanguage, setManpagesLanguage] = useState(language);
  const [engine, setEngine] = useState(chatGptEngine);
  const [apiKey, setApiKey] = useState(chatGptApiKey);

  function handleSaveClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(changeLanguage(manpagesLanguage));
    dispatch(changeChatGptEngine(engine));
    dispatch(changeChatGptApiKey(apiKey));

    history.push('/');
  }

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
      <h1 className='text-xl mb-4 text-cyan-normal font-bold text-right'>Settings</h1>
      <form
        onSubmit={handleSaveClick}
        className='flex w-full flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='manpages_language'
              value='Language:'
            />
          </div>
          <Select
            id='manpages_language'
            value={manpagesLanguage}
            onChange={({ target: { value } }) => setManpagesLanguage(value)}>
            {languagesResponse &&
              languagesResponse?.data.map(language => <option key={language}>{language}</option>)}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='gpt_engine'
              value='GPT engine version:'
            />
          </div>
          <Select
            id='gpt_engine'
            value={engine}
            onChange={({ target: { value } }) => setEngine(value as ChatGptEngine)}>
            {CHAT_GPT_ENGINES.map(engine => (
              <option key={engine}>{engine}</option>
            ))}
          </Select>
        </div>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='gpt_apikey'
              value='OpenAI API key:'
            />
          </div>
          <TextInput
            id='gpt_apikey'
            type='password'
            value={apiKey}
            onChange={({ target: { value } }) => setApiKey(value)}
          />
        </div>

        <Button type='submit'>Save</Button>
      </form>
    </div>
  );
};

export default Settings;