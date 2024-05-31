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

  const titleColor = (status: string) => {
    if (status === "pending") {
      return "orange-500";
    } else if (status === "approved") {
      return "green-500";
    } else if (status === "rejected") {
      return "red-500";
    } else return "primaryblue";
  };

  return (
    <a
      href={`/suggestion/${props.data._id}`}
      className="bg-white w-full rounded border border-gray-200 hover:border-blue-100 duration-200"
    >
      {props.isLoading ? (
        <div className="p-2">
          <Skeleton active className="max-w-[320px]" />
        </div>
      ) : (
        <>
          <div className="flex flex-col p-2 border-b border-gray-100 w-full ">
            <p className="font-semibold text-primaryblue capitalize">
              {props.data.title.slice(0, 30)}
              {props.data.title.length > 30 && "..."}
            </p>
            <div className="text-sm flex gap-2 items-center">
              <p
                className={twMerge(
                  " text-primaryblue",
                  props.data.isAnonymous && "text-gray-500"
                )}
              >
                {props.data.isAnonymous ? (
                  <span className="flex gap-1 ">
                    <FaUserNinja className="mt-0.5" /> Anonymous
                  </span>
                ) : (
                  user?.firstName + " " + user?.lastName
                )}
              </p>
              <p className="text-gray-500 text-[12px]">
                {dayjs(props.data.createdAt).format("DD.MM.YYYY")}
              </p>
            </div>
          </div>
          <div className="p-2 flex flex-col justify-between">
            <p className=" text-textcolor text-sm">
              {props.data.suggestion.slice(0, 100)}
              {props.data.suggestion.length > 100 && "..."}
            </p>

            <p className="mt-2 text-[13px] text-primaryblue">
              {props.data.comments.length}{" "}
              <span className="capitalize text-textcolor">
                comment
                {props.data.comments.length > 1 && (
                  <span className="lowercase">s</span>
                )}
              </span>
            </p>
          </div>

          <div className="p-2 flex justify-between items-center border-t border-gray-100 ">
            <p className="capitalize font-semibold text-sm">
              status:
              <span
                className={twMerge(
                  `text-${titleColor(props.data.status)} ml-1`
                )}
              >
                {props.data.status}
              </span>
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <FaThumbsUp className="text-green-500" />
                {props.data.upVotes.length}
              </span>
              <span className="flex items-center gap-2">
                <FaThumbsDown className="mt-[5px] text-red-500" />
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
