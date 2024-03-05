import { CodeProps } from 'react-markdown/lib/ast-to-react';

type MarkdownCodeProps = CodeProps;

const MarkdownCode = (props: MarkdownCodeProps) => {
  return (
    <p className='bg-cyan-normal w-fit text-white text-sm rounded px-2 py-1 mt-1 mb-6 font-mono'>
      {props.children}
    </p>
  );
};

export default MarkdownCode;
