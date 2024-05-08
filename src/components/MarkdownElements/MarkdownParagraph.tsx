import { type MarkdownElement } from './index';

type MarkdownParagraphProps = MarkdownElement<HTMLParagraphElement | HTMLPreElement>;

const MarkdownParagraph = (props: MarkdownParagraphProps) => {
  if (
    // makes sure styling does not apply to utility description paragraph
    !props.children.find(child => typeof child === 'string') &&
    (props.children as JSX.Element[]).find(({ type }) => type === 'code')
  ) {
    return (
      <p className='bg-cyan-normal w-fit text-white text-sm rounded px-2 py-1 mt-1 mb-6 font-mono'>
        {props.children}
      </p>
    );
  }

  return (
    <p className='text-center my-4 pb-4 mx-auto dark:text-white mb-6 text-lg  max-w-[500px] md:text-center'>
      {props.children}
    </p>
  );
};

export default MarkdownParagraph;
