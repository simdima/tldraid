import { AxiosResponse } from 'axios';

export type QueryParams = {
  lang: string;
  platform: string;
};
export type UtilitesResponse = AxiosResponse<string[]>;
export type LanguageResponse = UtilitesResponse;
export type PlatformResponse = UtilitesResponse;
// export type UtilityPageResponse = AxiosResponse<string>;
