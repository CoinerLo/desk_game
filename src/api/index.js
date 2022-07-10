import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.REACT_APP_SERVER_HOST ?? window.location.hostname;
const port = process.env.REACT_APP_SERVER_PORT ?? 8080;
const baseUrl = isProduction ? `https://${host}/api/v1/` : `http://${host}:${port}/api/v1/`;

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsersAll: builder.query({
      query: () => 'users',
    }),
    createNewUser: builder.mutation({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }), /* в этой версии на сервере не реализовано */
    }),
    getGamesAll: builder.query({
      query: () => 'games',
    }),
  }),
});

export const {
  useGetUsersAllQuery,
  useGetGamesAllQuery,
  useCreateNewUserMutation,
} = appApi;
