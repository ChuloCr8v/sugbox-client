import { useState } from "react";
import Form from "../components/SignupForm";
import { signupFormValues } from "../data";
import useSignup from "../hooks/useSignup";
import FormLayout from "../components/FormLayout";
import { FormHeading } from "./login";
import { Button } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface inputValueProps {
  companyEmail: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

const inputValues = {
  companyEmail: "",
  companyName: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [signupData, setSignupData] = useState<inputValueProps>(inputValues);
  const { adminSignup, isLoading } = useSignup();

  const navigate = useNavigate();

  const handleInputChange = (e: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => {
    e.preventDefault();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    adminSignup(signupData);
  };

  const checkValues = () => {
    return signupData.companyEmail &&
      signupData.companyName &&
      signupData.password &&
      signupData.confirmPassword === signupData.password
      ? false
      : true;
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen signup">
      <FormLayout
        leftSideElements={
          <div className="flex flex-col items-center justify-center">
            <img
              src={"/logo-icon.png"}
              height={300}
              width={300}
              alt={"sugbox"}
              className=""
            />
            <h2 className="font-bold text-2xl text-black mt-6">
              Welcome To Suggbox
            </h2>
            <p className="text-lg text-gray-600 mt-1">
              Register your organization to Start Getting Suggestions
            </p>
          </div>
        }
        rightSideElements={
          <div className="flex flex-col items-center justify-center w-full">
            <div className="max-w-[500px] w-full">
              <div className="w-full flex flex-col items-start mb-8 -mt-10 max-w-[400px]">
                <Button
                  icon={<FaArrowLeft />}
                  onClick={() => navigate("/portal")}
                  className="place-self-start flex items-center"
                >
                  Back to Login
                </Button>
              </div>
              <FormHeading heading="Register Your Organization" />
            </div>
            <Form
              handleInputChange={handleInputChange}
              formValues={signupFormValues}
              handleSubmit={handleSubmit}
              disabled={checkValues() || isLoading}
              isLoading={isLoading}
            />
          </div>
        }
      />
    </div>
  );
};

export default Signup;
