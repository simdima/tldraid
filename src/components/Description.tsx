import { Button } from 'flowbite-react';
import { useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import useAppError from '../hooks/useAppError';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import {
  deleteBotAnswer,
  selectUtilityBotAnswers,
  selectUtilityName,
} from '../store/reducers/utilitySlice';
import { useGetUtilityQuery } from '../store/service/tldraidApi';
import ChatBotWindow from './ChatBotWindow';
import MarkdownHeader from './MarkdownElements/MarkdownHeader';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownList from './MarkdownElements/MarkdownList';
import MarkdownParagraph from './MarkdownElements/MarkdownParagraph';
import Loader from './molecules/Loader';

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

  const { throwAppError } = useAppError();

  if (isError) {
    throwAppError('Failed to fetch selected utility');
  }

  const lastBotAnswerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastBotAnswerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [botAnswers]);

  const handleDeleteBotAnswer = (id: string) => {
    dispatch(deleteBotAnswer(id));
  };

  return (
    <div className="relative mb-4 min-h-[100dvh]">
      {isLoading && <Loader size="xl" className="mx-auto my-10 w-full" />}

      {utility && utilityResponse && (
        <>
          <div className="mx-auto mb-4 w-11/12 animate-fade-in-no-delay text-left opacity-0 md:w-5/12">
            <ReactMarkdown
              unwrapDisallowed
              components={{
                h1: props => <MarkdownHeader {...props} />,
                p: props => <MarkdownParagraph {...props} />,
                a: props => <MarkdownLink {...props} />,
                ul: props => <MarkdownList {...props} />,
              }}
              key={utility}
            >
              {utilityResponse.description}
            </ReactMarkdown>
          </div>

          {botAnswers[utility]?.map(({ id, content }, idx) => (
            <div
              className="mx-auto mb-4 flex w-11/12 text-left md:w-5/12"
              key={id}
              ref={idx === botAnswers[utility]?.length - 1 ? lastBotAnswerRef : null}
            >
              <ReactMarkdown
                className="w-11/12"
                unwrapDisallowed
                components={{
                  pre: props => <MarkdownParagraph {...props} />,
                  p: props => <MarkdownList {...props} />,
                  ul: props => <MarkdownList {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
              <Button
                color="info"
                size="xs"
                aria-label="delete"
                className="h-fit w-fit self-start !bg-gray-500 opacity-30 transition-all duration-200 hover:opacity-100"
                onClick={() => handleDeleteBotAnswer(id)}
              >
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
