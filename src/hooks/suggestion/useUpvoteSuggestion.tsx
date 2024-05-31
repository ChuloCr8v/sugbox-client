import { message } from "antd";
import {
  useGetSuggestionQuery,
  useUpVoteSuggestionMutation,
} from "../../redux/data/suggestions";
import UseGetAuth from "../useGetAuth";

const useUpvoteSuggestion = (id?: string) => {
  const [upVoteSuggestion, { isLoading: upvoteSuggestionLoading }] =
    useUpVoteSuggestionMutation();
  const { data: suggestion } = useGetSuggestionQuery(id);
  const { id: userId } = UseGetAuth();

  const upvoteSuggestion = async () => {
    if (suggestion.userId === userId) {
      message.error("Sorry, You can't vote your own suggestion.");
      return;
    }
    try {
      await upVoteSuggestion(suggestion).unwrap();
      message.success("Upvote Successfull.");
    } catch (error) {
      upvoteSuggestion;
      message.error("upvote Failed. Check your network and try again.");
      console.log(error);
    }
  };

  return { upvoteSuggestion, upvoteSuggestionLoading };
};

export default useUpvoteSuggestion;
