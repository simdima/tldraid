import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from '../../@types';

interface ApiResponse<T> {
  data: T;
}

const tlraidApi = createApi({
  reducerPath: 'tlraidApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: builder => ({
    getLanguages: builder.query<ApiResponse<string[]>, string>({
      query: () => '/languages',
    }),
    getUtilities: builder.query<ApiResponse<string[]>, string>({
      query: platform => ({
        url: '/utilities',
        params: { platform },
      }),
    }),
    getUtility: builder.query<
      ApiResponse<string>,
      { lang: string; platform: Platform; utility: string }
    >({
      query: params => {
        const { lang, platform, utility } = params;

        return {
          url: '/utility',
          params: { lang, platform, utility },
        };
      },
    }),
  }),
});

export const { useGetUtilitiesQuery, useGetUtilityQuery, useGetLanguagesQuery } = tlraidApi;

export default tlraidApi;
