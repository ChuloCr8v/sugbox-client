import { Button } from "antd";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import Form from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

interface inputValueProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [inputValue, setInputValue] = useState<inputValueProps>({
    email: "",
    password: "",
  });

  //const navigate = useNavigate();

  const { loginRole, adminSignIn, employeeSignIn, isLoading, employeeLoading } =
    useLogin(inputValue);

  const handleInputChange = (e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const checkValues = () => {
    return inputValue.email && inputValue.password ? false : true;
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (loginRole === "employee") {
      employeeSignIn();
      return;
    }
    adminSignIn();
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gray-50">
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
            <p className="text-lg text-gray-600 mt-1 capitalize">
              Login To{" "}
              {loginRole !== "employee"
                ? " View Latest Suggestions from your employees"
                : "Leave Your Suggestions"}
            </p>
          </div>
        }
        rightSideElements={
          <div className=" flex flex-col items-center justify-center h-full w-full px-4">
            <div className="w-full max-w-[400px]">
              <FormHeading
                heading={`Login as ${
                  loginRole !== "employee" ? "Organization" : "Employee"
                }`}
              />
              <Form
                handleInputChange={handleInputChange}
                handleSubmit={handleLogin}
                disabled={checkValues() || isLoading || employeeLoading}
                isLoading={isLoading || employeeLoading}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SignIn;

export const FormHeading = (props: { heading: string }) => {
  return (
    <div className="grid gap-2 mb-6">
      <div className="h-2 w-8 bg-primaryblue rounded-full"></div>
      <p className="text-xl mb-4 text-left font-semibold text-black">
        {props.heading}
      </p>
    </div>
  );
};

export const BackToButton = (props: { url: string; page: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`${props.url}`)}
      icon={<FaArrowLeft />}
      className="mb-5 flex items-center justify-center w-full "
    >
      Back to {props.page}
    </Button>
  );
};
