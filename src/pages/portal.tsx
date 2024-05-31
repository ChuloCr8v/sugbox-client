import { Radio } from "antd";
import { useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Portal = () => {
  const [isChecked, setIsChecked] = useState(0);

  const navigate = useNavigate();

  const portalProps = [
    {
      id: 1,
      label: "Admin ",
      loginRole: "admin",
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
    navigate(`/login/${loginRole}`);
  };

  return (
    <div className="portal fixed left-0 top-0 h-screen w-screen bg-blue-50 min-h-screen flex flex-col  items-center px-4">
      <div className="relative h-full flex flex-col items-center">
        <div className="bg-blue-600 h-1/2 pt-12 text-white w-screen flex flex-col justify-center items-center gap-4">
          <h2 className="font-semibold text-center text-5xl">SuggBox </h2>
          <span className="block text-base italic">
            Your No.1 Digital Suggestion Box
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 -mt-12 w-fit">
          {portalProps.map((p, index) => (
            <div
              onClick={() => handleSignInRole(p.id, p.loginRole)}
              className={twMerge(
                "card bg-blue-50 cursor-pointer px-4 relative flex flex-col items-center justify-center h-[200px] lg:h-[300px] xl:h-[300px] w-[170px] lg:w-[350px] xl:w-[200px]  rounded-lg border-2 border-gray-200 duration-200",
                isChecked === p.id && "border-primaryblue"
              )}
              key={index}
            >
              <Radio
                checked={isChecked === p.id}
                className="align-self-end justify-self-end absolute top-4 right-4"
              />
              <div
                className={twMerge(
                  "bg-gray-200 rounded-full p-2 text-2xl lg:text-5xl xl:text-2xl text-gray-500 duration-200",
                  p.id === isChecked && "text-primaryblue  duration-200"
                )}
              >
                {p.icon}
              </div>
              <p
                className={twMerge(
                  "text-black font-semibold mt-2 duration-200 lg:text-2xl xl:text-base",
                  p.id === isChecked && "text-primaryblue"
                )}
              >
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portal;
