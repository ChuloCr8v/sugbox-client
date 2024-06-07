import React from "react";
import { FaRegLightbulb, FaRegUser, FaTable, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import { closeSideBar } from "../redux/sideBar";

const Sidebar = () => {
  const { isSideBarOpen } = useSelector(
    (state: { sideBar: { isSideBarOpen: boolean } }) => state.sideBar
  );
  const dispatch = useDispatch();
  const { user, id } = UseGetAuth();
  const path = window.location.pathname;

  const navItems = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <FaTable />,
      role: "all",
    },
    {
      title: "Employees",
      link: "/employees",
      icon: <FaUsers />,
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
      icon: <FaRegLightbulb />,
      role: "staff",
    },
    {
      title: "My Profile",
      link: `/my-profile/${id}`,
      icon: <FaRegUser />,
      role: "staff",
    },
    {
      title: "Suggestions",
      link: "/suggestions",
      icon: <FaRegLightbulb />,
      role: "admin",
    },
    // {
    //   title: "Admin Suggestions",
    //   link: "/admin-suggestions",
    //   icon: <BulbOutlined />,
    // },
  ];

  const MenuItem = ({
    item,
  }: {
    item: {
      title: string;
      link: string;
      icon: React.JSX.Element;
      role: string;
    };
  }) => {
    return (
      <a
        href={item.link}
        onClick={() => dispatch(closeSideBar())}
        className={twMerge(
          "w-full flex items-center gap-2  pr-6 px-4 lg:px-10 py-2 border-l-4 hover:border-l-4 border-transparent border-solid hover:border-primaryblue hover:text-primaryblue duration-200",
          path.toLowerCase().includes(`${item.link}`) &&
            "text-primaryblue border-primaryblue",
          path === "/" &&
            item.title === "Dashboard" &&
            "text-primaryblue border-primaryblue"
        )}
      >
        {item.icon}
        <span>{item.title}</span>
      </a>
    );
  };

  const adminMenu = navItems.filter((item) => item.role === "admin");
  const staffMenu = navItems.filter((item) => item.role === "staff");
  const allMenu = navItems.filter((item) => item.role === "all");
  console.log(user);
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
        className={twMerge(
          "bg-white min-h-screen fixed lg:relative top-0 left-0 w-0 lg:w-[250px] pt-24 border-r overflow-hidden z-30 duration-200",
          !user && "hidden",
          isSideBarOpen && "w-[calc(100vw-20%)] "
        )}
      >
        {allMenu.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
        {user?.isAdmin &&
          adminMenu.map((item, index) => <MenuItem item={item} key={index} />)}
        {(user?.adminRole.toLowerCase() === "staff" ||
          user?.adminRole.toLowerCase() === "moderator") &&
          staffMenu.map((item, index) => <MenuItem item={item} key={index} />)}
      </div>
    </div>
  );
};

export default Sidebar;
