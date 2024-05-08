import { type MarkdownElement } from './index';

type MarkdownHeaderProps = MarkdownElement<HTMLHeadingElement>;

const MarkdownHeader = ({ children }: MarkdownHeaderProps) => {
  return <h2 className="text-center text-4xl font-bold text-cyan-normal">{children}</h2>;
};

export default MarkdownHeader;
