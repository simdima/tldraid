import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5510',
});

export async function sendApiRequest<Response, Params>(
  endpoint: string,
  params: Params
): Promise<Response | null> {
  try {
    const { data: response } = await api.get<Response>(endpoint, {
      params: {
        ...params,
        lang: 'en', // implement for other languages later
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default api;
