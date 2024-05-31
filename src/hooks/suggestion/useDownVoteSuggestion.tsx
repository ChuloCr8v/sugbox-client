import { message } from "antd";
import {
  useDownVoteSuggestionMutation,
  useGetSuggestionQuery,
} from "../../redux/data/suggestions";
import UseGetAuth from "../useGetAuth";

const useDownvoteSuggestion = (id?: string) => {
  const [downVoteSuggestion, { isLoading: downvoteSuggestionLoading }] =
    useDownVoteSuggestionMutation();
  const { data: suggestion } = useGetSuggestionQuery(id);
  const { id: userId } = UseGetAuth();

  const downvoteSuggestion = async () => {
    try {
      if (suggestion.userId === userId) {
        message.error("Sorry, You can't vote your own suggestion.");
        return;
      }
      await downVoteSuggestion(suggestion).unwrap();
      message.success("downvote Successfull.");
    } catch (error) {
      message.error("downvote Failed. Check your network and try again.");
      console.log(error);
    }
  };

  return { downvoteSuggestion, downvoteSuggestionLoading };
};

export default useDownvoteSuggestion;
