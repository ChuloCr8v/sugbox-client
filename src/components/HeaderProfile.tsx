import { Dropdown, Modal, Spin, message } from "antd";
import { FaChevronDown, FaCog, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from "..";
import UseGetAuth from "../hooks/useGetAuth";
import { useLogoutMutation } from "../redux/api/auth";
import { useGenerateOTPMutation } from "../redux/data/OTP";

const HeaderProfile = () => {
  const [logOut] = useLogoutMutation();
  const { user } = UseGetAuth();

  const [generateOTP, { isLoading }] = useGenerateOTPMutation();

  const navigate = useNavigate();

  const avatar = () => {
    if (user?.isAdmin && !user?.firstName) return user?.companyName.slice(0, 1);
    return user?.firstName.slice(0, 1);
    // + " " + user?.lastName.slice(0, 1)
  };

  const username = () => {
    if (user?.isAdmin && !user?.firstName) return user?.companyName;
    return user?.firstName + " " + user?.lastName;
  };

  const handleLogOut = () => {
    logOut();
    navigate("/portal");
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.location.reload();
  };

  const items = [
    // {
    //   label: "Profile",
    //   link: "/profile",
    //   icon: <AppstoreAddOutlined />,
    // },
    {
      key: 1,
      label: (
        <a href={`/settings/${user._id}`} className="">
          Settings
        </a>
      ),
      icon: <FaCog />,
    },
    {
      key: 2,
      label: (
        <button
          className=""
          onClick={async () => {
            const id = user._id;
            try {
              await generateOTP({ id, action: "reset your password" }).unwrap();
              navigate(`/verify-otp/${id}/reset-password`);
            } catch (error) {
              message.error("Error, Please try again.");
              console.log(error);
            }
          }}
        >
          Change Password
        </button>
      ),
      icon: <FaKey />,
    },
    {
      key: 3,
      label: (
        <button className="" onClick={handleLogOut}>
          Logout
        </button>
      ),
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <Dropdown menu={{ items }} className="cursor-pointer">
      <a
        onClick={(e) => e.preventDefault()}
        className="flex items-center justify-between gap-2 "
      >
        <LoadingModal loadingModalOpen={isLoading} />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primaryblue text-white flex items-center justify-center uppercase text-base font-bold ">
            {avatar()}
          </div>
          <p className="hidden md:flex text-textcolor font-semibold text-base group-hover:text-primaryblue duration-200">
            {username()}
          </p>
        </div>
        <FaChevronDown className="ml-4 text-[13px]" />
      </a>
    </Dropdown>
  );
};

export default HeaderProfile;

export const LoadingModal = (props: { loadingModalOpen: boolean }) => {
  return (
    <Modal
      closable={false}
      className="!w-[100px] flex items-center justify-center !h-fit p-0 bg-transparent !mt-[calc((100vh/2)-200px)]"
      footer={false}
      open={props.loadingModalOpen}
    >
      <Spin className="mt-3" />
    </Modal>
  );
};
