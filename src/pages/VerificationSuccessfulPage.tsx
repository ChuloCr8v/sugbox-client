import { Statistic, message } from "antd";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminVerificationMutation } from "../redux/api/auth";
import { valueType } from "antd/es/statistic/utils";

const VerificationSuccessfulPage = () => {
  const [adminVerification] = useAdminVerificationMutation();
  const { token, id } = useParams();
  const [startCountDown, setStartCountdown] = useState(false);
  const navigate = useNavigate();
  const { Countdown } = Statistic;

  const handleVerifyAccount = async () => {
    try {
      const res = await adminVerification({ token, id }).unwrap();
      console.log(res);
      setStartCountdown(true);
    } catch (error) {
      console.log(error);
      message.error("Verification failed, try again!.");
    }
  };

  useEffect(() => {
    handleVerifyAccount();
  }, []);

  const countdownChange = (value?: valueType | undefined) => {
    console.log(value);
    if (typeof value === "number" && value <= 0) {
      setStartCountdown(false);
      navigate("/login/admin");
    }
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-5 -mt-12">
      <FaCheck className="bg-green-300 text-white h-36 w-36 rounded-full p-6" />
      <p className="text-gray-500 font-semibold text-lg">
        Your account has been verified successfully
      </p>
      <a href="/login/admin" className="text-gray-500">
        Go to{" "}
        <span className="border-primaryblue border text-primaryblue ring-2 rounded px-2 pb-0.5 ml-1 hover:ring-4 duration-200 text-sm">
          Login Page
        </span>
      </a>
      <span className="text-gray-500 text-sm flex items-center gap-[4px]">
        Redirecting to login in
        {startCountDown && (
          <Countdown
            value={Date.now() + 5 * 1000}
            onChange={countdownChange}
            valueStyle={{ color: "teal", fontSize: "15px" }}
          />
        )}
      </span>
    </div>
  );
};

export default VerificationSuccessfulPage;
