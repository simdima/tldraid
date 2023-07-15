import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { sendApiRequest } from '../api';
import { UtilityResponse } from '../@types';
import './Description.scss';

type Props = {
  selectedLanguage: string;
  setShowIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlatform: string;
  utility: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const Description = ({
  selectedLanguage,
  setShowIntroduction,
  selectedPlatform,
  utility,
  setError,
}: Props): JSX.Element => {
  const [utilDescription, setUtilDescription] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (utility) {
          const response = await sendApiRequest<UtilityResponse>('/utility', {
            lang: selectedLanguage,
            platform: selectedPlatform,
            utility,
          });

          if ('error' in response) {
            throw new Error(response.error);
          }

          setShowIntroduction(false);
          setUtilDescription(response.data);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          console.error(error.message);
        }

        setError('Failed to fetch selected utility');
      }
    })();
  }, [setShowIntroduction, utility, selectedLanguage, selectedPlatform, setError]);

  return (
    <>
      {utility && (
        <div className='description-container'>
          <ReactMarkdown key={utility}>{utilDescription}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default Description;
