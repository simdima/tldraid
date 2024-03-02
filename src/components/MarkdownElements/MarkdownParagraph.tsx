import { MarkdownElement } from '../../@types';

type MarkdownParagraphProps = MarkdownElement<HTMLParagraphElement>;

const MarkdownParagraph = (props: MarkdownParagraphProps) => {
  if (
    // makes sure styling does not apply to utility description paragraph
    !props.children.find(child => typeof child === 'string') &&
    (props.children as JSX.Element[]).find(({ type }) => type === 'code')
  ) {
    return (
      <p className='bg-cyan-normal text-white text-sm rounded px-2 py-1 mt-1 mb-6 font-mono'>
        {props.children}
      </p>
    );
  }

  return <p className='text-center my-4 text-white mb-6 text-lg'>{props.children}</p>;
};

export default MarkdownParagraph;
