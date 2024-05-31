import { Button, Input, message } from "antd";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import UseGetAuth from "../hooks/useGetAuth";
import { useResetEmployeeEmailMutation } from "../redux/api/auth";
import { useNavigate } from "react-router-dom";

const ResetEmail = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetEmployeeEmail, { isLoading: updatingEmail }] =
    useResetEmployeeEmailMutation();
  const navigate = useNavigate();

  const { id } = UseGetAuth();

  const handleResetPassword = async () => {
    setErrorMessage("");
    try {
      await resetEmployeeEmail({ id, email }).unwrap();
      message.success("Email updated Successfully");
      setTimeout(() => {
        navigate("/portal");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      setErrorMessage("Failed, try again.");
      message.error("Failed, try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-12 flex flex-col justify-center items-center">
        <div className="text-center space-y-1">
          <p className="text-3xl font-semibold">Update Email Address</p>
          <p className="text-gray-600">Enter your new email address</p>

          {errorMessage && (
            <p className="font-semibold text-red-600 text-center">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="grid gap-2 w-[400px] border p-4 rounded-lg shadow">
          <label className="font-semibold text-base text-left">
            New Email Address
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
              loading={updatingEmail}
              onClick={handleResetPassword}
              disabled={email === "" || updatingEmail}
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

export default ResetEmail;
