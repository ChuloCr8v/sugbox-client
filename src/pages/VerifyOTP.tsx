import { Button, message } from "antd";
import { useState } from "react";
import OtpInput from "react-otp-input";
import {
  useGenerateOTPMutation,
  useVerifyOTPMutation,
} from "../redux/data/OTP";
import { useNavigate, useParams } from "react-router-dom";
import UseGetAuth from "../hooks/useGetAuth";

const VerifyOTPPage = () => {
  const [OTP, setOTP] = useState("");
  const [generateOTP, { isLoading }] = useGenerateOTPMutation();
  const { isAdmin } = UseGetAuth();

  const { id, action } = useParams();

  const [verifyOTP, { isLoading: verifyingOTP }] = useVerifyOTPMutation();

  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setOTP(value);
  };

  const handleOTPVerification = async () => {
    try {
      await verifyOTP({ id, OTP, isAdmin }).unwrap();
      message.success("OTP Verification Successful");
      if (action === "reset-email") {
        navigate(`/reset-email/${id}`);
      } else {
        navigate(`/reset-password/${id}`);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.data);
    }
  };

  const handleResendOTP = async () => {
    try {
      await generateOTP({ id, isAdmin }).unwrap();
      message.success("OTP resent to your email. ");
      setOTP("");
    } catch (error) {
      message.error("Failed to generate OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="text-center -mt-32 grid gap-2">
        <p className="text-2xl font-semibold text-primaryblue ">Verify OTP</p>
        <p className="text-gray-600">
          Enter the{" "}
          <span className="text-primaryblue font-semibold">
            One Time Password
          </span>{" "}
          that has been sent to your mail.{" "}
          <span className="block">Check your SPAM folder as well.</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-fit mt-6">
        <OtpInput
          containerStyle={{ gap: 20 }}
          value={OTP}
          onChange={handleInputChange}
          numInputs={4}
          renderInput={(props: any) => (
            <input {...props} className="border rounded-lg !w-10 h-10" />
          )}
        />
        <p className="mt-2">
          Yet to recieve OTP?{" "}
          <span
            className="text-primaryblue font-semibold cursor-pointer"
            onClick={handleResendOTP}
          >
            Resend OTP
          </span>
        </p>
        <Button
          loading={isLoading || verifyingOTP}
          onClick={handleOTPVerification}
          disabled={OTP.length < 4 || isLoading}
          className="bg-green-500 w-[144px] h-9 text-white font-semibold border-none shadow-none hover:!bg-green-700 hover:!text-white mt-6"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
