import { Button, Radio } from "antd";
import { useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import FormLayout from "../components/FormLayout";
import { FormHeading } from "./login";

const Portal = () => {
  const [isChecked, setIsChecked] = useState(0);
  const [loginRole, setLoginRole] = useState("");

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

  const handleSignInRole = (id: number, loginRole: string) => {
    setIsChecked(id);
    setLoginRole(loginRole);
  };

  const handleSubmit = () => {
    navigate(`/login/${loginRole}`);
  };

  return (
    <div className="portal fixed left-0 top-0 h-screen w-screen bg-blue-50 min-h-screen flex flex-col  items-center px-4">
      <FormLayout
        leftSideElements={
          <img src="/portal.svg" className="max-h-[400px] w-full" />
        }
        rightSideElements={
          <div className="grid grid-cols-1 gap-4 w-full max-w-[400px]">
            <FormHeading heading="Choose your portal" />
            {portalProps.map((p, index) => (
              <div
                onClick={() => handleSignInRole(p.id, p.loginRole)}
                className={twMerge(
                  "group bg-white cursor-pointer h-12 px-4 relative flex items-center justify-between rounded-lg border border-gray-200 duration-200 hover:text-primaryblue hover:border-primaryblue",
                  isChecked === p.id && "border-primaryblue"
                )}
                key={index}
              >
                <p
                  className={twMerge(
                    "text-black font-semibold duration-200 lg:text-2xl xl:text-base group-hover:text-primaryblue",
                    p.id === isChecked && "text-primaryblue"
                  )}
                >
                  {p.label}
                </p>
                <Radio
                  checked={isChecked === p.id}
                  className="align-self-end justify-self-end"
                />
              </div>
            ))}
            {loginRole && (
              <Button
                onClick={handleSubmit}
                className="h-10 capitalize border-none bg-primaryblue hover:!bg-hoverblue hover:!text-white text-white font-semibold mt-2"
              >
                Login as an {loginRole}
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Portal;
