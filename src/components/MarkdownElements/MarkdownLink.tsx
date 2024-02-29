import { MarkdownElement } from '../../@types';

// type MarkdownLinkProps2 = Omit<
//   React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
//   'ref'
// > &
//   ReactMarkdownProps;

type MarkdownLinkProps = MarkdownElement<HTMLAnchorElement>;

const MarkdownLink = ({ children }: MarkdownLinkProps) => {
  return (
    <a className='underline text-cyan-normal hover:text-cyan-deep cursor-pointer'>{children}</a>
  );
};

export default MarkdownLink;
