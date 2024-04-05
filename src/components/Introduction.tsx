import { Blockquote } from 'flowbite-react';

import { useAppSelector } from '../store/hooks';
import { selectUtilityName } from '../store/reducers/utilitySlice';

const Introduction = (): JSX.Element | null => {
  const utility = useAppSelector(selectUtilityName);

  return !utility ? (
    <Blockquote className='w-11/12 sm:w-96 text-center mx-auto not-italic relative'>
      <span className='introduction-non-keywords'>Get summaries of </span>
      <a
        className='introduction-keywords'
        href='https://en.wikipedia.org/wiki/TLDR_Pages'
        target='_blank'>
        tldr pages
      </a>
      <span className='introduction-non-keywords'> and supercharge your learning </span>
      <span className='introduction-keywords cursor-pointer'>with AI-powered bot</span>
      <span className='introduction-non-keywords'>
        {' '}
        to help you find your way around any utility
      </span>
    </Blockquote>
  ) : null;
};

export default Introduction;
