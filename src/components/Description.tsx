import { useEffect, useState } from 'react';
import './Description.scss';
import { sendApiRequest } from '../api';
import { QueryParams, UtilityPageResponse } from '../@types';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type Props = {
  lang: string;
  platform: string;
  utility: string;
};

const Description: React.FC<Props> = ({ lang, platform, utility }) => {
  const [utilDescription, setUtilDescription] = useState('');

  useEffect(() => {
    (async () => {
      if (utility) {
        const response = await sendApiRequest<UtilityPageResponse, QueryParams>('/page', {
          lang,
          platform,
          utility,
        });
        if (response) {
          setUtilDescription(response.data);
        }
      }
    })();
  }, [utility, lang, platform]);

  /** @todo try and add syntax hightlight for {{XXX}} */
  return (
    <div className='utility-description-container'>
      <ReactMarkdown key={utility}>{utilDescription}</ReactMarkdown>
    </div>
  );
};

export default Description;
