import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

type LANGUAGE_STORAGE_KEY = 'tldraid_pages_lang';
type GPT_ENGINE_STORAGE_KEY = 'tldraid_gpt_engine';
type GPT_API_KEY_STORAGE_KEY = 'tldraid_gpt_apikey';
type OLLAMA_API_SERVER_URL = 'ollama_api_server_url';
type OLLAMA_API_SERVER_MODELS = 'ollama_api_server_models';
export type LOCAL_STORAGE_KEY =
  | LANGUAGE_STORAGE_KEY
  | GPT_ENGINE_STORAGE_KEY
  | GPT_API_KEY_STORAGE_KEY
  | OLLAMA_API_SERVER_URL
  | OLLAMA_API_SERVER_MODELS;

export type Platform = 'android' | 'common' | 'linux' | 'osx' | 'windows';

export type ChatGptEngine = 'gpt-3.5-turbo' | 'gpt-4';
export const CHAT_GPT_ENGINES: ChatGptEngine[] = ['gpt-3.5-turbo', 'gpt-4'];

export type MarkdownElement<T> = Omit<React.DetailedHTMLProps<React.HTMLAttributes<T>, T>, 'ref'> &
  ReactMarkdownProps;
