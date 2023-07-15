import axios, { AxiosError } from 'axios';
import { QueryParams } from '../@types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function sendApiRequest<Response>(
  endpoint: string,
  params?: QueryParams
): Promise<Response | { error: string }> {
  try {
    const { data: response } = await api.get<Response>(endpoint, {
      params: {
        ...params,
        lang: params ? params.lang : 'en',
      },
    });

    return response;
  } catch (error) {
    return customError(error);
  }
}

function customError(error: unknown): { error: string } {
  if (error instanceof AxiosError) {
    return { error: error.message };
  }

  return { error: '' };
}
