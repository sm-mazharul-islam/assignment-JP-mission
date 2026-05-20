import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DonationPayload {
  id: string;
  donateAmount: number;
  userEmail: string;
  campaignTitle: string;
  category: string;
}

// ২. রেসপন্স টাইপ (আপনার ডাটাবেস থেকে যা ফিরছে)
interface DonationResponse {
  success: boolean;
  message?: string;
  // updatedGoods?: any;
}

//!
// ১. পেমেন্ট রিকোয়েস্টের জন্য টাইপ
interface PaymentRequest {
  id: string;
  amount: number;
  email: string;
  campaignTitle?: string;
  campaignId?: string;
}

// ২. পেমেন্ট রেসপন্সের জন্য টাইপ
interface PaymentResponse {
  url: string;
  success?: boolean;
}

//!

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
    baseUrl: "https://l2-b2-frontend-path-assignment-6-server-jet.vercel.app/",
    // baseUrl: "http://localhost:5000/",

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
  tagTypes: ["supplies", "user", "reliefGoods", "donationHistory", "reviews"],
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
      providesTags: (_, __, id) => [{ type: "reliefGoods", id }],
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

    // ৩. টাইপ-সেফ মিউটেশন
    donateToPackage: builder.mutation<DonationResponse, DonationPayload>({
      query: (donationData) => ({
        url: `relief-goods/${donationData.id}`,
        method: "PUT",
        body: {
          donateAmount: donationData.donateAmount,
          userEmail: donationData.userEmail,
          campaignTitle: donationData.campaignTitle,
          category: donationData.category,
        },
      }),
      // ইনভ্যালিডেশন লজিক
      invalidatesTags: (_, __, arg) => [
        { type: "reliefGoods" as const, id: arg.id },
        "donationHistory",
      ],
    }),
    initiatePayment: builder.mutation<PaymentResponse, PaymentRequest>({
      query: (paymentInfo) => ({
        url: "/api/payment/initiate",
        method: "POST",
        body: {
          ...paymentInfo,
          campaignId: paymentInfo.campaignId || paymentInfo.id,
        },
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
      providesTags: ["reliefGoods"],
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

    // api.ts
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["reviews"],
    }),
    getMyReviews: builder.query({ query: (email) => `/reviews/${email}` }),
    getAllReviews: builder.query({
      query: () => "/admin/reviews",
      providesTags: ["reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
        invalidatesTags: ["reviews"],
      }),
    }),
    // api.ts এ এটি আপডেট করো
    pinReview: builder.mutation({
      query: ({ id, isPinned }) => ({
        url: `/reviews/pin/${id}`,
        method: "PATCH",
        body: { isPinned },
      }),
      invalidatesTags: ["reviews"],
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
  useAddReviewMutation,
  useGetMyReviewsQuery,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  usePinReviewMutation,
} = baseApi;
