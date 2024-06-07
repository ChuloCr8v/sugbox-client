import { FaBars, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import HeaderProfile from "./HeaderProfile";
import { closeSideBar, openSideBar } from "../redux/sideBar";

const Header = () => {
  const { isSideBarOpen } = useSelector(
    (state: { sideBar: { isSideBarOpen: boolean } }) => state.sideBar
  );
  const dispatch = useDispatch();

  const handleSideBar = () => {
    dispatch(isSideBarOpen ? closeSideBar() : openSideBar());
  };
  const { user } = UseGetAuth();

  return (
    <div
      className={twMerge(
        "flex justify-center items-center w-screen border-b fixed top-0 left-0 bg-white z-[999]",
        !user ? "hidden" : "flex"
      )}
    >
      <div className="wrapper flex justify-between items-center w-full py-4 px-4">
        <FaBars
          onClick={handleSideBar}
          className={twMerge(
            "cursor-pointer hover:text-primaryblue duration-200 lg:hidden",
            isSideBarOpen && "text-primaryblue",
            !user && "hidden"
          )}
        />
        <div className="flex flex-col items-center">
          <a
            href="/dashboard"
            className="logo_wrapper cursor-pointer font-bold text-xl text-gray-500 "
          >
            <span className="text-primaryblue">SUG</span>box
          </a>
          {/* <span className="text-[12px] text-gray-600 text-center leading-none">
            Your Ideas, <br />
            Anonymous or Not.
          </span> */}
        </div>
        {user ? (
          <HeaderProfile />
        ) : (
          <a
            className="hover:text-white text-sm font-semibold flex items-center gap-5 group relative duration-300"
            href={"/portal"}
            onClick={(e) => e.stopPropagation()}
          >
            <FaSignInAlt className="text-white group-hover:text-primaryblue duration-300" />
            Sign In
            <div className="absolute h-6 w-10 bg-primaryblue -z-10 -left-3 rounded duration-300 group-hover:translate-x-10 group-hover:w-14"></div>
          </a>
        )}{" "}
      </div>
    </div>
  );
};

export default Header;
