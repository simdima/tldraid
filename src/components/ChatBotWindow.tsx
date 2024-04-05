import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Button, Textarea, Tooltip } from 'flowbite-react';
import { FaRobot } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsOllamaUrl,
  selectSettingsPlatform,
  selecteSettingsOllamaModel,
} from '../store/reducers/settingsSlice';
import { addBotAnswer, selectUtilityName } from '../store/reducers/utilitySlice';
import { setToastError } from '../store/reducers/loadAndErrorSlice';
import { sendChatGptCompletionRequest } from '../api/chatGptApi';
import { parseOllamaChatCompletion, sendOllamaChatCompletionRequest } from '../api/ollamaApi';
import ChatGPTLogo from './molecules/ChatGPTLogo';
import OllamaLogo from './molecules/OllamaLogo';
import Loader from './molecules/Loader';

const ChatBotWindow = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const utility = useAppSelector(selectUtilityName);

  const platform = useAppSelector(selectSettingsPlatform);
  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);
  const ollamaUrl = useAppSelector(selectSettingsOllamaUrl);
  const ollamaModel = useAppSelector(selecteSettingsOllamaModel);

  const minSettingsRequirementsMet = chatGptApiKey || (ollamaUrl && ollamaModel.length);

  const [selectedBot, setSelectedBot] = useState<'ChatGPT' | 'Ollama'>(
    chatGptApiKey ? 'ChatGPT' : 'Ollama'
  );
  function handleSelectBot() {
    setSelectedBot(prevBot => {
      if (prevBot === 'Ollama' && chatGptApiKey) {
        return 'ChatGPT';
      }

      if (prevBot === 'ChatGPT' && ollamaUrl && ollamaModel.length) {
        return 'Ollama';
      }

      return prevBot;
    });
  }

  const [question, setQuestion] = useState('');
  useEffect(() => {
    setQuestion('');
  }, [utility]);

  function handleTextAreaChange({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(value);
  }

  const [isChatResponseLoading, setIsChatResponseLoading] = useState(false);

  async function handleAskButtonClick() {
    setIsChatResponseLoading(true);

    if (selectedBot === 'ChatGPT') {
      const chatGptApiResponse = await sendChatGptCompletionRequest(
        platform,
        utility,
        chatGptEngine,
        chatGptApiKey,
        question
      );

      if (chatGptApiResponse) {
        if ('data' in chatGptApiResponse) {
          dispatch(
            addBotAnswer({
              id: uuid(),
              content: JSON.stringify(chatGptApiResponse.data),
            })
          );

          setQuestion('');
          setBotChatboxOpen(false);
        }

        if ('error' in chatGptApiResponse) {
          dispatch(setToastError(chatGptApiResponse.error));
        }
      }
    } else {
      try {
        const ollamaServerResponse = await sendOllamaChatCompletionRequest(
          ollamaUrl,
          ollamaModel,
          utility,
          platform,
          question
        );
        if (ollamaServerResponse.statusText === 'OK') {
          dispatch(
            addBotAnswer({
              id: uuid(),
              content: JSON.stringify(ollamaServerResponse.data.response),
            })
          );

          setQuestion('');
          setBotChatboxOpen(false);
        } else {
          dispatch(setToastError('Failed to generate a response'));
        }
      } catch (error) {
        dispatch(setToastError(parseOllamaChatCompletion(error)));
      }
    }

    setIsChatResponseLoading(false);
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [botChatboxOpen, setBotChatboxOpen] = useState(false);

  function handleBotIconClick() {
    setBotChatboxOpen(isOpen => !isOpen);
    setTimeout(() => {
      if (botChatboxOpen) textAreaRef.current?.focus();
    }, 0);
  }

  return utility ? (
    <div className='fixed w-full flex justify-end bottom-3 right-3'>
      <Tooltip
        className='z-50 duration-0 bg-gray-100'
        trigger='click'
        content={
          <>
            {!minSettingsRequirementsMet ? (
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
            ) : (
              <>
                <Textarea
                  className='focus-visible:outline-none p-4 w-72 md:w-96 h-52 '
                  value={question}
                  onChange={handleTextAreaChange}
                  disabled={isChatResponseLoading}
                  placeholder={`What do you want to ask ${selectedBot} about ${utility}?`}
                />
                <div className='flex justify-between'>
                  <div
                    className='w-fit h-fit self-center mt-2 rounded-full bg-cyan-normal cursor-pointer hover:bg-cyan-deep'
                    onClick={handleSelectBot}>
                    {selectedBot === 'ChatGPT' ? <ChatGPTLogo /> : <OllamaLogo />}
                  </div>

                  <Button
                    disabled={isChatResponseLoading || !question}
                    className='mt-2 float-right w-24'
                    onClick={handleAskButtonClick}>
                    {isChatResponseLoading ? (
                      <Loader size='sm' />
                    ) : (
                      <span className='transition-none'>Ask</span>
                    )}
                  </Button>
                </div>
              </>
            )}
          </>
        }>
        <Button
          onClick={handleBotIconClick}
          disabled={isChatResponseLoading}
          className={`p-0 rounded-full w-12 h-12 animate-none hover:animate-bounce border-none shadow-2xl z-50`}>
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
