import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getReliefGoods: builder.query({
      query: () => ({
        url: "relief-goods",
        method: "GET",
      }),
    }),
    getRecentWorks: builder.query({
      query: () => ({
        url: "our-recent-works",
        method: "GET",
      }),
    }),
    getReliefGoodsById: builder.query({
      query: (id) => ({
        url: `relief-goods/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetReliefGoodsQuery,
  useGetReliefGoodsByIdQuery,
  useGetRecentWorksQuery,
} = baseApi;
