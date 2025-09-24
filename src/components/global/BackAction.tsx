import { Button } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const BackAction = (props: {
  wrapperClassName?: string;
  page: string;
  handleGoBack: any;
}) => {
  return (
    <Button
      size="large"
      type="link"
      onClick={props.handleGoBack}
      className={twMerge(
        "flex items-center justify-center w-full h-8 !text-gray-300",
        props.wrapperClassName
      )}
    >
      <FaArrowLeft /> <span className="">Back to {props.page}</span>
    </Button>
  );
};

export default BackAction;
