import { api } from "../api/base";

interface comment {
  _id?: string;
  id?: string;
  comment?: string;
  isAdmin?: boolean;
}

const commentApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getComments: query({
      query: () => `/comment/comments/all`,
      providesTags: ["comments", "comment"],
    }),

    addComment: mutation<void, comment>({
      query: ({ id, isAdmin, ...comment }) => ({
        url: `comment/new-comment/${id}`,
        method: "POST",
        body: { isAdmin, comment },
      }),
      invalidatesTags: ["comments", "comment", "suggestion", "suggestions"],
    }),

    getComment: query({
      query: (id) => `comment/${id}`,
      providesTags: ["comments", "comment"],
    }),

    editComment: mutation<void, comment>({
      query: ({ id, ...comment }) => ({
        url: `comment/edit-comment/${id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["comments", "comment"],
    }),

    upVoteComment: mutation<void, comment>({
      query: ({ _id, ...comment }) => ({
        url: `comment/upvote/${_id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["comments", "comment"],
    }),

    downVoteComment: mutation<void, comment>({
      query: ({ _id, ...comment }) => ({
        url: `comment/downvote/${_id}`,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["comments", "comment"],
    }),

    deleteComment: mutation({
      query: (id) => ({
        url: `/comment/delete-comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments", "suggestion", "suggestions"],
    }),

    //     createFile: mutation<void, CreateFileInput>({
    //       query: (body) => ({
    //         url: "/file",
    //         method: "POST",
    //         body,
    //       }),
    //       invalidatesTags: ["comments"],
    //     }),

    //     toggleFavourite: mutation<void, IdInput>({
    //       query: (body) => ({
    //         url: `/file/favourite/${body.id}`,
    //         method: "PUT",
    //       }),
    //       invalidatesTags: ["comments"],
    //     }),

    //     mailFile: mutation<void, MailFileInput>({
    //       query: (body) => ({
    //         url: `/file/mail`,
    //         method: "POST",
    //         body,
    //       }),
    //     }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useUpVoteCommentMutation,
  useDownVoteCommentMutation,
  //   useToggleFavouriteMutation,
  //   useDeleteFileMutation,
  //   useUpdateFileMutation,
  //   useMailFileMutation,
} = commentApi;
