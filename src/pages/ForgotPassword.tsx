import { Button, Input, message } from "antd";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import FormLayout from "../components/FormLayout";
import { useGenerateResetPasswordLinkMutation } from "../redux/api/auth";
import { BackToButton } from "./login";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //  const navigate = useNavigate();

  const [generateResetPassword, { isLoading: generatingLink }] =
    useGenerateResetPasswordLinkMutation();

  const handleResetPassword = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await generateResetPassword({ email }).unwrap();
      message.success("Reset password link has been sent to your mail");
      setSuccessMessage(
        "Reset password link has been sent to your mail. Check your inbox and SPAM as well."
      );
    } catch (error: any) {
      setErrorMessage(error.data);
      message.error(error.data);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
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
              <p className="text-2xl md:text-3xl font-semibold">
                Forgot Password
              </p>
              <p className="text-gray-600">
                Enter your email for a link to reset your password.
              </p>
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

            <div className="grid gap-2 max-w-[400px] w-full  p-4 rounded-lg ">
              <label className="font-semibold text-base text-left">
                Email Address
              </label>
              <div className="flex flex-col items-center gap-4">
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  prefix={
                    <FaEnvelope className="bg-gray-200 p-2 text-gray-500 h-full w-full" />
                  }
                  type="email"
                  className="p-0 border hover:border-primaryblue h-9 rounded w-full overflow-hidden"
                />

                <div className="grid gap-2 w-full">
                  {" "}
                  <Button
                    loading={generatingLink}
                    onClick={handleResetPassword}
                    disabled={email === "" || generatingLink}
                    className="h-9 w-full bg-primaryblue border-none text-white hover:!bg-hoverblue hover:!text-white font-semibold shadow-none"
                  >
                    Submit
                  </Button>
                  <BackToButton url="/portal" page={"Login"} />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ForgotPassword;
