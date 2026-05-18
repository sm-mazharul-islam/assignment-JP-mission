import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TDonationLog {
  _id?: string;
  userEmail: string;
  campaignTitle: string;
  category: string;
  amount: number;
  timestamp: string;
}

export interface UserAccount {
  _id?: string;
  name?: string;
  email: string;
  role: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",

  // 🎯 Configuration with automated JWT Bearer token injection
  baseQuery: fetchBaseQuery({
    //   baseUrl: "https://l2-b2-frontend-path-assignment-6-server-jet.vercel.app/",

    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // 🎯 Declaring centralized cache tags for automated UI state synchronization
  tagTypes: ["supplies", "user", "reliefGoods", "donationHistory"],

  endpoints: (builder) => ({
    // 👑 AUTH ENDPOINT: Fetch authenticated active profile data
    getLoggedUser: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Inside your endpoints block:
    getUserHistory: builder.query<TDonationLog[], string>({
      query: (email) => ({
        url: `user/donation-history/${email}`,
        method: "GET",
      }),
      // 🎯 Fix: Strongly typing the response parameter as an array of TDonationLog or an object container
      transformResponse: (
        response: TDonationLog[] | { data: TDonationLog[] },
      ) => {
        return Array.isArray(response) ? response : response?.data || [];
      },
      providesTags: ["donationHistory"],
    }),

    // 📡 LEDGER QUERY: Get all active relief campaign packages
    getReliefGoods: builder.query({
      query: () => ({
        url: "relief-goods",
        method: "GET",
      }),
      providesTags: ["supplies"],
    }),

    // 📡 LEDGER QUERY: Get relief goods limited by a specific quantitative number
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

    // 📡 GRAPH QUERY: Fetch organizational operational logs
    getRecentWorks: builder.query({
      query: () => ({
        url: "our-recent-works",
        method: "GET",
      }),
    }),

    // 📡 LEDGER QUERY: Read details of a specific package using explicit ID mapping
    getReliefGoodsById: builder.query({
      query: (id) => ({
        url: `relief-goods/${id}`,
        method: "GET",
      }),
      // 👇 Coupled with dynamic ID tags for immediate selective background caching
      providesTags: (_result, _error, id) => [{ type: "reliefGoods", id }],
    }),

    // 📡 MUTATION: Insert a brand new campaign pack into the centralized database
    addReliefGoods: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "relief-goods",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["supplies"],
    }),

    // 📡 MUTATION: Transmit multi-layered contribution logs and increment package funding metrics
    donateToPackage: builder.mutation({
      query: ({ id, donateAmount, userEmail, campaignTitle, category }) => ({
        url: `relief-goods/${id}`,
        method: "PUT",
        body: { donateAmount, userEmail, campaignTitle, category },
      }),
      // 👇 Simultaneously destroys targeted package cache and active user history logs to force a silent refetch
      invalidatesTags: (_result, _error, arg) => [
        { type: "reliefGoods", id: arg.id },
        "donationHistory",
      ],
    }),

    getAllUsersHistory: builder.query<TDonationLog[], void>({
      query: () => ({
        url: "admin/all-donation-history",
        method: "GET",
      }),
      transformResponse: (
        response: TDonationLog[] | { data: TDonationLog[] },
      ): TDonationLog[] => {
        return Array.isArray(response) ? response : response?.data || [];
      },
      // 'donationHistory' ট্যাগ অ্যাড করা হলো যাতে ইউজার ডোনেট করলে অ্যাডমিন প্যানেলও অটো-রিফেচ হয়
      providesTags: ["donationHistory"],
    }),

    // 📡 MUTATION: Remove a relief node cleanly from the cloud ledger database
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

    // 📡 MUTATION: Overwrite existing operational fields within target packages
    updateSupplies: builder.mutation({
      query: (options) => {
        console.log("inside base api =>", options);
        return {
          url: `relief-goods/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["supplies"],
    }),

    // 📡 BENTO REPORT: Aggregate reporting matrices linked to real-time supply inventory shifts
    getReportingAnalytics: builder.query({
      query: (range) => ({
        url: `reporting-analytics?range=${range}`,
        method: "GET",
      }),
      providesTags: ["supplies"],
    }),

    // 👑 AUTH MUTATION: Provision fresh credentials into database nodes
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),

    // 👑 AUTH MUTATION: Overwrite account operational variables
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: "update-profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsers: builder.query<UserAccount[], void>({
      query: () => "admin/all-users",
      transformResponse: (
        response: UserAccount[] | { data: UserAccount[] },
      ): UserAccount[] => {
        // 🛡️ ব্যাকেন্ড থেকে অবজেক্ট বা এরে যেটাই আসুক, ফ্রন্টএন্ডের জন্য স্যানিটাইজড এরে রিটার্ন করবে
        return Array.isArray(response) ? response : response?.data || [];
      },
      providesTags: ["user"],
    }),
    // 👑 AUTH MUTATION: Exchange system verification matrices for a session authentication token
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

// 🚀 Exporting automated functional hooks for unified component integration
export const {
  useGetReliefGoodsQuery,
  useGetReliefGoodsByIdQuery,
  useGetRecentWorksQuery,
  useAddReliefGoodsMutation,
  useDeleteReliefGoodsMutation,
  useGetReliefGoodsByLimitQuery,
  useUpdateSuppliesMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetReportingAnalyticsQuery,
  useUpdateUserProfileMutation,
  useDonateToPackageMutation,
  useGetLoggedUserQuery,
  useGetUserHistoryQuery,
  useGetAllUsersHistoryQuery,
  useGetAllUsersQuery,
} = baseApi;
