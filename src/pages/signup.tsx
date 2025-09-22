import { BackToButton } from "../pages/login";
import AuthLayout from "../components/AuthLayout";
import FormLayout from "../components/FormLayout";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <AuthLayout heading={`Organization Registeration`}>
      <FormLayout
        leftSideElements={
          <div className="flex flex-col items-center justify-center ">
            <img
              src={"/box.png"}
              height={300}
              width={300}
              alt={"sugbox"}
              className=""
            />
            <h2 className="font-bold text-2xl text-black mt-6">Welcome Back</h2>
            <p className="text-base text-gray-600 mt-1 capitalize">
              Login To Leave Your Suggestions
            </p>
          </div>
        }
        rightSideElements={
          <div className="flex flex-col items-center justify-center">
            <div className=" max-w-[400px] xl:place-self-start  w-full space-y-6">
              <SignupForm />
              <BackToButton url={"portal"} page={"Portal"} />
            </div>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default Signup;
