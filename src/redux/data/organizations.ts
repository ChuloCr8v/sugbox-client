import { api } from "../api/base";

const organizationsApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getOrganizations: query({
      query: () => "/organizations/all",
      providesTags: ["organization", "organizations"],
    }),
    getOrganization: query({
      query: (id) => `/organizations/${id}`,
      providesTags: ["organization", "organizations"],
    }),

    editOrganization: mutation({
      query: ({ _id, ...body }) => ({
        url: `/organizations/edit-organization/${_id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["organization", "organizations"],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationQuery,
  useEditOrganizationMutation,
} = organizationsApi;
