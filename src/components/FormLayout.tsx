import { Button } from "antd";
import { ReactNode } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";

interface Props {
  leftSideElements: ReactNode;
  rightSideElements: ReactNode;
}

const FormLayout = (props: Props) => {
  const navigate = useNavigate();

  const { user } = UseGetAuth();

  const currentPage = window.location;

  return (
    <div
      className={twMerge(
        "h-full w-screen flex flex-col items-center justify-start",
        user && "h-fit w-full"
      )}
    >
      <div className="h-[40vh] w-screen bg-gradient-to-t from-primary to-primary/20 flex flex-col justify-center items-center relative">
        {currentPage.pathname !== "/portal" && (
          <Button
            type="link"
            onClick={() => navigate("/portal")}
            className="flex items-center gap-2 p-0 mb-10 text-black absolute left-10 top-10"
          >
            <FaArrowLeft />
            Back
          </Button>
        )}
        <img src="/" alt="" />
      </div>

      <div className="max-w-[450px] -mt-24 bg-black/20 rounded-xl border px-6 py-6 max-w-[400px] w-full backdrop-blur">
        <div className="border-b border-outline pb-3 space-y-2">
          <p className="text-3xl font-semibold text-white">SuggBox</p>
          <p className="text-base text-gray-300">
            Your NO.1 digital Suggestion Box
          </p>
        </div>

        {props.rightSideElements}
      </div>
    </div>
  );
};

export default FormLayout;
