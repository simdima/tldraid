import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { GptErrorResponse, GptResponse } from '../@types';
import './GptAddon.scss';

type Props = {
  selectedPlatform: string;
  utility: string;
  chatGptApikey: string;
  chatGptEngine: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const GptAddon = ({
  selectedPlatform,
  utility,
  chatGptApikey,
  chatGptEngine,
  setError,
}: Props): JSX.Element => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuestion('');
    setAnswer('');
    setIsLoading(false);
  }, [selectedPlatform, utility]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuestion(e.target.value);
  }

  async function handleEnterPress(e: React.KeyboardEvent<HTMLDivElement>) {
    try {
      if (
        e.key === 'Enter' &&
        document.activeElement &&
        document.activeElement.id === 'gpt_input'
      ) {
        if (utility && question) {
          const options = {
            url: 'https://api.openai.com/v1/chat/completions',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${chatGptApikey}`,
            },
            data: {
              model: chatGptEngine,
              n: 1,
              temperature: 0.3,
              messages: [
                {
                  role: 'user',
                  content: `Using '${utility}' utility ${
                    selectedPlatform === 'common' ? '' : `on a ${selectedPlatform} system`
                  }. ${question}`,
                },
              ],
            },
          };

          setIsLoading(true);
          console.log('🏷️', utility, question);
          const response = await axios.request<GptResponse>(options);
          if (response.status >= 200 && response.status < 400) {
            const [firstRespone] = response.data.choices;
            setAnswer(a => a + '\n\n' + firstRespone.message.content);
            setIsLoading(false);
          } else {
            throw new Error('Something went wrong');
          }
        }
      }
    } catch (error) {
      let errorText = '';
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data as unknown as GptErrorResponse;
        if (errorResponse.error.code === 'invalid_api_key') {
          errorText = 'Your API key seems to be invalid';
        } else if (errorResponse.error.code === 'model_not_found') {
          errorText = `You do not have access to ${chatGptEngine} model`;
        } else {
          errorText = `OpenAI API responded with error code: \n"${errorResponse.error.code}"`;
        }
      } else if (error instanceof Error) {
        errorText = error.message;
      } else {
        errorText = 'Encountered an unknown error';
      }

      setIsLoading(false);
      setError(errorText);
    }
  }

  return (
    <>
      {utility && (
        <div
          onKeyUp={handleEnterPress}
          className='gptaddon-container'>
          {utility && (
            <input
              id='gpt_input'
              type='text'
              placeholder={
                !chatGptApikey
                  ? 'To use this bot configure your API key first'
                  : 'Try asking a bot for help with this utility...'
              }
              disabled={isLoading || !chatGptApikey}
              value={question}
              onChange={handleChange}
            />
          )}
          <div>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* {error && (
        <ErrorMessage>
          <div
            className='error-popup'
            onClick={() => setError('')}>
            <div>{error}</div>
          </div>
        </ErrorMessage>
      )} */}
    </>
  );
};

export default GptAddon;
