import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setError, setLoading } from '../store/reducers/loadAndErrorSlice';
import { selectSettingsLanguage, selectSettingsPlatform } from '../store/reducers/settingsSlice';
import { selectUtilityName } from '../store/reducers/utilitySlice';
import { useGetUtilityQuery } from '../store/service/tldraidApi';
import MarkdownHeader from './MarkdownElements/MarkdownHeader';
import MarkdownParagraph from './MarkdownElements/MarkdownParagraph';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownList from './MarkdownElements/MarkdownList';
import { Spinner } from 'flowbite-react';

const Description = (): JSX.Element => {
  const dispatch = useAppDispatch();

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

  if (isError) {
    dispatch(setError('Failed to fetch selected utility'));
  }

  return (
    <>
      {isLoading && (
        <Spinner
          size='xl'
          className='w-full mx-auto my-10'
        />
      )}
      {utility && response?.data && (
        <ReactMarkdown
          // disallowedElements={['code']}
          unwrapDisallowed
          className='w-11/12 md:w-[500px] text-left mx-auto my-10'
          components={{
            h1: props => <MarkdownHeader {...props} />,
            p: props => <MarkdownParagraph {...props} />,
            // code: props => <MarkdownCode {...props} />,
            a: props => <MarkdownLink {...props} />,
            ul: props => <MarkdownList {...props} />,
            // blockquote: props => <MarkdownBlockquote {...props} />,
          }}
          key={utility}>
          {response.data}
        </ReactMarkdown>
      )}
    </>
  );
};

export default Description;
