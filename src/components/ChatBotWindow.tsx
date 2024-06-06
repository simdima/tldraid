import { useQuery } from '@tanstack/react-query';
import { Button, Textarea, Tooltip } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FaRobot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { handleChatGptError, sendChatGptCompletionRequest } from '../api/chatGptApi';
import { handleOllamaServerError, sendOllamaChatCompletionRequest } from '../api/ollamaApi';
import { ChatBotResponse, chatBotResponsesAtom } from '../atoms/chatBotAnswers';
import { utilityAtom } from '../atoms/utility';
import useAppError from '../hooks/useAppError';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selecteSettingsOllamaModel,
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsOllamaUrl,
  selectSettingsPlatform,
} from '../store/reducers/settingsSlice';
// import { addBotAnswer, selectUtilityName } from '../store/reducers/utilitySlice';
import ChatGPTLogo from './molecules/ChatGPTLogo';
import Loader from './molecules/Loader';
import OllamaLogo from './molecules/OllamaLogo';

const ChatBotWindow = (): JSX.Element | null => {
  const { throwAppError } = useAppError();

  const dispatch = useAppDispatch();

  // const utility = useAppSelector(selectUtilityName);
  const [utility] = useAtom(utilityAtom);

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

  const [, setChatBotResponses] = useAtom(chatBotResponsesAtom);
  const updateChatBotResponses = (newChatBotResponse: ChatBotResponse) => {
    setChatBotResponses(prev => {
      if (utility) {
        const updatedResponses: ChatBotResponse[] = [];

        if (prev[utility]) {
          const existingResponses = { ...prev }[utility];
          updatedResponses.push(...existingResponses);
          updatedResponses.push(newChatBotResponse);
        } else {
          updatedResponses.push(newChatBotResponse);
        }

        return {
          ...prev,
          [utility]: updatedResponses,
        };
      }

      return prev;
    });
  };

  const [chatQuery, setChatQuery] = useState('');
  useEffect(() => {
    setChatQuery('');
  }, [utility]);

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
        // dispatch(
        //   addBotAnswer({
        //     id: uuid(),
        //     content: data.choices[0].message.content,
        //   })
        // );
        updateChatBotResponses({
          id: uuid(),
          content: data.choices[0].message.content,
        });

        setChatQuery('');
      }
    } else {
      const { data, error, isSuccess, isError } = await sendOllamaQuery();

      if (isError) {
        throwAppError(handleOllamaServerError(error));
      }

      if (isSuccess) {
        // dispatch(
        //   addBotAnswer({
        //     id: uuid(),
        //     content: data.response,
        //   })
        // );
        updateChatBotResponses({
          id: uuid(),
          content: data.response,
        });
      }
    }
  };

  return utility ? (
    <div className="fixed bottom-3 right-3 flex w-full justify-end">
      <Tooltip
        className="z-50 bg-gray-100 duration-0"
        trigger="click"
        content={
          chatGptApiKey || (ollamaUrl && ollamaModel.length) ? (
            <>
              <Textarea
                className="h-52 w-72 p-4 focus-visible:outline-none md:w-96"
                value={chatQuery}
                disabled={isBotQueryInProgress}
                onChange={({ target: { value } }) => setChatQuery(value)}
                placeholder={`What do you want to ask ${selectedBot} about ${utility}?`}
              />
              <div className="flex justify-between">
                <button
                  disabled={isBotQueryInProgress}
                  className="mt-2 h-fit w-fit cursor-pointer self-center rounded-full bg-cyan-normal hover:bg-cyan-deep"
                  onClick={changeSelectedBot}
                >
                  {selectedBot === 'ChatGPT' ? <ChatGPTLogo /> : <OllamaLogo />}
                </button>
                <Button
                  disabled={isBotQueryInProgress || !chatQuery}
                  className="float-right mt-2 w-24"
                  onClick={sendChatBotQuery}
                >
                  {isBotQueryInProgress ? (
                    <Loader size="sm" />
                  ) : (
                    <span className="transition-none">Ask</span>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="w-80 p-4">
              <p className="text-black dark:text-white">
                To ask a bot questions, first either add your{' '}
                <span className="text-cyan-normal">OpenAI</span> API key or configure{' '}
                <span className="text-cyan-normal">Ollama </span>
                server in
                <span>
                  {' '}
                  <Link
                    className="cursor-pointer text-cyan-normal underline hover:text-cyan-deep md:whitespace-pre"
                    to="/settings"
                  >
                    Settings
                  </Link>{' '}
                </span>
              </p>
            </div>
          )
        }
      >
        <Button
          disabled={isBotQueryInProgress}
          className="z-50 flex h-12 w-12 animate-none items-center justify-center rounded-full border-none p-0 shadow-2xl hover:animate-bounce"
        >
          <FaRobot scale={100} className="text-xl" />
        </Button>
      </Tooltip>
    </div>
  ) : null;
};

export default ChatBotWindow;
