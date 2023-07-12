import { AxiosResponse } from 'axios';

export type Platforms = 'android' | 'common' | 'linux' | 'osx' | 'windows';

export type QueryParams = {
  platform: string;
  lang?: string;
  utility?: string;
};
export type LanguagesResponse = AxiosResponse<string[]>;
export type UtilitesResponse = AxiosResponse<string[]>;
export type UtilityResponse = AxiosResponse<string>;

export type GptEngine = 'gpt-4' | 'gpt-3.5-turbo';

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
