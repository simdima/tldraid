import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { sendApiRequest } from '../api';
import { QueryParams, UtilityResponse } from '../@types';
import './Description.scss';

type Props = {
  setShowIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlatform: string;
  utility: string;
};

const Description = ({ setShowIntroduction, selectedPlatform, utility }: Props): JSX.Element => {
  const [utilDescription, setUtilDescription] = useState('');

  console.log('⚠️ Description component re-rendered ⚠️');

  useEffect(() => {
    (async () => {
      try {
        if (utility) {
          console.log('🚀', utility, selectedPlatform);
          const response = await sendApiRequest<UtilityResponse, QueryParams>('/page', {
            platform: selectedPlatform,
            utility,
          });
          if (response) {
            setShowIntroduction(false);
            setUtilDescription(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [setShowIntroduction, utility, selectedPlatform]);

  /** @todo try and add syntax hightlight for {{XXX}} */
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
