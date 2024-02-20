import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { sendApiRequest } from '../api';
import { UtilityResponse } from '../@types';
import './Description.scss';

type Props = {
  selectedLanguage: string;
  setShowIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlatform: string;
  selectedUtility: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const Description = ({
  selectedLanguage,
  setShowIntroduction,
  selectedPlatform,
  selectedUtility,
  setError,
}: Props): JSX.Element => {
  const [utilDescription, setUtilDescription] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (selectedUtility) {
          const response = await sendApiRequest<UtilityResponse>('/utility', {
            lang: selectedLanguage,
            platform: selectedPlatform,
            utility: selectedUtility,
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
  }, [setShowIntroduction, selectedUtility, selectedLanguage, selectedPlatform, setError]);

  return (
    <>
      {selectedUtility && (
        <div className='description-container'>
          <ReactMarkdown key={selectedUtility}>{utilDescription}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default Description;
