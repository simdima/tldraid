import { type MarkdownElement } from './index';

type MarkdownLinkProps = MarkdownElement<HTMLAnchorElement>;

const MarkdownLink = ({ children }: MarkdownLinkProps) => {
  const href = children.find(child => typeof child === 'string' && child.startsWith('http'));

  return (
    <a
      href={href ? (href as string) : ''}
      className="cursor-pointer text-cyan-normal underline hover:text-cyan-deep md:whitespace-pre-wrap"
    >
      {children}
    </a>
  );
};

export default MarkdownLink;
