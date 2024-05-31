import { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  text: ReactNode;
  onClick?: (e: { preventDefault: () => void }) => void;
  link?: boolean;
  url?: string;
  disabled?: boolean;
  type?: string;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      {props.link ? (
        <a
          onClick={props.onClick}
          href={props?.url || ""}
          className={twMerge(
            "w-[120px] flex items-center justify-center py-2 rounded-full text-white duration-300 text-normal capitalize",
            props.className
          )}
        >
          {props.text}
        </a>
      ) : (
        <button
          disabled={props.disabled}
          onClick={props.onClick}
          className={twMerge(
            "py-2 h-8 flex items-center justify-center px-4 rounded-md font-bold duration-300 text-sm capitalize",
            props.type === "primary"
              ? "bg-primaryblue hover:bg-blue-400 text-white"
              : props.type === "secondary" &&
                  "bg-gray-200 hover:bg-gray-50 hover:text-gray-500",
            props.className,
            props.disabled &&
              "bg-gray-100 text-gray-300 hover:text-gray-300 hover:bg-gray-100 bg-opacity-50"
          )}
        >
          {props.loading ? <FaSpinner className="text-white" /> : props.text}
        </button>
      )}
    </>
  );
};

export default Button;
