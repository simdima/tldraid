import { useEffect, useState } from 'react';
import './GptAddon.scss';
import axios from 'axios';
import { GptResponse } from '../@types';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
  selectedPlatform: string;
  utility: string;
};

const GptAddon = ({ selectedPlatform, utility }: Props): JSX.Element => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setQuestion('');
    setAnswer('');
    setIsFetching(false);
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
              messages: [
                {
                  role: 'user',
                  content: `'${utility}' utility in ${selectedPlatform}. ${question}; provide only code snippets and minimal description text.`,
                },
              ],
            },
          };

          setIsFetching(true);
          console.log('🏷️', utility, question);
          const response = await axios.request<GptResponse>(options);
          if (response.status === 200) {
            const [firstRespone] = response.data.choices;
            setAnswer(a => a + '\n\n' + firstRespone.message.content);
            setIsFetching(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  }

  /**
   * @todo start a conversation for context; drop conversation on unmount
   */

  return (
    <div
      onKeyUp={handleEnterPress}
      className='gptaddon-container'>
      {utility && (
        <input
          id='gpt_input'
          type='text'
          placeholder='Ask a bot to help with this utility...'
          disabled={isFetching}
          value={question}
          onChange={handleChange}
        />
      )}
      <div>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GptAddon;
