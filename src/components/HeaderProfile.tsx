import { Dropdown, Modal, Spin, message } from "antd";
import { FaChevronDown, FaCog, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from "..";
import UseGetAuth from "../hooks/useGetAuth";
import { useLogoutMutation } from "../redux/api/auth";
import { useGenerateOTPMutation } from "../redux/data/OTP";
import { useGetOrganizationQuery } from "../redux/data/organizations";
import { useGetEmployeeQuery } from "../redux/data/employees";

const HeaderProfile = () => {
  const [logOut] = useLogoutMutation();
  const { user, id, isAdmin } = UseGetAuth();
  const { data: organization } = useGetOrganizationQuery(id);
  const { data: employee } = useGetEmployeeQuery(id);

  const [generateOTP, { isLoading }] = useGenerateOTPMutation();

  const navigate = useNavigate();

  const avatar = () => {
    if (isAdmin) {
      return organization.profilePicture ? (
        <img
          src={organization?.profilePicture}
          alt={organization?.companyName}
          className="h-full w-full object-cover"
        />
      ) : (
        organization?.companyName.slice(0, 1)
      );
    } else {
      return employee?.profilePicture ? (
        <img
          src={employee?.profilePicture}
          alt={employee?.firstName}
          className="h-full w-full object-cover"
        />
      ) : (
        employee?.firstName.slice(0, 1)
      );
    }
  };

  const username = () => {
    if (isAdmin) return organization?.companyName;
    return employee?.firstName + " " + employee?.lastName;
  };

  const handleLogOut = () => {
    logOut();
    navigate("/portal");
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.location.reload();
  };

  const items = [
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
          <div className="h-8 w-8 rounded-full bg-primaryblue text-white flex items-center justify-center uppercase text-base font-bold overflow-hidden">
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
