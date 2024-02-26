import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useAppSelector } from '../store/hooks';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { selectUtilityName } from '../store/reducers/utilitySlice';
import { useGetUtilityQuery } from '../store/service/tldraidApi';

import './Description.scss';

const Description = (): JSX.Element => {
  const language = useAppSelector(selectSettingsLanguage);
  const platform = useAppSelector(selectSettingsPlatform);
  const utility = useAppSelector(selectUtilityName);

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

  return (
    <>
      {utility && response?.data && (
        <div className='description-container'>
          <ReactMarkdown key={utility}>{response.data}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default Description;
