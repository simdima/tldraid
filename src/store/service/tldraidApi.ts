import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from '../../@types';

const tlraidApi = createApi({
  reducerPath: 'tlraidApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: builder => ({
    getLanguages: builder.query<string[], string>({
      query: () => '/languages',
    }),
    getUtilities: builder.query<string[], string>({
      query: platform => `/utilities/${platform}`,
    }),
    getUtility: builder.query<
      { description: string },
      { lang: string; platform: Platform; utility: string }
    >({
      query: params => `/utilities/${params.platform}/${params.lang}/${params.utility}`,
    }),
  }),
});

export const { useGetLanguagesQuery, useGetUtilitiesQuery, useGetUtilityQuery } = tlraidApi;

export default tlraidApi;
