import { Modal, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import {
  useGetEmployeeQuery,
  useSendEmailToEmployeeMutation,
} from "../../redux/data/employees";
import { closeSendEmailModal } from "../../redux/modals";
import FormItemWrapper from "../FormItemWrapper";

interface sendEmailModalProps {
  modals: { sendEmailModal: { id: string; isOpen: boolean } };
}

const SendEmailModal = () => {
  const { sendEmailModal } = useSelector(
    (state: sendEmailModalProps) => state.modals
  );

  const { id, isOpen } = sendEmailModal;
  const { data: employee, isLoading } = useGetEmployeeQuery(id);
  const [emailData, _setEmailData] = useState({
    email: "",
    emailAddress: employee?.email,
  });

  const [sendEmailToEmployee, { isLoading: sendingEmail }] =
    useSendEmailToEmployeeMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    emailData.emailAddress = employee?.email;
  }, [id]);

  const handleSendEmail = async () => {
    try {
      await sendEmailToEmployee(emailData).unwrap();
      message.success("Email sent successfully");
      dispatch(closeSendEmailModal());
    } catch (error) {
      console.log(error);
      message.error("Unable to send email, please try again.");
    }
  };

  const isDisabled = sendingEmail || !emailData.email;

  return (
    <Modal
      title={`Send email to ${employee?.firstName + " " + employee?.lastName}`}
      open={isOpen}
      okText="Send Email"
      okButtonProps={{
        className: twMerge("bg-primaryblue"),
        disabled: isDisabled,
      }}
      onCancel={() => dispatch(closeSendEmailModal())}
      onOk={handleSendEmail}
      confirmLoading={sendingEmail}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <form className="grid gap-4 mt-8">
          <FormItemWrapper
            label="Email Address"
            inputType="email"
            required
            name="emailAddress"
          />
          <FormItemWrapper label="Subject" inputType="text" name="subject" />
          <FormItemWrapper label="Email" inputType="textarea" name="email" />
        </form>
      )}
    </Modal>
  );
};

export default SendEmailModal;
