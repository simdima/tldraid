import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

export type MarkdownElement<T> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<T>, T>, 'ref'> &
  ReactMarkdownProps;
