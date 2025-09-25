import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {};

const Logo = (_props: Props) => {
  return (
    <Link
      to="/dashboard"
      className="logo_wrapper cursor-pointer font-bold text-xl text-gray-500 w-full"
    >
      <div
        className={twMerge("flex flex-col justify-center items-center gap-2")}
      >
        <p
          className={twMerge(
            "text-4xl uppercase font-bold text-white text-center"
          )}
        >
          Sugg
          <span className={twMerge("text-secondary")}>Box</span>
        </p>
        <p className="text-center font-normal  xl:my-0 text-base xl:text-base text-gray-200">
          Your NO.1 digital Suggestion Box
        </p>
        <div className="h-1 xl:h-2 w-32 xl:w-48 rounded-full bg-gradient-to-r from-secondary to-primary" />
      </div>

      {/* <p className="text-xs mt-2 text-gray-300">
              Your NO.1 digital Suggestion Box
            </p> */}
    </Link>
  );
};

export default Logo;
