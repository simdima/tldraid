import { MarkdownElement } from '../../@types';

type MarkdownListProps = MarkdownElement<HTMLUListElement | HTMLParagraphElement>;

const MarkdownList = ({ children }: MarkdownListProps) => {
  return <ul className='list-none text-white text-sm'>{children}</ul>;
};

export default MarkdownList;