const API_URL = (import.meta as any).env.VITE_REACT_APP_API_URL;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify_otp",
    VERIFY_WHATSAPP_OTP: "/auth/verify_whatsapp_otp",
    RESEND_OTP: "/auth/resend_otp",
    RESEND_WHATSAPP_OTP: "/auth/resend_whatsapp_otp",
    RESET_PASSWORD: "/auth/reset_password",
    FORGOT_PASSWORD: "/auth/forget_password",
    UPDATE_PHONE_NUMBER: "/auth/change_phone_number",
  },
  USER: {
    GET_PROFILE: "/auth/user",
    UPLOAD_AVATAR: "/profile/upload_profile_picture",
  },
  PUBLIC: {
    JOIN_NEWSLETTER: "/news-letter/join",
    CONTACT_US: "/contact-us",
  },
  WALLET: {
    GET_BALANCE: "/wallet/balance",
    GET_CARDS: "/wallet/cards",
    FUND_WALLET: "/wallet/fund-wallet",
    VERIFY_PAYMENT: "/wallet/verify-payment",
    GET_HISTORY: "/wallet/history",
    WITHDRAWAL: "/withdrawal/request-withdrawal",
    GET_BANKS: "/withdrawal/all-banks",
    VERIFY_BANK_ACCOUNT: "/withdrawal/verify-bank-account",
    GENERATE_PIN_OTP: "/wallet/generate-pin-otp",
    CHANGE_PIN: "/wallet/change-pin",
    DELETE_CARD: "/wallet/cards",
  },
  CONTRIBUTION: {
    CREATE_PLAN: "/contribution/contribute",
    GET_BALANCE: "/contribution/balance",
    GET_HISTORY: "/contribution/contribute",
    PAY_CONTRIBUTION: "/contribution/pay-contribution",
    PAY_WITH_PAYSTACK: "/contribution/pay",
    GET_DETAILS_BY_ID: "/contribution/history",
    WITHDRAW: "/contribution/withdraw",
    PAY_UNPAID: "/contribution/charge-unpaid",
    GET_UNPAID_BALANCE: "/contribution/unpaid",
  },
  PROJECT: {
    GET_ALL: "/project/all-projects",
    CREATE: `${API_URL}/project`,
  },
  KYC: {
    TIER2: "/kyc/tier2/:userId",
  },
  WITHDRAWAL: {
    GET_ALL_REQUESTS: `${API_URL}/withdrawal/requests`,
    APPROVE_WITHDRAWAL: (withdrawalId: string) =>
      `${API_URL}/withdrawal/update-status/${withdrawalId}`,
  },
  NOTIFICATION: {
    CREATE: `${API_URL}/notification`,
  },
  BLOG: {
    CREATE: `${API_URL}/blog`,
    GET_ALL_CATEGORIES: `${API_URL}/blog/category/get-all`,
    GET_ALL_BLOGS: `${API_URL}/blog`,
    CREATE_BLOG_CATEGORY: `${API_URL}/blog/category`,
    DELETE_BLOG_CATEGORY: (categoryId: string) =>
      `${API_URL}/blog/category/${categoryId}`,
    DELETE_BLOG: (blogId: string) => `${API_URL}/blog/${blogId}`,
    GET_BLOG_BY_ID: (blogId: string) => `${API_URL}/blog/${blogId}`,
    UPDATE_BLOG: (blogId: string) => `${API_URL}/blog/${blogId}`,
  },
} as const;
