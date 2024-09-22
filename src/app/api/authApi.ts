import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kaniboom.liara.run/kb-api",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    verify: builder.query({
      query: () => ({
        url: "/auth/verify",
        method: "POST",
      }),
    }),
    signin: builder.mutation({
      query: (params) => ({
        url: "/auth/verify",
        method: "POST",
        body: params,
      }),
    }),
    createUser: builder.mutation({
      query: (params) => ({
        url: "/auth/create",
        method: "POST",
        body: params,
      }),
    }),
    logout: builder.mutation({
      query: (draft) => ({
        url: `/auth/${draft.end}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useVerifyQuery,
  useCreateUserMutation,
  useLogoutMutation,
} = authApi;
