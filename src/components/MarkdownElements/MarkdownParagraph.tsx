import type { MarkdownElement } from './index';

type MarkdownParagraphProps = MarkdownElement<HTMLParagraphElement | HTMLPreElement>;

const MarkdownParagraph = (props: MarkdownParagraphProps) => {
  if (
    // makes sure styling does not apply to utility description paragraph
    !props.children.find(child => typeof child === 'string') &&
    (props.children as JSX.Element[]).find(({ type }) => type === 'code')
  ) {
    return (
      <p className="mb-6 mt-1 w-fit rounded bg-cyan-normal px-2 py-1 font-mono text-sm text-white">
        {props.children}
      </p>
    );
  }

  return (
    <p className="mx-auto my-4 mb-6 max-w-[500px] pb-4 text-center text-lg md:text-center dark:text-white">
      {props.children}
    </p>
  );
};

export default MarkdownParagraph;
