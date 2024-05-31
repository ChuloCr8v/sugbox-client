import { ReactNode } from "react";
import { FaThumbsUp, FaThumbsDown, FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const VoteComponent = (props: {
  downVoteLoading: boolean;
  upVoteLoading: boolean;
  disableVoteFunction: () => boolean;
  disableDownVoteFunction: () => boolean;
  upVotesConditionalStyle?: string;
  upVotesLength: ReactNode;
  downVotesClick: () => void;
  downVoteConditionalStyle?: string;
  downVotesLength: ReactNode;
  upVotesClick: () => void;
  suggestion: {
    upVotes: Array<Object>;
    user: { role: string };
    userId: string;
  };
}) => {
  const isAdmin = props.suggestion?.user?.role.toLowerCase() === "admin";
  return (
    <div className="flex items-center  border rounded px-3 h-8 w-fit">
      <div className="flex items-center gap-4 pr-2">
        {isAdmin ? (
          "Upvotes"
        ) : props.downVoteLoading || props.upVoteLoading ? (
          <FaSpinner className="text-green-300 animate-spin" />
        ) : (
          <FaThumbsUp
            onClick={props.upVotesClick}
            className={twMerge(
              "text-gray-500 hover:text-primaryblue hover:scale-110 cursor-pointer duration-200 hover:-rotate-[20deg]",
              props.upVotesConditionalStyle,
              props.disableVoteFunction() &&
                "text-green-500 hover:scale-1 hover:-rotate-[0] cursor-default hover:text-green-500 "
            )}
          />
        )}
        <p className="duration-300">{props.upVotesLength}</p>
      </div>
      <div className="flex items-center gap-4 border-l pl-2">
        {props.downVoteLoading || props.upVoteLoading ? (
          <FaSpinner className="text-red-300 animate-spin" />
        ) : (
          <FaThumbsDown
            onClick={props.downVotesClick}
            className={twMerge(
              "text-gray-500 mt-2 hover:text-primaryred hover:scale-110 cursor-pointer duration-200 hover:rotate-[20deg]",
              props.downVoteConditionalStyle,
              props.disableDownVoteFunction() &&
                "text-red-500 hover:scale-1 hover:-rotate-[0] cursor-default hover:red-green-500 "
            )}
          />
        )}
        <p className="">{props.downVotesLength}</p>
      </div>
    </div>
  );
};

export default VoteComponent;
