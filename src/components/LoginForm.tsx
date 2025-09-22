import { Button, Checkbox, Form } from "antd";
import { loginFormValues } from "../data";
import FormItemComponent from "./RenderFormItem";
import { Label } from "./SmallerComponents";
import { Link, useParams } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useForm } from "antd/es/form/Form";

const LoginForm = () => {
  const [form] = useForm();
  const { formItem } = FormItemComponent({ form });

  const { login } = useLogin();

  const { loginRole } = useParams();

  console.log(loginRole);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      login(values);
    } catch (error) {}
  };

  return (
    <>
      <Form className="w-full" form={form}>
        {loginFormValues.map((item) => (
          <Form.Item
            style={{
              marginBottom: 10,
            }}
            label={<Label title={item.label} />}
            className="w-full"
            rules={[{ required: true, message: `${item.label} is required` }]}
          >
            {formItem(item)}
          </Form.Item>
        ))}
      </Form>

      <div className="w-full flex justify-between items-center">
        <Checkbox
          onChange={() => {}}
          className="hover:text-primaryblue duration-200 text-base text-gray-300"
        >
          Remember Me
        </Checkbox>
        <Link
          to="/forgot-password"
          className="hover:text-gray-300 duration-200 cursor-pointer text-gray-100"
        >
          Forgot Password?
        </Link>
      </div>
      <Button
        size="large"
        type="primary"
        onClick={handleSubmit}
        className="w-full !mt-8"
      >
        Login
      </Button>
      <div className="place-self-center !mt-8">
        <span className="text-center text-gray-300">
          Don't have an account? Sign up{" "}
          <Link
            to="/signup"
            className="underline font-bold text-primaryblue hover:bg-hoverblue duration-200"
          >
            here
          </Link>
        </span>
      </div>
    </>
  );
};

export default LoginForm;
