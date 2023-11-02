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
  tagTypes: ["ADS", "FEEDBACK"],
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
              // { type: "FEEDBACK", id: result.id },
              { type: "FEEDBACK", id: "LIST" },
            ]
          : [],
    }),
    getAdsFeedback: builder.query({
      query: (args) => {
        return {
          url: `/ads/${args.ads_id}/comments`,
          method: "GET",
        };
      },
      providesTags: [{ type: "FEEDBACK", id: "LIST" }],
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
  useLazyGetCurrentUserQuery,
  useLazyGetAdsFeedbackQuery,
} = adsApi;
