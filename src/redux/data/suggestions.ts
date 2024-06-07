import { api } from "../api/base";

interface suggestion {
  _id?: string;
  id?: string;
  suggestion?: { title: string; suggestion: string; isAnonymous: boolean };
}

const suggestionApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addSuggestion: mutation<void, suggestion>({
      query: ({ id, suggestion }) => ({
        url: `suggestion/new-suggestion/${id}`,
        method: "POST",
        body: suggestion,
        formData: true,
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),

    getSuggestions: query({
      query: (id) => `suggestion/all/${id}`,
      providesTags: ["suggestions", "suggestion"],
    }),

    getSuggestion: query({
      query: (id) => `suggestion/get-suggestion/${id}`,
      providesTags: ["suggestions", "suggestion"],
    }),

    deleteSuggestion: mutation({
      query: (id) => ({
        url: `/suggestion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),

    editSuggestion: mutation<void, suggestion>({
      query: ({ _id, ...suggestion }) => ({
        url: `suggestion/edit-suggestion/${_id}`,
        method: "PUT",
        body: suggestion,
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),

    upVoteSuggestion: mutation<void, suggestion>({
      query: ({ _id, ...suggestion }) => ({
        url: `suggestion/upvote/${_id}`,
        method: "PUT",
        body: suggestion,
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),

    downVoteSuggestion: mutation<void, suggestion>({
      query: ({ _id, suggestion }) => ({
        url: `suggestion/downvote/${_id}`,
        method: "PUT",
        body: suggestion,
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),

    approveSuggestion: mutation({
      query: (id) => ({
        url: `suggestion/approve-suggestion/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),

    rejectSuggestion: mutation({
      query: (id) => ({
        url: `suggestion/reject-suggestion/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["suggestions", "suggestion"],
    }),
  }),
});

export const {
  useGetSuggestionsQuery,
  useGetSuggestionQuery,
  useEditSuggestionMutation,
  useUpVoteSuggestionMutation,
  useDownVoteSuggestionMutation,
  useAddSuggestionMutation,
  useApproveSuggestionMutation,
  useDeleteSuggestionMutation,
  useRejectSuggestionMutation,
} = suggestionApi;
