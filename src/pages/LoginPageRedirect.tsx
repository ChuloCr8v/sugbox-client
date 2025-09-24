import { FaArrowRight, FaCheck } from "react-icons/fa";
import { useAppDispatch } from "../redux/store";
import { Button } from "antd";
import { setSlideIndex } from "../redux/authSlide";

const LoginPageRedirect = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 text-center px-4">
      <FaCheck className="bg-green-300 text-white h-28 w-28 rounded-full p-6 -mt-32" />
      <p className="text-gray-300 text-sm">
        A verification link has been sent to your email.
        <span className="block">
          Follow the instructions to verify your account and start adding
          employees.
        </span>
      </p>
      <Button
        onClick={() => dispatch(setSlideIndex(0))}
        type="link"
        href="/login/admin"
        className="text-primaryblue font-semibold flex items-center gap-1 hover:text-hoverblue duration-200 mt-4"
      >
        Go to Login page <FaArrowRight className="text-sm" />
      </Button>
    </div>
  );
};

export default LoginPageRedirect;
