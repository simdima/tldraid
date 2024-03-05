import { useEffect, useRef } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Spinner } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setError } from '../store/reducers/loadAndErrorSlice';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import {
  clearBotAnswers,
  selectUtilityBotAnswers,
  selectUtilityName,
} from '../store/reducers/utilitySlice';
import { useGetUtilityQuery } from '../store/service/tldraidApi';
import MarkdownHeader from './MarkdownElements/MarkdownHeader';
import MarkdownParagraph from './MarkdownElements/MarkdownParagraph';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownList from './MarkdownElements/MarkdownList';
import ChatBotWindow from './ChatBotWindow';

const Description = (): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);
  const botAnswers = useAppSelector(selectUtilityBotAnswers); // @todo map answers to utility in store

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

  useEffect(() => {
    dispatch(clearBotAnswers());
  }, [dispatch, utility]);

  const lastBotAnswerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastBotAnswerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [botAnswers]);

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

          {botAnswers.map((answer, idx) => (
            <div
              className='w-11/12 md:w-5/12 text-left mx-auto mb-4'
              key={idx}
              ref={idx === botAnswers.length - 1 ? lastBotAnswerRef : null}>
              <ReactMarkdown
                unwrapDisallowed
                components={{
                  pre: props => <MarkdownParagraph {...props} />,
                  p: props => <MarkdownList {...props} />,
                }}>
                {answer}
              </ReactMarkdown>
            </div>
          ))}
        </>
      )}

      <ChatBotWindow />
    </div>
  );
};

export default Description;
