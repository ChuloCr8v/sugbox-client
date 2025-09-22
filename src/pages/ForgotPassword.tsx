import { Button, Form, message } from "antd";
import { useState } from "react";
import FormLayout from "../components/FormLayout";
import { useGenerateResetPasswordLinkMutation } from "../redux/api/auth";
import { BackToButton } from "./login";
import AuthLayout from "../components/AuthLayout";
import FormItemComponent from "../components/RenderFormItem";
import { useForm } from "antd/es/form/Form";
import { Label } from "../components/SmallerComponents";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [form] = useForm();

  const { formItem } = FormItemComponent({ form });

  const [generateResetPassword, { isLoading: generatingLink }] =
    useGenerateResetPasswordLinkMutation();

  const handleResetPassword = async () => {
    const email = await form.validateFields();

    console.log(email);

    setErrorMessage("");
    setSuccessMessage("");

    try {
      await generateResetPassword({ email }).unwrap();
      message.success("Reset password link has been sent to your mail");
      setSuccessMessage(
        "Reset password link has been sent to your mail. Check your inbox and SPAM as well."
      );
      navigate("/portal");
    } catch (error: any) {
      setErrorMessage(error.data);
      message.error(error.data);
    }
  };

  return (
    <AuthLayout
      heading="Forgot Password"
      subheading="Enter your email for a link to reset your password"
    >
      <FormLayout
        leftSideElements={
          <div className="bg-gray-100 items-center justify-center">
            <img
              src="/forgot-password.svg"
              alt="forgot password"
              className="max-w-[500px] w-full"
            />
          </div>
        }
        rightSideElements={
          <div className="space-y-4 flex flex-col justify-center items-center w-full">
            <div className="text-center space-y-1 flex flex-col items-center">
              {successMessage && (
                <p className="font-semibold text-green-600 text-center">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="font-semibold text-red-600 text-center">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="grid gap-2 max-w-[400px] w-full rounded-lg">
              <Form className="w-full" form={form}>
                <Form.Item
                  style={{
                    marginBottom: 10,
                  }}
                  label={<Label title={"Email Address"} isRequired />}
                  className="w-full"
                  rules={[
                    { required: true, message: `Please enter a valid email` },
                  ]}
                >
                  {formItem({
                    label: "Email",
                    type: "email",
                    placeholder: "Enter organization email address",
                    name: "email",
                    required: true,
                  })}
                </Form.Item>
                <Button
                  type="primary"
                  loading={generatingLink}
                  size="large"
                  onClick={handleResetPassword}
                  className="w-full mt-3"
                >
                  Submit
                </Button>
              </Form>

              <BackToButton url="/portal" page={"Login"} />
            </div>
          </div>
        }
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
