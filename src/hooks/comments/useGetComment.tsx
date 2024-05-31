import { useGetCommentsQuery } from "../../redux/data/Comments";
import { commentsProps } from "../../types";

const useGetComments = (suggestionId?: string) => {
  // const { id } = UseGetAuth();
  const { data, isLoading } = useGetCommentsQuery(suggestionId);
  const comments = data?.filter(
    (comment: commentsProps) => comment.suggestionId === suggestionId
  );
  return {
    isLoading,
    comments,
  };
};

export default useGetComments;
