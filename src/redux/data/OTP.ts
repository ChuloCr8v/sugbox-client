import { api } from "../api/base";

interface otp {
  id?: string;
  OTP?: string;
  isAdmin?: boolean;
  action?: string;
}

const OTPApi = api.injectEndpoints({
  endpoints: ({ mutation }) => ({
    generateOTP: mutation<void, otp>({
      query: ({ id, ...body }) => ({
        url: `/otp/generate-otp/${id}`,
        method: "POST",
        body: body,
      }),
    }),
    verifyOTP: mutation<void, otp>({
      query: ({ id, ...body }) => ({
        url: `/otp/verify-otp/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const { useGenerateOTPMutation, useVerifyOTPMutation } = OTPApi;
