import { useGetEmployeeQuery } from "../redux/data/employees";
import { suggestionProps } from "../types";
import { dateFormatter } from "../utils.ts/dateFormatter";
import SuggestionStatusTag from "./SuggestionStatusTag";

type Props = { suggestion: suggestionProps };

const TrendingSuggestionCard = (props: Props) => {
  const { data: employee } = useGetEmployeeQuery(props.suggestion?.userId);
  return (
    <div className="grid gap-4">
      <div className="space-y-1">
        <p className="text-primaryblue font-semibold flex items-center gap-2">
          {props.suggestion?.title}{" "}
          <SuggestionStatusTag status={props.suggestion?.status} />
        </p>
        <p className="text-sm text-gray-500">
          {dateFormatter(props.suggestion?.createdAt)}
        </p>
      </div>

      <div className="flex flex-col items-start">
        <div className="">
          <p className="text-gray-500">
            <span className="italic">by</span>{" "}
            {employee ? employee.firstName + " " + employee.lastName : ""}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <p className="text-green-500">
            {props.suggestion?.upVotes.length} upvotes
          </p>
          <p className="text-red-500">
            {props.suggestion?.downVotes.length} downvotes
          </p>
          <p className="">{props.suggestion?.comments.length} comments</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingSuggestionCard;
