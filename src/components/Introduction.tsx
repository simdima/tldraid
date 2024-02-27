import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectUtilityName } from '../store/reducers/utilitySlice';

import './Introduction.scss';

const Introduction = (): JSX.Element | null => {
  const utility = useAppSelector(selectUtilityName);
  const [showIntroduction, setShowIntroduction] = useState(true);

  useEffect(() => {
    if (utility) {
      setShowIntroduction(false);
    }
  }, [utility]);

  return showIntroduction ? (
    <div className='introduction'>
      <p>
        <span className='introduction-non-keywords'>Get summaries of </span>
        <a
          href='https://tldr.sh/'
          target='_blank'>
          tldr pages
        </a>
        <span className='introduction-non-keywords'> and supercharge your learning </span>
        <a
          href='https://chat.openai.com/'
          target='_blank'>
          with AI-powered ChatGPT bot
        </a>
        <span className='introduction-non-keywords'>
          {' '}
          to help you find your way around any utility
        </span>
      </p>
    </div>
  ) : null;
};

export default Introduction;
