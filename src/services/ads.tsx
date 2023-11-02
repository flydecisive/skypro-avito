import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090",
  }),
  tagTypes: ["ADS", "FEEDBACK"],
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: (sorting) => `/ads${sorting}`,
      providesTags: [{ type: "ADS", id: "LIST" }],
    }),

    createComment: builder.mutation({
      query: (args) => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );
        return {
          url: `/ads/${args.id}/comments`,
          method: "POST",
          body: { text: args.text },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
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
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: `/user`,
          method: `GET`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    updateTokens: builder.mutation<{}, void>({
      query: () => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );
        const { refresh_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: "/auth/login",
          method: "PUT",
          body: {
            access_token: access_token,
            refresh_token: refresh_token,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      transformResponse: (response: any) => {
        localStorage.setItem(
          "tokenData",
          JSON.stringify({
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          })
        );

        return response;
      },
    }),

    getAuthUserAds: builder.query<{}, void>({
      query: () => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: "/ads/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    addUserAvatar: builder.mutation({
      query: (args) => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );
        const formData = new FormData();
        formData.append("file", args.file);

        return {
          url: "/user/avatar",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
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
  useUpdateTokensMutation,
  useLazyGetAuthUserAdsQuery,
  useAddUserAvatarMutation,
} = adsApi;
