import { useDispatch } from "react-redux";
import Button from "./Button";
import Comment from "./Comment";
import useGetComments from "../hooks/comments/useGetComment";
import { showNewCommentModal } from "../redux/modals";
import { FaSpinner } from "react-icons/fa";
import { commentsProps } from "../types";

const Comments = (suggestionId: { suggestionId?: string }) => {
  const { comments, isLoading: loadingComments } = useGetComments(
    suggestionId.suggestionId
  );

  const dispatch = useDispatch();

  return (
    <div className="bg-white">
      <div className="border-b-[1.5px] flex items-center justify-between px-4 py-1">
        <p className="font-semibold text-gray-600 text-[14px] flex items-center gap-2 uppercase">
          Comments{" "}
          <span className="bg-primaryblue rounded-full text-[12px] text-white h-5 w-5 flex items-center justify-center">
            {comments?.length > 0 ? comments?.length : "0"}
          </span>
        </p>
        <Button
          onClick={() => dispatch(showNewCommentModal())}
          className={
            "capitalize text-primaryblue hover:bg-gray-100 p-1 px-4 font-semibold w-fit"
          }
          text={"Add comment"}
          disabled={false}
        />
      </div>
      {loadingComments ? (
        <div className="font-semibold flex items-center gap-2 text-primaryblue w-full justify-center h-20">
          {" "}
          <FaSpinner className="animate-spin" /> Loading Comments...
        </div>
      ) : (
        <div className="px-4">
          {!comments?.length ? (
            <span className="my-2 block text-gray-500 italic">
              No comments yet
            </span>
          ) : (
            comments.map((comment: commentsProps) => (
              <Comment data={comment} key={comment._id} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
