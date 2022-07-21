import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useGetApiUrl } from '../hooks/useGetApiUrl';

// eslint-disable-next-line react-hooks/rules-of-hooks
const baseUrl = useGetApiUrl({ path: '/api/v1/' });

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsersAll: builder.query({
      query: () => 'users', /*не используется в этой версии*/
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
