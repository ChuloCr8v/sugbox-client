import {
  FaBan,
  FaRegCheckCircle,
  FaRegFile,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface Props {
  filter?: string;
  data: {
    title: string;
    number: Number;
  };
}

const icon = (title: string) => {
  if (title === "total") {
    return <FaRegFile />;
  } else if (title === "pending") {
    return <FaRegQuestionCircle />;
  } else if (title === "approved") {
    return <FaRegCheckCircle />;
  } else return <FaBan />;
};

const iconBg = (title: string) => {
  if (title === "pending") {
    return "orange-500";
  } else if (title === "approved") {
    return "green-500";
  } else if (title === "rejected") {
    return "red-500";
  } else return "primaryblue";
};

const FilterCard = (props: Props) => {
  // const setBg = () => {
  //   return props.filter === "pending" &&
  //     props.data.title.toLowerCase() === "pending"
  //     ? "bg-orange-500 text-white"
  //     : props.filter === "approved" &&
  //       props.data.title.toLowerCase() === "approved"
  //     ? "bg-green-500 text-white"
  //     : props.filter === "rejected" &&
  //       props.data.title.toLowerCase() === "rejected"
  //     ? "bg-red-500 text-white"
  //     : "";
  // };

  const setIconBg = () => {
    return props.filter === "pending" &&
      props.data.title.toLowerCase() === "pending"
      ? "text-orange-500 bg-white"
      : props.filter === "approved" &&
        props.data.title.toLowerCase() === "approved"
      ? "text-green-500 bg-white"
      : props.filter === "rejected" &&
        props.data.title.toLowerCase() === "rejected"
      ? "text-red-500 bg-white"
      : `bg-${iconBg(props.data.title)}`;
  };

  // const hoverBg = (filter: string) => {
  //   if (filter.toLowerCase() === "pending") {
  //     return "hover:bg-orange-500 hover:text-white";
  //   } else if (filter.toLowerCase() === "approved") {
  //     return "hover:bg-green-500 hover:text-white";
  //   } else if (filter.toLowerCase() === "rejected") {
  //     return "hover:bg-red-500 hover:text-white";
  //   } else return "hover:bg-primaryblue hover:text-white";
  // };

  // const iconHoverBg = (filter: string) => {
  //   return filter.toLowerCase() === "pending"
  //     ? "group-hover:bg-white group-hover:text-orange-500"
  //     : filter === "approved"
  //     ? "group-hover:bg-white group-hover:text-green-500"
  //     : filter === "rejected"
  //     ? "group-hover:bg-white group-hover:text-red-500"
  //     : "group-hover:bg-white group-hover:text-primaryblue";
  // };

  return (
    <div
      //  onClick={() => props.setFilter(props.data.title)}
      className="flex justify-between p-4 bg-black/40 backdrop-blur-sm w-full rounded-xl border border-gray-600"
    >
      <div className="flex  items-center gap-3">
        <p className="font-bold text-base text-left text-primaryblue">
          {props.data?.number}
        </p>
        <p className=" text-base capitalize text-white">{props.data?.title}</p>
      </div>
      <div
        className={twMerge(
          "rounded-full h-8 w-8 flex items-center justify-center text-white duration-200 font-semibold text-xl",
          setIconBg()
          // iconHoverBg(props.data.title)
        )}
      >
        {icon(props.data?.title)}
      </div>
    </div>
  );
};

export default FilterCard;
