import axios from 'axios';
import { QueryParams } from '../@types';

const api = axios.create({
  baseURL: 'http://localhost:5510',
});

export async function sendApiRequest<Response>(
  endpoint: string,
  params?: QueryParams
): Promise<Response | null> {
  try {
    const { data: response } = await api.get<Response>(endpoint, {
      params: {
        ...params,
        lang: params ? params.lang : 'en',
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default api;
