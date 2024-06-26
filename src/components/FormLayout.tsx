import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import UseGetAuth from "../hooks/useGetAuth";
import { twMerge } from "tailwind-merge";

interface Props {
  leftSideElements: ReactNode;
  rightSideElements: ReactNode;
}

const FormLayout = (props: Props) => {
  const navigate = useNavigate();

  const { user } = UseGetAuth();

  return (
    <div
      className={twMerge(
        "h-full w-full overflow-hidden flex flex-col items-center justify-center bg-gray-50 ",
        user && "h-fit w-full"
      )}
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        {!user && (
          <div className="">
            <img
              src="/wave.png"
              alt="sugbox"
              className="fixed bottom-0 xl:-bottom-1/2 left-0 -z-0"
            />
          </div>
        )}
        {!user && (
          <div onClick={() => navigate("/")} className=" cursor-pointer z-10">
            <img
              src="/sugbox-logo.png"
              className="h-14 xl:h-16 my-4"
              alt="suggbox digital suggestion box"
            />
          </div>
        )}

        <div
          className={twMerge(
            "w-[95%] md:w-[80%] h-[80%] xl:grid grid-cols-2 bg-gray bg-gray-100 shadow-xl rounded-lg overflow-hidden relative z-10",
            user && "w-full h-auto md:w-full grid-cols-1 shadow-none"
          )}
        >
          {!user && (
            <div className="hidden xl:flex flex-col items-center justify-center h-full w-full ">
              {props.leftSideElements}
            </div>
          )}
          <div className="bg-white flex flex-col items-center justify-center h-full w-full px-4">
            {props.rightSideElements}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
