import { FaBan, FaCheck, FaRegQuestionCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const SuggestionStatusTag = (props: { status: string }) => {
  const color =
    props.status?.toLowerCase() === "pending"
      ? "bg-[#fdd791] text-yellow-600 border-yellow-300"
      : props.status?.toLowerCase() === "approved"
      ? "bg-[#a1fd91] text-green-600 border-green-300"
      : "bg-[#fd9090] text-red-600 border-red-300";

  return (
    <div
      className={twMerge(
        `${color} Capitalize font-semibold text-[12px] w-fit px-2 py-0.5 rounded-full bg-opacity-20 border`
      )}
    >
      {props.status?.toLowerCase() === "pending" ? (
        <div className=" flex items-center justify-center gap-1">
          <FaRegQuestionCircle className="text-[13px]" />
          Pending
        </div>
      ) : props.status?.toLowerCase() === "approved" ? (
        <div className=" flex items-center justify-center gap-1">
          <FaCheck />
          Approved
        </div>
      ) : (
        <div className=" flex items-center justify-center gap-1">
          <FaBan className=" text-[13px]" />
          Rejected
        </div>
      )}
    </div>
  );
};

export default SuggestionStatusTag;
