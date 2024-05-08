import { type MarkdownElement } from './index';

type MarkdownListProps = MarkdownElement<HTMLUListElement | HTMLParagraphElement>;

const MarkdownList = ({ children }: MarkdownListProps) => {
  return <ul className='list-none dark:text-white text-sm'>{children}</ul>;
};

export default MarkdownList;
