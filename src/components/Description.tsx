import { Button, Spinner } from 'flowbite-react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { FaTrash } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setError } from '../store/reducers/loadAndErrorSlice';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import {
  deleteBotAnswer,
  selectUtilityBotAnswers,
  selectUtilityName,
} from '../store/reducers/utilitySlice';
import { useGetUtilityQuery } from '../store/service/tldraidApi';
import MarkdownHeader from './MarkdownElements/MarkdownHeader';
import { useEffect, useRef } from 'react';
import MarkdownParagraph from './MarkdownElements/MarkdownParagraph';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownList from './MarkdownElements/MarkdownList';
import ChatBotWindow from './ChatBotWindow';

const Description = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);
  const botAnswers = useAppSelector(selectUtilityBotAnswers);

  const {
    data: utilityResponse,
    isLoading,
    isError,
  } = useGetUtilityQuery(
    {
      platform,
      utility,
      lang: language,
    },
    { skip: !language || !platform || !utility }
  );

  if (isError) {
    dispatch(setError('Failed to fetch selected utility'));
  }

  const lastBotAnswerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastBotAnswerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [botAnswers]);

  const handleDeleteBotAnswer = (id: string) => {
    dispatch(deleteBotAnswer(id));
  };

  return (
    <div className='relative min-h-[100dvh] mb-4'>
      {isLoading && (
        <Spinner
          size='xl'
          className='w-full mx-auto my-10'
        />
      )}

      {utility && utilityResponse && (
        <>
          <div className='w-11/12 md:w-5/12 text-left mx-auto mb-4 opacity-0 animate-fade-in-no-delay'>
            <ReactMarkdown
              unwrapDisallowed
              components={{
                h1: props => <MarkdownHeader {...props} />,
                p: props => <MarkdownParagraph {...props} />,
                a: props => <MarkdownLink {...props} />,
                ul: props => <MarkdownList {...props} />,
              }}
              key={utility}>
              {utilityResponse.data}
            </ReactMarkdown>
          </div>

          {botAnswers[utility]?.map(({ id, content }, idx) => (
            <div
              className='w-11/12 md:w-5/12 text-left mx-auto mb-4 flex'
              key={id}
              ref={idx === botAnswers[utility]?.length - 1 ? lastBotAnswerRef : null}>
              <ReactMarkdown
                className='w-11/12'
                unwrapDisallowed
                components={{
                  pre: props => <MarkdownParagraph {...props} />,
                  p: props => <MarkdownList {...props} />,
                  ul: props => <MarkdownList {...props} />,
                }}>
                {JSON.parse(content)}
              </ReactMarkdown>
              <Button
                color='info'
                size='xs'
                aria-label='delete'
                className='!bg-gray-500 self-start w-fit h-fit opacity-30 hover:opacity-100 transition-all duration-200'
                onClick={() => handleDeleteBotAnswer(id)}>
                <FaTrash />
              </Button>
            </div>
          ))}
        </>
      )}

      <ChatBotWindow />
    </div>
  );
};

export default Description;
