import { type MarkdownElement } from './index';

type MarkdownLinkProps = MarkdownElement<HTMLAnchorElement>;

const MarkdownLink = ({ children }: MarkdownLinkProps) => {
  const href = children.find(child => typeof child === 'string' && child.startsWith('http'));

  return (
    <a
      href={href ? (href as string) : ''}
      className='underline md:whitespace-pre-wrap text-cyan-normal hover:text-cyan-deep cursor-pointer'>
      {children}
    </a>
  );
};

export default MarkdownLink;
