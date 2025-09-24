import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackToButton = (props: { url: string; page: string }) => {
  return (
    <Link
      to={`${props.url}`}
      className="flex items-center justify-center w-full h-8 text-gray-200 gap-3"
    >
      <FaArrowLeft /> <span className="">Back to {props.page}</span>
    </Link>
  );
};

export default BackToButton;
