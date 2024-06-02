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
        <div className="flex items-center gap-2 text-sm">
          <p className="text-gray-500">
            <span className="italic">by</span>{" "}
            {employee ? employee.firstName + " " + employee.lastName : ""}
          </p>
          <p className=" text-gray-500">
            {dateFormatter(props.suggestion?.createdAt)}
          </p>
        </div>
      </div>

      <div className="text-sm flex flex-col items-start">
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
