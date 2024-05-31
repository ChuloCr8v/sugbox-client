import { FaArrowRight, FaCheck } from "react-icons/fa";

const LoginPageRedirect = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 text-center">
      <FaCheck className="bg-green-300 text-white h-28 w-28 rounded-full p-6 -mt-32" />
      <p className="text-gray-600">
        A verification link has been sent to your email.
        <span className="block">
          Follow the instructions to verify your account and start adding
          employees.
        </span>
      </p>
      <a
        href="/login/admin"
        className="text-primaryblue font-semibold flex items-center gap-1 hover:text-hoverblue duration-200"
      >
        Go to Login page <FaArrowRight className="text-sm" />
      </a>
    </div>
  );
};

export default LoginPageRedirect;
