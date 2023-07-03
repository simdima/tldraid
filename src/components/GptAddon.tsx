import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { GptResponse } from '../@types';
import './GptAddon.scss';

type Props = {
  selectedPlatform: string;
  utility: string;
};

const GptAddon = ({ selectedPlatform, utility }: Props): JSX.Element => {
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
              'Authorization': 'Bearer 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',
            },
            data: {
              model: 'gpt-3.5-turbo',
              n: 1,
              temperature: 0.3,
              messages: [
                {
                  role: 'user',
                  content: `Using '${utility}' utility ${
                    selectedPlatform === 'common' ? '' : `on a ${selectedPlatform} system`
                  }. ${question}; please provide only code snippets and minimal description text for said snippets.`,
                },
              ],
            },
          };

          setIsLoading(true);
          console.log('🏷️', utility, question);
          const response = await axios.request<GptResponse>(options);
          if (response.status === 200) {
            const [firstRespone] = response.data.choices;
            setAnswer(a => a + '\n\n' + firstRespone.message.content);
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
              placeholder='Try asking a bot for help with this utility...'
              disabled={isLoading}
              value={question}
              onChange={handleChange}
            />
          )}
          <div>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
};

export default GptAddon;
