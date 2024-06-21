import { Input, Modal, message } from "antd";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseGetAuth from "../../hooks/useGetAuth";
import { useGenerateOTPMutation } from "../../redux/data/OTP";
import { useGetEmployeeQuery } from "../../redux/data/employees";
import ModalFooter from "./ModalFooter";
import { useGetOrganizationQuery } from "../../redux/data/organizations";

interface Props {
  confirmResetPasswordIsOpen: boolean;
  setConfirmResetPasswordIsOpen: (arg: boolean) => void;
}
const ConfirmEmailUpdateModal = (props: Props) => {
  const [generateOTP, { isLoading: generatingOtp }] = useGenerateOTPMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { id, isAdmin } = UseGetAuth();
  const { data: employee } = useGetEmployeeQuery(id);
  const { data: organization } = useGetOrganizationQuery(id);

  const currentEmail = isAdmin ? organization?.companyEmail : employee?.email;

  const handleGenerateOtp = async () => {
    try {
      if (currentEmail !== email) {
        message.error("Incorrect Email address");
        return;
      }
      await generateOTP({
        id,
        isAdmin,
        action: "reset your email address",
      }).unwrap();
      message.success("OTP sent to your email");
      navigate(`/verify-otp/${id}/reset-email`);
      setEmail("");
      props.setConfirmResetPasswordIsOpen(false);
    } catch (error) {
      console.log(error);
      message.error("error, please try again.");
    }
  };

  return (
    <Modal
      footer={
        <ModalFooter
          handleOk={handleGenerateOtp}
          onClose={() => props.setConfirmResetPasswordIsOpen(false)}
          loading={generatingOtp}
          okText="Submit"
          disabled={email === "" || generatingOtp}
        />
      }
      className="flex flex-col items-center justify-center"
      open={props.confirmResetPasswordIsOpen}
      onCancel={() => props.setConfirmResetPasswordIsOpen(false)}
    >
      <div className=" flex flex-col items-center justify-center gap-8 pt-8">
        <div className="grid gap-1">
          <p className="text-center text-xl font-semibold text-primaryblue">
            Reset Email Address
          </p>
          <p className="text-center text-gray-600 leading-tight">
            Enter your current email address to recieve the code for updating
            your email.
          </p>
        </div>
        <div className="grid gap-2 w-[400px] border p-4 rounded-md">
          <label className="font-semibold text-base text-left">
            Current Email Address
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmEmailUpdateModal;
