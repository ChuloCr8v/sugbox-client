import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import Form from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";
import { ReactNode } from "react";

const SignIn = () => {
  return (
    <AuthLayout heading={`Employee Login`}>
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
              <Form />
              <BackToButton url={"portal"} page={"Portal"} />
            </div>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default SignIn;

export const FormHeading = (props: {
  subheading?: ReactNode;
  heading: string;
}) => {
  return (
    <div className="grid gap-2">
      <p className="text-xl text-left font-semibold text-white">
        {props.heading}
      </p>
      {props.subheading && (
        <p className="text-sm text-left text-gray-300">{props.subheading}</p>
      )}
      <div className="h-2 w-8 bg-primaryblue rounded-full"></div>
    </div>
  );
};

export const BackToButton = (props: { url: string; page: string }) => {
  return (
    <Link
      to={`${props.url}`}
      className="!mt-20 flex items-center justify-center w-full h-8 text-gray-200 gap-3"
    >
      <FaArrowLeft /> <span className="">Back to {props.page}</span>
    </Link>
  );
};
