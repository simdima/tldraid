import { MarkdownElement } from '../../@types';

type MarkdownLinkProps = MarkdownElement<HTMLAnchorElement>;

const MarkdownLink = ({ children }: MarkdownLinkProps) => {
  return (
    <a className='underline md:whitespace-pre text-cyan-normal hover:text-cyan-deep cursor-pointer'>
      {children}
    </a>
  );
};

export default MarkdownLink;
