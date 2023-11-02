import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090",
    prepareHeaders: (headers) => {
      const { access_token } = JSON.parse(
        localStorage.getItem("tokenData") || "{}"
      );

      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["ADS"],
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: (sorting) => `/ads${sorting}`,
      providesTags: [{ type: "ADS", id: "LIST" }],
    }),
    createComment: builder.mutation({
      query: (args) => {
        return {
          url: `/ads/${args.id}/comments`,
          method: "POST",
          body: { text: args.text },
        };
      },
      invalidatesTags: (result) =>
        result
          ? [
              { type: "ADS", id: result.id },
              { type: "ADS", id: "LIST" },
            ]
          : [],
    }),
    getCurrentUser: builder.query<{}, void>({
      query: () => {
        return {
          url: `/user`,
          method: `GET`,
        };
      },
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useCreateCommentMutation,
  useGetCurrentUserQuery,
} = adsApi;
