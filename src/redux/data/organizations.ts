import { api } from "../api/base";

const organizationsApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    // addemployee: mutation<void, employee>({
    //   query: ({ id, employee }) => ({
    //     url: `employee/new-employee/${id}`,
    //     method: "POST",
    //     body: employee,
    //   }),
    //   invalidatesTags: ["employees", "employee"],
    // }),
    getOrganizations: query({
      query: () => "/organizations/all",
      providesTags: ["organization", "organizations"],
    }),
    getOrganization: query({
      query: (id: string) => `/organizations/${id}`,
      providesTags: ["organization", "organizations"],
    }),
  }),
});

export const { useGetOrganizationsQuery, useGetOrganizationQuery } =
  organizationsApi;
