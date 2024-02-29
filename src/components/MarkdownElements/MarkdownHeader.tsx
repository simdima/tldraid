import { MarkdownElement } from '../../@types';

type MarkdownHeaderProps = MarkdownElement<HTMLHeadingElement>;

const MarkdownHeader = ({ children }: MarkdownHeaderProps) => {
  return <h2 className='font-bold text-4xl text-center text-cyan-normal'>{children}</h2>;
};

export default MarkdownHeader;
