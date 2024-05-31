import { Button, Input, message } from "antd";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useGenerateResetPasswordLinkMutation } from "../redux/api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      console.log(error);
      if (error.status === 404) {
        setErrorMessage(
          "Employee account does not exist, please review your email."
        );
      } else {
        setErrorMessage(
          "Failed. Make sure you are connected to the internet and try again."
        );
      }
      message.error("Failed, try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-12 flex flex-col justify-center items-center">
        <div className="text-center space-y-1">
          <p className="text-3xl font-semibold">Forgot Password</p>
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

        <div className="grid gap-2 w-[400px] border p-4 rounded-lg shadow">
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
            <Button
              loading={generatingLink}
              onClick={handleResetPassword}
              disabled={email === "" || generatingLink}
              className="h-9 w-full bg-primaryblue border-none text-white hover:!bg-hoverblue hover:!text-white font-semibold shadow-none"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
