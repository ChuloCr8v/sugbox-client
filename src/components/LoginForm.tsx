import { Button, Checkbox, Form, message } from "antd";
import { twMerge } from "tailwind-merge";
import { loginFormValues } from "../data";
import { Link } from "react-router-dom";
import FormItemWrapper from "./FormItemWrapper";
import { useForm } from "antd/es/form/Form";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const [form] = useForm();

  const { loginRole, adminSignIn, employeeSignIn, isLoading, employeeLoading } =
    useLogin();

  const handleLogin = async () => {
    const values = await form.validateFields();
    try {
      if (loginRole === "employee") {
        employeeSignIn(values);
        return;
      }
      adminSignIn(values);
    } catch (error: any) {
      message.error(error.data.message);
      console.log(error);
    }
  };

  return (
    <Form form={form} className="flex flex-col items-start w-full">
      {loginFormValues.map((v, index) => (
        <FormItemWrapper
          label={v.label}
          inputType={v.type}
          placeholder={v.placeholder}
          name={v.name}
          key={index}
          required={v.required}
        />
      ))}

      <div className="w-full flex justify-between items-center">
        <Checkbox
          onChange={() => {}}
          className="hover:text-primaryblue duration-200 text-base text-black"
        >
          Remember Me
        </Checkbox>
        <a
          href="/forgot-password"
          className="hover:text-primaryblue duration-200 cursor-pointer text-black"
        >
          Forgot Password?
        </a>
      </div>
      <div className="grid gap-2 w-full">
        <Button
          size="large"
          className={twMerge(
            "w-full hover:bg-hoverblue bg-primaryblue font-bold text-white capitalize h-12 mt-6"
          )}
          onClick={handleLogin}
          loading={isLoading || employeeLoading}
        >
          Login
        </Button>
        {/* <BackToButton url={"/portal"} page="Portal" /> */}
      </div>
      <div className="place-self-center mt-6">
        <span className="text-center text-gray-500">
          Don't have an account? Sign up{" "}
          <Link
            to="/signup"
            className="underline font-bold text-primaryblue hover:bg-hoverblue duration-200"
          >
            here
          </Link>
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
