import { CodeProps } from 'react-markdown/lib/ast-to-react';

type MarkdownCodeProps = CodeProps;

const MarkdownCode = (props: MarkdownCodeProps) => {
  return (
    <p className="mb-6 mt-1 w-fit rounded bg-cyan-normal px-2 py-1 font-mono text-sm text-white">
      {props.children}
    </p>
  );
};

export default MarkdownCode;
