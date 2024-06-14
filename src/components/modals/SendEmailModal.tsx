import { Modal, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import {
  useGetEmployeeQuery,
  useSendEmailToEmployeeMutation,
} from "../../redux/data/employees";
import { closeSendEmailModal } from "../../redux/modals";
import { FormGroup } from "../SmallerComponents";

interface sendEmailModalProps {
  modals: { sendEmailModal: { id: string; isOpen: boolean } };
}

const SendEmailModal = () => {
  const { sendEmailModal } = useSelector(
    (state: sendEmailModalProps) => state.modals
  );

  const { id, isOpen } = sendEmailModal;
  const { data: employee, isLoading } = useGetEmployeeQuery(id);
  const [emailData, setEmailData] = useState({
    email: "",
    emailAddress: employee?.email,
  });

  const [sendEmailToEmployee, { isLoading: sendingEmail }] =
    useSendEmailToEmployeeMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    emailData.emailAddress = employee?.email;
  }, [id]);

  if (isLoading) {
    return <Spin />;
  }

  const handleUpdateEmailData = (name: string, value: string) => {
    setEmailData((prev) => ({ ...prev, [name]: value }));
    console.log(emailData);
  };

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
      <form className="grid gap-4 mt-8">
        <FormGroup
          label="Email Address"
          inputType="email"
          required
          name="emailAddress"
          value={employee?.email}
          inputClassName="text-gray-700"
          onInputChange={() => handleUpdateEmailData}
        />
        <FormGroup
          label="Subject"
          inputType="text"
          name="subject"
          inputClassName="text-gray-700"
          onInputChange={() => handleUpdateEmailData}
        />
        <FormGroup
          label="Email"
          inputType="textarea"
          name="email"
          inputClassName="text-gray-700"
          onInputChange={(e: any) =>
            handleUpdateEmailData("email", e.target.value)
          }
        />
      </form>
    </Modal>
  );
};

export default SendEmailModal;
