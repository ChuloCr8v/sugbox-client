import { Form, Button, message } from "antd";
import { Label } from "../components/SmallerComponents";
import { signupFormValues } from "../data";
import { useForm } from "antd/es/form/Form";
import FormItemComponent from "../components/RenderFormItem";
import { twMerge } from "tailwind-merge";
import { useAdminSignupMutation } from "../redux/api/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setAuthIndex } from "../redux/authSlide";

const Signup = () => {
  const [form] = useForm();
  const { formItem } = FormItemComponent({ form });

  const [signup, { isLoading }] = useAdminSignupMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const adminSignup = async () => {
    try {
      const values = await form.validateFields();
      await signup(values).unwrap();
      message.success("Signup Successful");
      dispatch(setAuthIndex(2));

      navigate("/login-redirect");
    } catch (error: any) {
      console.log(error);
      message.error(error.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-8">
      <Form
        className="w-full space-y-6 lg:grid grid-cols-2 lg:space-y-0 lg:gap-4"
        layout="vertical"
        form={form}
      >
        {signupFormValues.map((item) => (
          <Form.Item
            style={{
              marginBottom: 10,
            }}
            label={<Label title={item.label} />}
            className={twMerge(
              "w-full",
              ["Email", "Organization Name"].includes(item.label) &&
                "col-span-2"
            )}
            rules={[
              { required: item.required, message: `${item.label} is required` },
            ]}
            name={item.name}
          >
            {formItem(item)}
          </Form.Item>
        ))}
      </Form>
      <Button
        size="large"
        type="primary"
        onClick={adminSignup}
        className="w-full !mt-8"
        loading={isLoading}
      >
        Signup
      </Button>
    </div>
  );
};

export default Signup;
