import dayjs from "dayjs";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { useGetCommentsQuery } from "../redux/data/Comments";
import { suggestionProps } from "../types";

const CommentCard = (props: {
  userId?: string;
  userSuggestions: Array<suggestionProps>;
}) => {
  const { data: comments } = useGetCommentsQuery("");
  const { suggestions } = useGetSuggestions();

  const userComments = comments?.filter(
    (comment: { userId: string }) => comment.userId === props.userId
  );

  const commentedOn = (commentId: string) => {
    const suggestion = suggestions?.find((item: { comments: string[] }) =>
      item.comments.includes(commentId)
    );
    return suggestion;
  };

  return (
    <div className="grid lg:grid-cols-3 gap-2">
      {userComments?.map((item: { comment: string; _id: string }) => (
        <>
          <a
            key={item._id}
            href={`/suggestion/${commentedOn(item?._id)?._id}/#${item?._id}`}
            className="shadow rounded-md w-full py-2 px-3 grid gap-2"
          >
            <p className="capitalize font-semibold text-primaryblue">
              {item.comment}
            </p>
            <div className="">
              <div className="text-gray-400 flex items-center justify-between">
                <p className="text-[13px] flex items-center gap-1">
                  on{" "}
                  <div className=" font-semibold lowercase italic text-black underline">
                    {commentedOn(item?._id)?.title.slice(0, 20)}{" "}
                    {commentedOn(item?._id)?.title.length > 20 && "..."}
                  </div>
                </p>
                <p className="text-[13px] text-gray-700">
                  {dayjs(commentedOn(item?._id)?.createdAt).format(
                    "DD MMM YY; HH:mm"
                  )}
                </p>
              </div>
            </div>
          </a>
        </>
      ))}
    </div>
  );
};

export default CommentCard;
