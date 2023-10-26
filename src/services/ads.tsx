import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090",
  }),
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: (sorting) => `/ads${sorting}`,
    }),
    getAllImgs: builder.query<{}[], void>({
      query: () => "/images",
    }),
  }),
});

export const { useGetAllAdsQuery, useGetAllImgsQuery } = adsApi;
