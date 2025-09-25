import Form from "../components/LoginForm";
import { LoginRole } from "../redux/authSlide";
import { useAppSelector } from "../redux/store";

const SignIn = () => {
  const { loginRole } = useAppSelector((state) => state.authSlide);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full min-xl:space-y-12 mt-8">
        <div className="space-y-1 max-xl:hidden">
          <p className="text-gray-200 text-xl">
            {loginRole === LoginRole.EMPLOYEE ? "Employee" : "Admin"} Login
          </p>
          <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
        </div>

        <Form />
      </div>
    </div>
  );
};

export default SignIn;
