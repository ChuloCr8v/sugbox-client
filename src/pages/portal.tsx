import { FaArrowRight, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import {
  LoginRole,
  setAuthIndex,
  setLoginRole,
  setSlideIndex,
} from "../redux/authSlide";
import { Button } from "antd";

const Portal = () => {
  const dispatch = useDispatch();

  const portalProps = [
    {
      id: 1,
      label: "Login as an Organization",
      loginRole: LoginRole.ADMIN,
      icon: <FaUser />,
    },
    {
      id: 2,
      label: "Login as an Employee",
      loginRole: LoginRole.EMPLOYEE,
      icon: <FaUsers />,
    },
  ];

  const handleSubmit = (loginRole: string) => {
    dispatch(setSlideIndex(1));
    dispatch(setLoginRole(loginRole));
  };

  return (
    <div className="w-full space-y-4 pt-10">
      {/* <p className="text-gray-300 text-2xl !mb-2">Choose your Portal</p> */}
      {portalProps.map((p, index) => (
        <Button
          type="text"
          onClick={() => handleSubmit(p.loginRole)}
          className={twMerge(
            "overflow-hidden w-full group bg-transparent cursor-pointer h-12 px-8 relative flex items-center justify-between rounded-full border border-outline/40 duration-200 hover:text-secondary hover:border-secondary"
          )}
          key={index}
        >
          <p
            className={twMerge(
              "text-white duration-200 text-sm group-hover:text-secondary relative z-50"
            )}
          >
            {p.label}
          </p>
          <FaArrowRight className="text-gray-300 group-hover:text-secondary" />
          <div className="absolute left-0 w-0 h-full rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:w-full duration-200"></div>
        </Button>
      ))}

      <p className="text-center text-gray-300 !mt-10 text-sm">
        Don't have an account?{" "}
        <Button
          size="large"
          type="link"
          className="text-primary block place-self-center text-sm flex items-center gap-2"
          iconPosition="end"
          onClick={() => {
            dispatch(setSlideIndex(2));
            dispatch(setAuthIndex(1));
          }}
        >
          <FaArrowRight />
          <span>Get Started</span>
        </Button>
      </p>
    </div>
  );
};

export default Portal;
