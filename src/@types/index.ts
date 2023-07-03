import { AxiosResponse } from 'axios';

export type Platforms = 'android' | 'common' | 'linux' | 'osx' | 'windows';

export type QueryParams = {
  platform: string;
  utility?: string;
};
export type UtilitesResponse = AxiosResponse<string[]>;
export type LanguageResponse = UtilitesResponse;
export type PlatformResponse = UtilitesResponse;
export type UtilityPageResponse = AxiosResponse<string>;

export type GptResponse = {
  id: string;
  object: string;
  created: number;
  model: string; // set to const later
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
