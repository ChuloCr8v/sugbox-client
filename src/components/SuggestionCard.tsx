import { FaThumbsDown, FaThumbsUp, FaUserNinja } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { suggestionProps } from "../types";
import dayjs from "dayjs";
import { Skeleton } from "antd";
import { useGetEmployeeQuery } from "../redux/data/employees";

interface Props {
  isLoading?: boolean;
  data: suggestionProps;
}

const SuggestionCard = (props: Props) => {
  const id = props.data.userId;
  const { data: user } = useGetEmployeeQuery(id);

  // Map statuses to fixed Tailwind classes
  const statusStyles: Record<string, string> = {
    pending: "text-orange-500 bg-orange-500/15 border border-orange-500/30",
    approved: "text-green-500 bg-green-500/15 border border-green-500/30",
    rejected: "text-red-500 bg-red-500/15 border border-red-500/30",
    default: "text-primaryblue bg-primaryblue/15 border border-primaryblue/30",
  };

  const getStatusClasses = (status: string) =>
    statusStyles[status] ?? statusStyles.default;

  return (
    <a
      href={`/suggestion/${props.data._id}`}
      className="bg-black/40 backdrop-blur-sm w-full rounded-xl border border-gray-600 hover:border-primaryblue/50 hover:shadow-md hover:shadow-primaryblue/10 transition duration-200"
    >
      {props.isLoading ? (
        <div className="p-2">
          <Skeleton active className="max-w-[320px]" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col p-4 border-b border-gray-600">
            <p className="font-semibold text-primaryblue capitalize text-lg">
              {props.data.title.slice(0, 30)}
              {props.data.title.length > 30 && "..."}
            </p>
            <div className="text-sm flex gap-3 items-center mt-1">
              <p
                className={twMerge(
                  "text-primaryblue flex items-center gap-1",
                  props.data.isAnonymous && "text-gray-300"
                )}
              >
                {props.data.isAnonymous ? (
                  <>
                    <FaUserNinja className="mt-0.5" /> Anonymous
                  </>
                ) : (
                  `${user?.firstName ?? ""} ${user?.lastName ?? ""}`
                )}
              </p>
              <span className="text-gray-400 text-xs">
                {dayjs(props.data.createdAt).format("DD.MM.YYYY")}
              </span>
            </div>
          </div>

          {/* Suggestion text */}
          <div className="p-4 flex flex-col">
            <p className="text-textcolor text-sm leading-relaxed">
              {props.data.suggestion.slice(0, 100)}
              {props.data.suggestion.length > 100 && "..."}
            </p>

            <p className="mt-3 text-xs text-gray-400">
              {props.data.comments.length}{" "}
              <span className="capitalize text-textcolor">
                comment
                {props.data.comments.length > 1 && "s"}
              </span>
            </p>
          </div>

          {/* Footer */}
          <div className="p-4 flex justify-between items-center border-t border-gray-600">
            <span
              className={twMerge(
                "capitalize font-medium text-xs rounded-full px-3 py-1",
                getStatusClasses(props.data.status)
              )}
            >
              {props.data.status}
            </span>

            <div className="flex items-center gap-5 text-sm">
              <span className="flex items-center gap-1 text-green-500">
                <FaThumbsUp /> {props.data.upVotes.length}
              </span>
              <span className="flex items-center gap-1 text-red-500">
                <FaThumbsDown className="mt-[2px]" />{" "}
                {props.data.downVotes.length}
              </span>
            </div>
          </div>
        </>
      )}
    </a>
  );
};

export default SuggestionCard;
