import { api } from "../api/base";

// interface profilePicture {
//   id?: string;
//   profileImageUrl?: string | unknown;
// }

const commentApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getComments: query({
      query: () => `/comment/comments/all`,
      providesTags: ["comments", "comment"],
    }),

    uploadProfilePicture: mutation({
      query: ({ id, ...body }) => ({
        url: `/uploads/profile-picture/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["employee", "employees"],
    }),
  }),
});

export const { useUploadProfilePictureMutation } = commentApi;
