import { ReactNode } from "react";
import { FaThumbsUp, FaThumbsDown, FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import CardWrapper from "./global/CardWrapper";

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
    <CardWrapper className="flex items-center !p-0 overflow-hidden !rounded-full !w-fit">
      <div className="flex items-center gap-3 px-4 py-1 group cursor-pointer hover:bg-green-600/30 duration-300 ">
        {isAdmin ? (
          <p className="text-green-500">Upvotes</p>
        ) : props.downVoteLoading || props.upVoteLoading ? (
          <FaSpinner className="text-green-300 animate-spin" />
        ) : (
          <FaThumbsUp
            onClick={props.upVotesClick}
            className={twMerge(
              "text-gray-500 hover:text-primaryblue group-hover:scale-110 cursor-pointer duration-200 ",
              props.upVotesConditionalStyle,
              props.disableVoteFunction() &&
                "text-green-500 hover:scale-1 hover:-rotate-[0] cursor-default hover:text-green-500 "
            )}
          />
        )}
        <p className="duration-300 text-gray-300">{props.upVotesLength}</p>
      </div>
      <div className="group hover:bg-red-600/30 duration-300 cursor-pointer flex items-center gap-3 border-l border-l-gray-600 py-1 px-4">
        {props.downVoteLoading || props.upVoteLoading ? (
          <FaSpinner className="text-red-300 animate-spin" />
        ) : (
          <FaThumbsDown
            onClick={props.downVotesClick}
            className={twMerge(
              "text-gray-500 group-hover:text-primaryred group-hover:scale-110 cursor-pointer duration-200",
              props.downVoteConditionalStyle,
              props.disableDownVoteFunction() &&
                "text-red-500 hover:scale-1 hover:-rotate-[0] cursor-default hover:red-green-500 "
            )}
          />
        )}
        <p className="text-gray-300">{props.downVotesLength}</p>
      </div>
    </CardWrapper>
  );
};

export default VoteComponent;
