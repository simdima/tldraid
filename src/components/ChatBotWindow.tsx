import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { Button, Spinner, Textarea, Tooltip } from 'flowbite-react';
import { FaRobot } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectSettingsChatGptApikey,
  selectSettingsChatGptEngine,
  selectSettingsPlatform,
} from '../store/reducers/settingsSlice';
import { addBotAnswer, selectUtilityName } from '../store/reducers/utilitySlice';
import { setError } from '../store/reducers/loadAndErrorSlice';
import { sendChatGptApiRequest } from '../api/chatGptApi';

const ChatBotWindow = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);
  const chatGptEngine = useAppSelector(selectSettingsChatGptEngine);
  const chatGptApiKey = useAppSelector(selectSettingsChatGptApikey);

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

    const chatGptApiResponse = await sendChatGptApiRequest(
      platform,
      utility,
      chatGptEngine,
      chatGptApiKey,
      question
    );

    if (chatGptApiResponse) {
      setIsChatResponseLoading(false);

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
        dispatch(setError(chatGptApiResponse.error));
      }
    }
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
            {!chatGptApiKey ? (
              <div className='w-80 p-4'>
                <p className='text-black dark:text-white'>
                  To ask the bot a question add your OpenAI API key
                  <span>
                    {' '}
                    <Link
                      className='underline md:whitespace-pre text-cyan-normal hover:text-cyan-deep cursor-pointer'
                      to='/settings'>
                      Settings
                    </Link>{' '}
                  </span>
                  first
                </p>
              </div>
            ) : (
              <>
                <Textarea
                  className='focus-visible:outline-none p-4 w-72 md:w-96 h-52 '
                  value={question}
                  onChange={handleTextAreaChange}
                  // ref={textAreaRef}
                  disabled={!chatGptApiKey}
                  placeholder={`What do you want to know about ${utility}?`}
                />
                <Button
                  disabled={!chatGptApiKey || isChatResponseLoading || !question}
                  className='mt-2 float-right w-24'
                  onClick={handleAskButtonClick}>
                  {isChatResponseLoading ? (
                    <Spinner
                      aria-label='Extra small spinner example'
                      size='sm'
                    />
                  ) : (
                    <span className='transition-none'>Ask</span>
                  )}
                </Button>
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
