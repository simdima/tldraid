import { type MarkdownElement } from './index';

type MarkdownListProps = MarkdownElement<HTMLUListElement | HTMLParagraphElement>;

const MarkdownList = ({ children }: MarkdownListProps) => {
  return <ul className="list-none text-sm dark:text-white">{children}</ul>;
};

export default MarkdownList;
