import { useQuery } from '@tanstack/react-query';
import { Button, Textarea, Tooltip } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { FaRobot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { handleChatGptError, sendChatGptCompletionRequest } from '../api/chatGptApi';
import { handleOllamaServerError, sendOllamaChatCompletionRequest } from '../api/ollamaApi';
import useAppError from '../hooks/useAppError';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selecteSettingsOllamaModel,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsOllamaUrl,
  selectSettingsPlatform,
} from '../store/reducers/settingsSlice';
import { addBotAnswer, selectUtilityName } from '../store/reducers/utilitySlice';
import ChatGPTLogo from './molecules/ChatGPTLogo';
import Loader from './molecules/Loader';
import OllamaLogo from './molecules/OllamaLogo';

const ChatBotWindow = (): JSX.Element | null => {
  const { throwAppError } = useAppError();

  const dispatch = useAppDispatch();

  const utility = useAppSelector(selectUtilityName);

  const platform = useAppSelector(selectSettingsPlatform);
  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);
  const ollamaUrl = useAppSelector(selectSettingsOllamaUrl);
  const ollamaModel = useAppSelector(selecteSettingsOllamaModel);

  const [selectedBot, setSelectedBot] = useState<'ChatGPT' | 'Ollama'>(
    chatGptApiKey ? 'ChatGPT' : 'Ollama'
  );
  const changeSelectedBot = () => {
    setSelectedBot(prevBot => {
      if (prevBot === 'Ollama' && chatGptApiKey) return 'ChatGPT';
      if (prevBot === 'ChatGPT' && ollamaUrl && ollamaModel.length) return 'Ollama';

      return prevBot;
    });
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [botChatboxOpen, setBotChatboxOpen] = useState(false);

  const [chatQuery, setChatQuery] = useState('');
  useEffect(() => {
    setChatQuery('');
  }, [utility]);

  const toggleChatBotWindow = () => {
    setBotChatboxOpen(isOpen => !isOpen);
    setTimeout(() => {
      if (botChatboxOpen) textAreaRef.current?.focus();
    }, 0);
  };

  const { isLoading: isChatGptQueryInProgress, refetch: sendChatGptQuery } = useQuery({
    queryKey: ['chatGptApiQuery', { platform, utility, chatGptEngine, chatGptApiKey, chatQuery }],
    queryFn: sendChatGptCompletionRequest,
    enabled: false,
    gcTime: 0,
    retry: false,
  });

  const { isLoading: isOllamaQueryInProgress, refetch: sendOllamaQuery } = useQuery({
    queryKey: ['ollamaApiQuery', { platform, utility, ollamaUrl, ollamaModel, chatQuery }],
    queryFn: sendOllamaChatCompletionRequest,
    enabled: false,
    gcTime: 0,
    retry: false,
  });

  const isBotQueryInProgress = isChatGptQueryInProgress || isOllamaQueryInProgress;

  const sendChatBotQuery = async () => {
    if (selectedBot === 'ChatGPT') {
      const { data, error, isSuccess, isError } = await sendChatGptQuery();

      if (isError) {
        throwAppError(handleChatGptError(error));
      }

      if (isSuccess) {
        dispatch(
          addBotAnswer({
            id: uuid(),
            content: data.choices[0].message.content,
          })
        );

        setChatQuery('');
        setBotChatboxOpen(false);
      }
    } else {
      const { data, error, isSuccess, isError } = await sendOllamaQuery();

      if (isError) {
        throwAppError(handleOllamaServerError(error));
      }

      if (isSuccess) {
        dispatch(
          addBotAnswer({
            id: uuid(),
            content: data.response,
          })
        );
      }
    }
  };

  return utility ? (
    <div className='fixed w-full flex justify-end bottom-3 right-3'>
      <Tooltip
        className='z-50 duration-0 bg-gray-100'
        trigger='click'
        content={
          chatGptApiKey || (ollamaUrl && ollamaModel.length) ? (
            <>
              <Textarea
                className='focus-visible:outline-none p-4 w-72 md:w-96 h-52 '
                value={chatQuery}
                disabled={isBotQueryInProgress}
                onChange={({ target: { value } }) => setChatQuery(value)}
                placeholder={`What do you want to ask ${selectedBot} about ${utility}?`}
              />
              <div className='flex justify-between'>
                <button
                  disabled={isBotQueryInProgress}
                  className='w-fit h-fit self-center mt-2 rounded-full bg-cyan-normal cursor-pointer hover:bg-cyan-deep'
                  onClick={changeSelectedBot}>
                  {selectedBot === 'ChatGPT' ? <ChatGPTLogo /> : <OllamaLogo />}
                </button>
                <Button
                  disabled={isBotQueryInProgress || !chatQuery}
                  className='mt-2 float-right w-24'
                  onClick={sendChatBotQuery}>
                  {isBotQueryInProgress ? (
                    <Loader size='sm' />
                  ) : (
                    <span className='transition-none'>Ask</span>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className='w-80 p-4'>
              <p className='text-black dark:text-white'>
                To ask a bot questions, first either add your{' '}
                <span className='text-cyan-normal'>OpenAI</span> API key or configure{' '}
                <span className='text-cyan-normal'>Ollama </span>
                server in
                <span>
                  {' '}
                  <Link
                    className='underline md:whitespace-pre text-cyan-normal hover:text-cyan-deep cursor-pointer'
                    to='/settings'>
                    Settings
                  </Link>{' '}
                </span>
              </p>
            </div>
          )
        }>
        <Button
          onClick={toggleChatBotWindow}
          disabled={isBotQueryInProgress}
          className='p-0 rounded-full w-12 h-12 border-none shadow-2xl z-50 animate-none hover:animate-bounce'>
          <FaRobot
            scale={100}
            className='text-xl'
          />
        </Button>
      </Tooltip>
    </div>
  ) : null;
};

export default ChatBotWindow;
