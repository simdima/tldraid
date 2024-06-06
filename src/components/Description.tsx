import { useQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { getUtilityByName } from '../api/tldraidApi';
import { chatBotResponsesAtom } from '../atoms/chatBotAnswers';
import { utilityAtom } from '../atoms/utility';
import useAppError from '../hooks/useAppError';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
// import {
//   deleteBotAnswer,
//   selectUtilityBotAnswers,
//   selectUtilityName,
// } from '../store/reducers/utilitySlice';
import ChatBotWindow from './ChatBotWindow';
import Introduction from './Introduction';
import MarkdownHeader from './MarkdownElements/MarkdownHeader';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownList from './MarkdownElements/MarkdownList';
import MarkdownParagraph from './MarkdownElements/MarkdownParagraph';
import Loader from './molecules/Loader';

const Description = (): JSX.Element | null => {
  // const dispatch = useAppDispatch();

  const language = useAppSelector(selectSettingsLanguage);
  const platform = useAppSelector(selectSettingsPlatform);
  // const utility = useAppSelector(selectUtilityName);

  const [utility] = useAtom(utilityAtom);
  // const botAnswers = useAppSelector(selectUtilityBotAnswers);
  const [chatBotResponses, setChatBotResponses] = useAtom(chatBotResponsesAtom);
  const removeChatBotResponse = (id: string) => {
    setChatBotResponses(() => ({
      ...chatBotResponses,
      [utility]: [...chatBotResponses[utility]].filter(res => res.id !== id),
    }));
  };

  const {
    data: utilityResponse,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['utilityQuery', utility],
    queryFn: () => getUtilityByName({ platform, language, utility }),
    enabled: utility !== '',
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { throwAppError } = useAppError();

  if (isError) {
    throwAppError('Failed to fetch selected utility');
  }

  const lastBotAnswerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastBotAnswerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatBotResponses]);

  return !utility ? (
    <Introduction />
  ) : (
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

          {chatBotResponses[utility]?.map(({ id, content }, idx) => (
            <div
              className="mx-auto mb-4 flex w-11/12 text-left md:w-5/12"
              key={id}
              ref={idx === chatBotResponses[utility]?.length - 1 ? lastBotAnswerRef : null}
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
                // onClick={() => dispatch(deleteBotAnswer(id))}
                onClick={() => removeChatBotResponse(id)}
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
