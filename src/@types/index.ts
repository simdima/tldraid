import { AxiosResponse } from 'axios';
import { version } from '../../package.json';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

export const APP_VERSION = version;

type LANGUAGE_STORAGE_KEY = 'tldraid_pages_lang';
type GPT_ENGINE_STORAGE_KEY = 'tldraid_gpt_engine';
type GPT_API_KEY_STORAGE_KEY = 'tldraid_gpt_apikey';
export type LOCAL_STORAGE_KEY =
  | LANGUAGE_STORAGE_KEY
  | GPT_ENGINE_STORAGE_KEY
  | GPT_API_KEY_STORAGE_KEY;

export type Platform = 'android' | 'common' | 'linux' | 'osx' | 'windows';

export interface QueryParams {
  platform: string;
  lang?: string;
  utility?: string;
}
export type LanguagesResponse = AxiosResponse<string[]>;
export type UtilitesResponse = AxiosResponse<string[]>;
export type UtilityResponse = AxiosResponse<string>;

export type ChatGptEngine = 'gpt-3.5-turbo' | 'gpt-4';
export const CHAT_GPT_ENGINES: ChatGptEngine[] = ['gpt-3.5-turbo', 'gpt-4'];

export interface ChatGptResponse {
  id: string;
  object: string;
  created: number;
  model: ChatGptEngine;
  // typed as tuple since request is always sent with n=1 parameter
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatGptErrorResponse {
  error: {
    message: string;
    type: string;
    param: unknown;
    code: string;
  };
}

export type MarkdownElement<T> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<T>, T>, 'ref'> &
  ReactMarkdownProps;
