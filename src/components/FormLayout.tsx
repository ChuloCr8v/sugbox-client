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
        "h-full w-screen flex flex-col items-center justify-center bg-gray-50 ",
        user && "h-fit w-full"
      )}
    >
      <div className="w-full md:h-full flex flex-col justify-center items-center gap-12 md:gap-0 -mt-12">
        {!user && (
          <div className="">
            <img
              src="/wave.png"
              alt="sugbox"
              className="fixed -bottom-32 md:-bottom-60 lg:-bottom-80 xl:-bottom-1/2 left-0 -z-0"
            />
          </div>
        )}
        {!user && (
          <div
            onClick={() => navigate("/")}
            className="xl:hidden cursor-pointer z-10 "
          >
            <img
              src="/sugbox-logo.png"
              className="h-12 xl:h-16 "
              alt="suggbox digital suggestion box"
            />
          </div>
        )}

        <div
          className={twMerge(
            "xl:bg-gray-50 w-full flex items-center justify-center md:w-[80%] xl:h-[85%] h-fit px-4 xl:px-0 md:py-24 xl:py-0 xl:my-4 xl:grid grid-cols-2 xl:shadow-xl rounded-lg xl:overflow-hidden relative z-10 xl:mt-12",
            user &&
              "w-full h-auto md:w-full grid-cols-1 shadow-none xl:shadow-none xl:overflow-visible"
          )}
        >
          {!user && (
            <div className="xl:bg-gray-100 h-full w-full hidden xl:flex flex-col items-center justify-center">
              {props.leftSideElements}
            </div>
          )}
          <div className="max-w-[500px] place-self-center bg-gray-50 xl:bg-transparent w-full xl:h-full rounded-xl pb-12 flex flex-col items-center justify-center xl:pb-8">
            {props.rightSideElements}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
