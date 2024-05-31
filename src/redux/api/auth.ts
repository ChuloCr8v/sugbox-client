import { api, tagTypes } from "./base";

export type LoginInput = {
  email?: string;
  password: string;
  id?: string;
};

export type resetPassword = {
  email?: string;
  formData?: {};
  newPassword?: string;
  action?: string;
  token?: string;
};

export type resetEmail = {
  email?: string;
  id?: string;
};

export type User = {
  isActive: boolean;
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResult = {
  others: {};
  user: User;
  access_token: string;
};

export const authApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    adminSignup: mutation({
      query: (formData) => ({
        url: "/auth/organization/new",
        method: "POST",
        body: formData,
      }),
    }),

    employeeSignup: mutation({
      query: ({ id, formData }) => ({
        url: `/auth/employee/new/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["employees", "employee"],
    }),

    adminVerification: mutation({
      query: ({ token, id }) => ({
        url: `/auth/verify-organization/${token}/${id}`,
        method: "PUT",
      }),
    }),

    employeeLogin: mutation<AuthResult, LoginInput>({
      query: (credentials) => ({
        url: "/auth/employee/login-employee",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: tagTypes,
    }),

    adminLogin: mutation<AuthResult, LoginInput>({
      query: (credentials) => ({
        url: "/auth/company/login-company",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: tagTypes,
    }),

    logout: mutation<unknown, void>({
      queryFn: () => ({ data: { success: true } }),
      invalidatesTags: tagTypes,
    }),

    getAuthUser: query<User, void>({
      query: () => "auth/user",
      providesTags: ["user"],
    }),

    verifyOldPassword: mutation<AuthResult, LoginInput>({
      query: ({ id, ...oldPassword }) => ({
        url: `/auth/employee/verifyOldPassword/${id}`,
        method: "PUT",
        body: oldPassword,
      }),
    }),

    resetEmployeePassword: mutation<AuthResult, resetPassword>({
      query: ({ email, ...data }) => ({
        url: `/auth/employee/reset-password/${email}`,
        method: "PUT",
        body: data,
      }),
    }),

    resetEmployeeEmail: mutation<AuthResult, resetEmail>({
      query: ({ id, ...data }) => ({
        url: `/auth/employee/reset-email/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    generateResetPasswordLink: mutation<AuthResult, resetPassword>({
      query: ({ email }) => ({
        url: `/auth/employee/forgot-password/${email}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useEmployeeSignupMutation,
  useAdminLoginMutation,
  useEmployeeLoginMutation,
  useGetAuthUserQuery,
  useLogoutMutation,
  useVerifyOldPasswordMutation,
  useResetEmployeePasswordMutation,
  useGenerateResetPasswordLinkMutation,
  useResetEmployeeEmailMutation,
  useAdminSignupMutation,
  useAdminVerificationMutation,
} = authApi;
