import { signupFormValues } from "../data";
import FormLayout from "../components/FormLayout";
import { FormHeading } from "./login";
import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { twMerge } from "tailwind-merge";
import FormItemWrapper from "../components/FormItemWrapper";
import { useAdminSignupMutation } from "../redux/api/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form] = useForm();
  const [signup, { isLoading }] = useAdminSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await signup(values).unwrap();
      message.success("Signup Successful");
      navigate("/login-redirect");
    } catch (error: any) {
      console.log(error);
      message.error(error.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen signup">
      <FormLayout
        leftSideElements={
          <div className="flex flex-col items-center justify-center">
            <img
              src={"/logo-icon.png"}
              alt={"sugbox"}
              className="lg:max-w-[200px] max-w-[300px] w-full"
            />
            <h2 className="font-bold text-2xl text-black mt-6 text-center">
              Welcome To Suggbox
            </h2>
            <p className="text-lg text-gray-600 mt-1 text-center">
              Register your organization to Start Getting Suggestions
            </p>
          </div>
        }
        rightSideElements={
          <div className="flex flex-col items-center justify-center w-full p-6">
            <div className="max-w-[500px] w-full">
              <FormHeading heading="Register Your Organization" />
            </div>
            <Form
              form={form}
              className="flex flex-col lg:grid grid-cols-2 gap-x-3 items-start w-full"
            >
              {signupFormValues.map(
                (
                  v: {
                    required: boolean;
                    label: string;
                    type: string;
                    placeholder: string;
                    name: string;
                  },
                  index: React.Key
                ) => (
                  <FormItemWrapper
                    key={index}
                    label={v.label}
                    inputType={v.type}
                    placeholder={v.placeholder}
                    name={v.name}
                    required={v.required}
                  />
                )
              )}
            </Form>
            <Button
              className={twMerge(
                "w-full flex items-center justify-center border-none bg-primaryblue hover:bg-hoverblue font-bold text-white uppercase py-3"
              )}
              size="large"
              onClick={handleSubmit}
              loading={isLoading}
            >
              Signup
            </Button>

            <div className="place-self-center mt-8">
              <span className="text-center text-black">
                Already have an account? Login{" "}
                <Link
                  to="/login"
                  className="underline font-bold text-primaryblue hover:text-hoverblue duration-200"
                >
                  here
                </Link>
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Signup;
