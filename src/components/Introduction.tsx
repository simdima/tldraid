import { Blockquote } from 'flowbite-react';
import { useAtom } from 'jotai';

import { utilityAtom } from '../atoms/utility';

const Introduction = (): JSX.Element | null => {
  const [utility] = useAtom(utilityAtom);

  return !utility ? (
    <Blockquote className="relative mx-auto w-11/12 text-center not-italic sm:w-96">
      <span className="animate-fade-in-slower opacity-0">Get summaries of </span>
      <a
        className="animate-fade-in whitespace-pre text-cyan-normal opacity-0"
        href="https://en.wikipedia.org/wiki/TLDR_Pages"
        target="_blank"
      >
        tldr pages
      </a>
      <span className="animate-fade-in-slower opacity-0"> and supercharge your learning </span>
      <span className="animate-fade-in whitespace-pre text-cyan-normal opacity-0">
        with AI-powered bot
      </span>
      <span className="animate-fade-in-slower opacity-0">
        {' '}
        to help you find your way around any utility
      </span>
    </Blockquote>
  ) : null;
};

export default Introduction;
