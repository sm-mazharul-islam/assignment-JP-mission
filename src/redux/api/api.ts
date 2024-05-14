import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["supplies"],
  endpoints: (builder) => ({
    getReliefGoods: builder.query({
      query: () => {
        return {
          url: "relief-goods",
          method: "GET",
        };
      },
      providesTags: ["supplies"],
    }),
    getReliefGoodsByLimit: builder.query({
      query: (num) => {
        console.log("Limit Number =>", num);
        return {
          url: `relief-goods?_limit=${num}`,
          method: "GET",
        };
      },
      providesTags: ["supplies"],
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
    addReliefGoods: builder.mutation({
      query: (data) => {
        console.log(data);
        return { url: "relief-goods", method: "POST", body: data };
      },
      invalidatesTags: ["supplies"],
    }),
    deleteReliefGoods: builder.mutation({
      query: (id) => {
        console.log("inside base api =>", id);
        return {
          url: `relief-goods/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["supplies"],
    }),
  }),
});

export const {
  useGetReliefGoodsQuery,
  useGetReliefGoodsByIdQuery,
  useGetRecentWorksQuery,
  useAddReliefGoodsMutation,
  useDeleteReliefGoodsMutation,
  useLazyGetReliefGoodsByLimitQuery,
} = baseApi;
