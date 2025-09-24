import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { twMerge } from "tailwind-merge";

type Props = {};

const Logo = (_props: Props) => {
  const { slideIndex } = useAppSelector((state) => state.authSlide);
  const isPortal = slideIndex === 0;

  return (
    <Link
      to="/dashboard"
      className="logo_wrapper cursor-pointer font-bold text-xl text-gray-500 w-full"
    >
      <div
        className={twMerge(
          "flex flex-col justify-center items-center gap-2",
          !isPortal && "lg:items-start"
        )}
      >
        <p
          className={twMerge(
            "text-4xl uppercase font-bold text-white text-center",
            !isPortal && "lg:text-4xl lg:text-left"
          )}
        >
          Sugg
          <span className={twMerge("text-secondary")}>Box</span>
        </p>
        <p className="text-center font-normal  lg:my-0 text-base lg:text-base text-gray-200">
          Your NO.1 digital Suggestion Box
        </p>
        <div className="h-1 lg:h-2 w-32 lg:w-48 rounded-full bg-gradient-to-r from-secondary to-primary" />
      </div>

      {/* <p className="text-xs mt-2 text-gray-300">
              Your NO.1 digital Suggestion Box
            </p> */}
    </Link>
  );
};

export default Logo;
