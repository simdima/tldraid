import { AxiosResponse } from 'axios';

export type Platforms = 'android' | 'common' | 'linux' | 'osx' | 'windows';

export type QueryParams = {
  platform: string;
  utility?: string;
};
export type UtilitesResponse = AxiosResponse<string[]>;
export type UtilityResponse = AxiosResponse<string>;

export type GptResponse = {
  id: string;
  object: string;
  created: number;
  model: 'gpt-4' | 'gpt-3.5-turbo';
  // typed as tuple since request is sent with n=1 parameter
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
