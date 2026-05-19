import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface TDonationLog {
//   _id?: string;
//   userEmail: string;
//   campaignTitle: string;
//   category: string;
//   amount: number;
//   timestamp: string;
// }

export interface TDonationLog {
  _id: string;
  transactionId: string;
  campaignTitle: string;
  amount: number;
  email: string;
  status: string;
  createdAt: string;
  paidAt?: string;
}

export interface UserAccount {
  _id?: string;
  name?: string;
  email: string;
  role: string;
}

interface RootStateCustom {
  auth?: {
    token?: string | null;
  };
}

export interface IPaymentPayload {
  id: string;
  amount: number;
  email: string;
  campaignTitle?: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",

  // 🎯 Configuration with automated JWT Bearer token injection
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://l2-b2-frontend-path-assignment-6-server-jet.vercel.app/",
    baseUrl: "http://localhost:5000/",

    prepareHeaders: (headers: Headers, { getState }) => {
      const token =
        localStorage.getItem("token") ||
        (getState() as RootStateCustom)?.auth?.token;

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

    getUserHistory: builder.query<TDonationLog[], string>({
      query: (email) => ({
        url: `user/donation-history/${email.trim().toLowerCase()}`,
        method: "GET",
      }),
      transformResponse: (
        response:
          | TDonationLog[]
          | { data: TDonationLog[] }
          | { result: TDonationLog[] },
      ): TDonationLog[] => {
        if (Array.isArray(response)) return response;
        if (response && typeof response === "object") {
          if ("data" in response && Array.isArray(response.data))
            return response.data;
          if ("result" in response && Array.isArray(response.result))
            return response.result;
        }
        return [];
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
    initiatePayment: builder.mutation<
      { url: string },
      {
        id: string;
        amount: number;
        email: string;
        campaignTitle?: string;
        campaignId?: string;
      }
    >({
      query: (paymentInfo) => ({
        url: "/api/payment/initiate",
        method: "POST",
        body: paymentInfo,
      }),

      invalidatesTags: ["reliefGoods"],
    }),

    getAllUsersHistory: builder.query<TDonationLog[], void>({
      query: () => ({
        url: "admin/all-donation-history",
        method: "GET",
      }),
      transformResponse: (
        response:
          | TDonationLog[]
          | { data: TDonationLog[] }
          | { result: TDonationLog[] },
      ): TDonationLog[] => {
        if (Array.isArray(response)) return response;
        if (response && typeof response === "object") {
          if ("data" in response && Array.isArray(response.data))
            return response.data;
          if ("result" in response && Array.isArray(response.result))
            return response.result;
        }
        return [];
      },
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
        return Array.isArray(response) ? response : response?.data || [];
      },
      providesTags: ["user"],
    }),

    // endpoints ব্লকের ভেতরে এটি পেস্ট করো:
    getClimateAlerts: builder.query<
      {
        success: boolean;
        alerts: Record<string, { hazardLevel: string; reasons: string[] }>;
      },
      void
    >({
      query: () => ({
        url: "api/climate-alerts",
        method: "GET",
      }),
      providesTags: ["reliefGoods"], // পেমেন্ট আপডেট হলে যেন আবহাওয়া ট্র্যাকারও রিফ্রেশ হয়
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
  useInitiatePaymentMutation,
  useGetClimateAlertsQuery,
} = baseApi;
