import { FaArrowRight, FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import AuthLayout from "../components/AuthLayout";

const Portal = () => {
  const navigate = useNavigate();

  const portalProps = [
    {
      id: 1,
      label: "Organization",
      loginRole: "organization",
      icon: <FaUser />,
    },
    {
      id: 2,
      label: "Employee",
      loginRole: "employee",
      icon: <FaUsers />,
    },
  ];

  const handleSubmit = (loginRole: string) => {
    navigate(`/login/${loginRole}`);
  };

  return (
    <AuthLayout heading="Choose your portal">
      <div className="w-full space-y-4 pt-10">
        {portalProps.map((p, index) => (
          <div
            onClick={() => handleSubmit(p.loginRole)}
            className={twMerge(
              "group md:bg-black/40 md:backdrop-blur-xl cursor-pointer h-14 px-4 relative flex items-center justify-between rounded-xl border border-outline/40 duration-200 hover:text-primaryblue hover:border-primaryblue"
            )}
            key={index}
          >
            <p
              className={twMerge(
                "text-white duration-200 lg:text-2xl xl:text-base group-hover:text-primaryblue"
              )}
            >
              {p.label}
            </p>
            <FaArrowRight color="white" />
          </div>
        ))}
      </div>
    </AuthLayout>
  );
};

export default Portal;
