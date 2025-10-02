import { FaRegComments, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { useGetEmployeeQuery } from "../redux/data/employees";
import { suggestionProps } from "../types";
import { dateFormatter } from "../utils.ts/dateFormatter";
import CardWrapper from "./global/CardWrapper";
import SuggestionStatusTag from "./SuggestionStatusTag";

type Props = { suggestion: suggestionProps };

const TrendingSuggestionCard = (props: Props) => {
  const { data: employee } = useGetEmployeeQuery(props.suggestion?.userId);
  return (
    <CardWrapper className="flex-col gap-4 h-full min-w-[300px] w-full ">
      <div className="space-y-1 w-full">
        <p className="text-gray-300 font-semibold flex items-center gap-2">
          {props.suggestion?.title}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {/* <div className="border-l-2 mx-2 mr-2 h-6 w-0 border-gray-600"></div>  */}
          <p className="">
            {/* <span className="italic">by</span>{" "} */}
            {employee ? employee.firstName + " " + employee.lastName : ""}
          </p>
          <div className="border-l-2 h-3 w-0 border-gray-600"></div>

          <p className="">{dateFormatter(props.suggestion?.createdAt)}</p>
        </div>
      </div>

      <div className="text-sm flex items-center w-full justify-between">
        <div className="flex items-center justify-center gap-4 text-xs">
          <p className="flex items-center gap-2 text-green-600">
            <FaRegThumbsDown /> {props.suggestion?.upVotes.length}
          </p>
          <div className="flex items-center gap-2 text-red-600">
            <FaRegThumbsUp />
            <p className="">{props.suggestion?.downVotes.length}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <FaRegComments />
            <p className="">{props.suggestion?.comments.length}</p>
          </div>
        </div>

        <div className="">
          <SuggestionStatusTag status={props.suggestion?.status} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default TrendingSuggestionCard;
