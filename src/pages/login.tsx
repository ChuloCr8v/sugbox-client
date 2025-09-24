import Form from "../components/LoginForm";
// import { useAppSelector } from "../redux/store";

const SignIn = () => {
  // const { loginRole } = useAppSelector((state) => state.authSlide);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <div className="w-full space-y-6 lg:space-y-4">
        {/* <div className="space-y-1">
          <p className="text-gray-200 text-xl">
            {loginRole === LoginRole.EMPLOYEE ? "Employee" : "Admin"} Login
          </p>
          <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary to-transparent"></div>
        </div> */}

        <Form />
      </div>
    </div>
  );
};

export default SignIn;
