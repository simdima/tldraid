import { useEffect, useRef } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Spinner } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setError, setLoading } from '../store/reducers/loadAndErrorSlice';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { selectUtilityBotAnswers, selectUtilityName } from '../store/reducers/utilitySlice';
import { useGetUtilityQuery } from '../store/service/tldraidApi';
import MarkdownHeader from './MarkdownElements/MarkdownHeader';
import MarkdownParagraph from './MarkdownElements/MarkdownParagraph';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownList from './MarkdownElements/MarkdownList';
import ChatBotWindow from './ChatBotWindow';

const Description = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);
  const botAnswers = useAppSelector(selectUtilityBotAnswers);

  const {
    data: response,
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

  return (
    <div className='relative min-h-[100dvh]'>
      {isLoading && (
        <Spinner
          size='xl'
          className='w-full mx-auto my-10'
        />
      )}

      {utility && response?.data && (
        <>
          <ReactMarkdown
            // disallowedElements={['code']}
            unwrapDisallowed
            className='w-11/12 md:w-[500px] h-dvh text-left mx-auto mb-6 opacity-0 animate-fade-in-no-delay'
            components={{
              h1: props => <MarkdownHeader {...props} />,
              p: props => <MarkdownParagraph {...props} />,
              // code: props => <MarkdownCode {...props} />,
              a: props => <MarkdownLink {...props} />,
              ul: props => <MarkdownList {...props} />,
              // blockquote: props => <MarkdownBlockquote {...props} />,
            }}
            key={utility}>
            {response.data}
          </ReactMarkdown>

          {botAnswers.map((answer, idx) => (
            <div
              key={idx} // @todo change to actual id
              ref={lastBotAnswerRef}>
              <ReactMarkdown
                unwrapDisallowed
                className='w-11/12 md:w-[500px] text-left mx-auto mb-6 opacity-0 animate-fade-in-no-delay'
                components={{
                  h1: props => <MarkdownHeader {...props} />,
                  p: props => <MarkdownParagraph {...props} />,
                  // code: props => <MarkdownCode {...props} />,
                  a: props => <MarkdownLink {...props} />,
                  ul: props => <MarkdownList {...props} />,
                  // blockquote: props => <MarkdownBlockquote {...props} />,
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
