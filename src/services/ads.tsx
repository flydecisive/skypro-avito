import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090",
  }),
  tagTypes: ["ADS", "FEEDBACK", "USER"],
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
          body: JSON.stringify({ text: args.text }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "FEEDBACK", id: "LIST" }] : [],
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
      providesTags: [{ type: "USER", id: "LIST" }],
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
          body: JSON.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          }),
          headers: {
            "Content-Type": "application/json",
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
      providesTags: [{ type: "ADS", id: "LIST" }],
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
      invalidatesTags: (result) =>
        result ? [{ type: "USER", id: "LIST" }] : [],
    }),

    getAllUsers: builder.query<[], void>({
      query: () => {
        return {
          url: "/user/all",
          method: "GET",
        };
      },
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (args) => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: "/user",
          method: "PATCH",
          body: JSON.stringify({
            name: args.name,
            surname: args.surname,
            city: args.city,
            phone: args.phone,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "USER", id: "LIST" }] : [],
    }),

    deleteAds: builder.mutation({
      query: (args) => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: `/ads/${args.id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [{ type: "ADS", id: "LIST" }],
    }),

    addAds: builder.mutation({
      query: (args) => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: "/adstext",
          method: "POST",
          body: JSON.stringify({
            title: args.title,
            description: args.description,
            price: args.price,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [],
    }),

    updateUserAds: builder.mutation({
      query: (args) => {
        const { access_token } = JSON.parse(
          localStorage.getItem("tokenData") || "{}"
        );

        return {
          url: `/ads/${args.id}`,
          method: "PATCH",
          body: JSON.stringify({
            title: args.title,
            description: args.description,
            price: args.price,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "ADS", id: "LIST" }] : [],
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
  useLazyGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteAdsMutation,
  useAddAdsMutation,
  useUpdateUserAdsMutation,
} = adsApi;
