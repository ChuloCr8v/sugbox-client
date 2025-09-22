import { Radio } from "antd";
import { FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import { FormHeading } from "../pages/login";

const Portal = () => {
  const navigate = useNavigate();

  const { user } = UseGetAuth();

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
    <div
      className={twMerge(
        "h-full w-screen flex flex-col items-center justify-start px-4",
        user && "h-fit w-full"
      )}
    >
      <div className="h-[40vh] w-screen bg-gradient-to-b from-primary to-primary/20 flex flex-col justify-center items-center relative">
        <div className="pb-3 space-y-4 text-center w-full px-4 max-w-3xl">
          <p className="text-5xl font-semibold text-white">SuggBox</p>
          <p className="text-base text-gray-300">
            Your NO.1 digital Suggestion Box
          </p>
        </div>
      </div>

      <div className="max-w-[450px] -mt-24 bg-black/20 rounded-3xl border border-outline/40 px-6 max-w-[400px] w-full backdrop-blur py-10 space-y-6">
        <FormHeading heading="Choose your portal" />
        <div className="w-full space-y-4">
          {portalProps.map((p, index) => (
            <div
              onClick={() => handleSubmit(p.loginRole)}
              className={twMerge(
                "group bg-black/40 backdrop-blur-xl cursor-pointer h-14 px-4 relative flex items-center justify-between rounded-2xl border border-outline/40 duration-200 hover:text-primaryblue hover:border-primaryblue"
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
              <Radio
                rootClassName="border-primary"
                className="align-self-end justify-self-end "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portal;
