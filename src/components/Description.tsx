import { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { sendApiRequest } from '../api';
import { UtilityResponse } from '../@types';
import './Description.scss';
import { useAppSelector } from '../store/hooks';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { selectUtilityName } from '../store/reducers/utilitySlice';

type Props = {
  setShowIntroduction: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const Description = ({ setShowIntroduction, setError }: Props): JSX.Element => {
  const language = useAppSelector(selectSettingsLanguage);
  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);

  const [utilityDescription, setUtilityDescription] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (utility) {
          const response = await sendApiRequest<UtilityResponse>('/utility', {
            lang: language,
            platform,
            utility,
          });

          if ('error' in response) {
            throw new Error(response.error);
          }

          setShowIntroduction(false);
          setUtilityDescription(response.data);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          console.error(error.message);
        }

        setError('Failed to fetch selected utility');
      }
    })();
  }, [setShowIntroduction, setError, language, platform, utility]);

  return (
    <>
      {utility && (
        <div className='description-container'>
          <ReactMarkdown key={utility}>{utilityDescription}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default Description;
