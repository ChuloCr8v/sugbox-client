import { api } from "../api/base";

interface otp {
  id?: string;
  OTP?: string;
}

const OTPApi = api.injectEndpoints({
  endpoints: ({ mutation }) => ({
    generateOTP: mutation<void, otp>({
      query: ({ id }) => ({
        url: `/otp/generate-otp/${id}`,
        method: "POST",
      }),
    }),
    verifyOTP: mutation<void, otp>({
      query: ({ id, ...OTP }) => ({
        url: `/otp/verify-otp/${id}`,
        method: "PUT",
        body: OTP,
      }),
    }),
  }),
});

export const { useGenerateOTPMutation, useVerifyOTPMutation } = OTPApi;
