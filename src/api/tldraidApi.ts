import axios from 'axios';

import type { Platform } from '../atoms/settings';

type UtilityResponse = {
  description: string;
};

type QueryParams = { platform: Platform; language: string; utility: string };

const tldraidApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getLanguages = (): Promise<string[]> =>
  tldraidApi.get('/languages').then(response => response.data);

const getUtilitiesByPlatform = (platform: QueryParams['platform']): Promise<string[]> =>
  tldraidApi.get(`/utilities/${platform}`).then(response => response.data);

const getUtilityByName = ({ platform, language, utility }: QueryParams): Promise<UtilityResponse> =>
  tldraidApi.get(`/utilities/${platform}/${language}/${utility}`).then(response => response.data);

export { getLanguages, getUtilitiesByPlatform, getUtilityByName };
