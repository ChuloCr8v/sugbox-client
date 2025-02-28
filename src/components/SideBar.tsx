import { FaRegLightbulb, FaRegUser, FaTable, FaUsers } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import { closeSideBar, openSideBar } from "../redux/sideBar";

const Sidebar = () => {
  const { isSideBarOpen } = useSelector(
    (state: { sideBar: { isSideBarOpen: boolean } }) => state.sideBar
  );
  const dispatch = useDispatch();
  const { user, id, isAdmin } = UseGetAuth();
  const path = window.location.pathname;

  const navItems = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: FaTable,
      role: "all",
    },
    {
      title: "Employees",
      link: "/employees",
      icon: FaUsers,
      role: "admin",
    },
    // {
    //   title: "Admins",
    //   link: "/admins",
    //   icon: (
    //     <UsergroupAddOutlined
    //       onPointerEnterCapture={undefined}
    //       onPointerLeaveCapture={undefined}
    //     />
    //   ),
    //   role: "admin",
    // },
    {
      title: "My Suggestions",
      link: "/my-suggestions",
      icon: FaRegLightbulb,
      role: "staff",
    },
    {
      title: "My Profile",
      link: `/my-profile/${id}`,
      icon: FaRegUser,
      role: "staff",
    },
    {
      title: "Suggestions",
      link: "/suggestions",
      icon: FaRegLightbulb,
      role: "admin",
    },
    {
      title: "Moderators",
      link: "/moderators",
      icon: FaRegUser,
      role: "admin",
    },
    // {
    //   title: "Admin Suggestions",
    //   link: "/admin-suggestions",
    //   icon: BulbOutlined ,
    // },
  ];

  const MenuItem = ({
    item,
  }: {
    item: {
      title: string;
      link: string;
      icon: IconType;
      role: string;
    };
  }) => {
    return (
      <Link
        to={item.link}
        onClick={() => dispatch(closeSideBar())}
        className={twMerge(
          "w-full flex items-center gap-2 lg:gap-5 pr-6 px-4 py-3 border-l-2 border-transparent border-solid hover:border-primaryblue hover:text-primaryblue duration-200",
          path.toLowerCase().includes(`${item.link}`) &&
            "text-primaryblue border-primaryblue",
          path === "/" &&
            item.title === "Dashboard" &&
            "text-primaryblue border-primaryblue"
        )}
      >
        <span className="">
          <item.icon className="text-xl" />
        </span>
        <span
          className={twMerge(
            "opacity-0 transition-all duration-1000 leading-none",
            isSideBarOpen && "opacity-100"
          )}
        >
          {item.title}
        </span>
      </Link>
    );
  };

  const adminMenu = navItems.filter((item) => item.role === "admin");
  const staffMenu = navItems.filter((item) => item.role === "staff");
  const allMenu = navItems.filter((item) => item.role === "all");

  return (
    <div className="">
      <div
        onClick={() => dispatch(closeSideBar())}
        className={twMerge(
          "fixed z-20 top-0 left-0 min-h-screen w-0 bg-black opacity-30 lg:hidden duration-200",
          isSideBarOpen && "w-screen"
        )}
      ></div>
      <div
        onMouseEnter={() => dispatch(openSideBar())}
        onMouseLeave={() => dispatch(closeSideBar())}
        className={twMerge(
          "bg-white min-h-screen fixed top-0 left-0 w-0 lg:w-16 pt-24 border-r overflow-hidden z-50 duration-200",
          !user && "hidden",
          isSideBarOpen && "w-[180px] lg:w-[180px]"
        )}
      >
        {allMenu.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
        {isAdmin &&
          adminMenu.map((item, index) => <MenuItem item={item} key={index} />)}
        {!isAdmin &&
          staffMenu.map((item, index) => <MenuItem item={item} key={index} />)}
      </div>
    </div>
  );
};

export default Sidebar;
