import { api } from "../api/base";

const commentApi = api.injectEndpoints({
  endpoints: ({ mutation }) => ({
    uploadProfilePicture: mutation({
      query: ({ id, ...body }) => ({
        url: `/uploads/profile-picture/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [
        "employee",
        "employees",
        "organization",
        "organizations",
      ],
    }),
  }),
});

export const { useUploadProfilePictureMutation } = commentApi;
