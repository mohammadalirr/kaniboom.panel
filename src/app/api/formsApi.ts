import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formsApi = createApi({
  reducerPath: "forms",
  baseQuery: fetchBaseQuery({
    //customenv
    // baseUrl: "https://kaniboom.liara.run/kb-api" + "/forms",
    baseUrl: "http://localhost:3000/kb-api" + "/forms",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getForms: builder.query({
      query: (draft) => ({
        url: `/${draft.endpoint}`,
        method: "GET",
        params: {
          page: draft.page,
          limit: 12,
        },
      }),
    }),
    deleteForm: builder.mutation({
      query: (draft) => ({
        url: `/${draft.endpoint}`,
        method: "DELETE",
        params: {
          id: draft.id,
        },
      }),
    }),
    downloadFile: builder.query({
      query: (draft) => ({
        url: `/download/${draft.fileId}`,
        method: "GET",
        responseHandler: (response) => response.blob(), // Handle file blob
      }),
    }),
  }),
});

export const { useDeleteFormMutation, useGetFormsQuery, useDownloadFileQuery } =
  formsApi;
