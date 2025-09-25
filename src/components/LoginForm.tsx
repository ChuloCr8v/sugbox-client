import { Button, Checkbox, Form, message } from "antd";
import { loginFormValues } from "../data";
import FormItemComponent from "./RenderFormItem";
import { Label } from "./SmallerComponents";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import {
  useAdminLoginMutation,
  useEmployeeLoginMutation,
} from "../redux/api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/data/auth";
import { setAuthIndex } from "../redux/authSlide";
import { useAppSelector } from "../redux/store";

const LoginForm = () => {
  const [form] = useForm();
  const { formItem } = FormItemComponent({ form });
  const { loginRole } = useAppSelector((state) => state.authSlide);

  const [adminLogin, { isLoading: adminLoggingIn }] = useAdminLoginMutation();
  const [employeeLogin, { isLoading: employeeLoggingIn }] =
    useEmployeeLoginMutation();

  const isLoading = adminLoggingIn || employeeLoggingIn;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      let data;
      if (loginRole === "ADMIN") {
        data = await adminLogin(values).unwrap();
      } else {
        data = await employeeLogin(values).unwrap();
      }

      dispatch(setCredentials(data));
      message.success("Login Successful");
      navigate("/dashboard");
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      message.error("Error" + " " + error.data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Form
        className="w-full space-y-6 lg:space-y-0"
        form={form}
        layout="vertical"
      >
        {loginFormValues.map((item) => (
          <Form.Item
            name={item.name}
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

        <div className="w-full flex justify-between items-center">
          <Checkbox
            onChange={() => {}}
            className="hover:text-primaryblue duration-200 text-base text-gray-300 !text-sm"
          >
            Remember Me
          </Checkbox>
          <Button
            type="link"
            onClick={() => dispatch(setAuthIndex(3))}
            className="hover:text-gray-300 duration-200 cursor-pointer !text-gray-300 !text-sm px-0"
          >
            Forgot Password?
          </Button>
        </div>
        <Button
          size="large"
          type="primary"
          onClick={handleSubmit}
          className="w-full !mt-8 text-sm"
          loading={isLoading}
        >
          Login
        </Button>
      </Form>

      <div className="place-self-center !mt-4">
        <span className="text-center text-gray-300 text-sm">
          Don't have an account? Sign up{" "}
          <Button
            onClick={() => dispatch(setAuthIndex(1))}
            type="link"
            size="large"
            className="underline px-0.5 font-bold text-primaryblue hover:bg-hoverblue duration-200"
          >
            here
          </Button>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
