import { AxiosResponse } from 'axios';

export const LANGUAGE_STORAGE_KEY = 'tldraid_pages_lang' as const;
export const API_KEY_STORAGE_KEY = 'tldraid_gpt_apikey' as const;

export type Platforms = 'android' | 'common' | 'linux' | 'osx' | 'windows';

export type QueryParams = {
  platform: string;
  lang?: string;
  utility?: string;
};
export type LanguagesResponse = AxiosResponse<string[]>;
export type UtilitesResponse = AxiosResponse<string[]>;
export type UtilityResponse = AxiosResponse<string>;

export enum GptEngineNames {
  GPT_V3 = 'gpt-3.5-turbo',
  GPT_V4 = 'gpt-4',
}
export type GptEngine = GptEngineNames.GPT_V3 | GptEngineNames.GPT_V4;

export type GptResponse = {
  id: string;
  object: string;
  created: number;
  model: GptEngine;
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
};

export type GptErrorResponse = {
  error: {
    message: string;
    type: string;
    param: unknown;
    code: string;
  };
};
