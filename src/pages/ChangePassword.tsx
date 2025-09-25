import { Button, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormItemWrapper from "../components/FormItemWrapper";
import { useResetPasswordMutation } from "../redux/api/auth";
import { useGetEmployeeQuery } from "../redux/data/employees";
import { useGetOrganizationQuery } from "../redux/data/organizations";
import FormLayout from "../components/FormLayout";
import { useForm } from "antd/es/form/Form";

const ChangePassword = () => {
  const [form] = useForm();

  const [errorMsg, setErrorMsg] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const { id, token } = useParams();

  const { data: employee, isLoading: getEmployeeLoading } =
    useGetEmployeeQuery(id);
  const { data: organization, isLoading: getOrganizationLoading } =
    useGetOrganizationQuery(id);

  const currentAccount = employee ? employee : organization;

  const formFields = [
    {
      label: "New Password",
      name: "newPassword",
    },
    {
      label: "Repeat New Password",
      name: "repeatNewPassword",
    },
  ];

  const handleUpdatePassword = async () => {
    setErrorMsg("");
    try {
      const values = await form.validateFields();
      await resetPassword({
        email: employee ? currentAccount?.email : currentAccount?.companyEmail,
        formData: values,
        action: "forgotPassword",
        token: token,
      }).unwrap();
      message.success("Password Reset Successful.");
      values.newPassword = "";
      values.repeatNewPassword = "";
      navigate("/");
    } catch (error: any) {
      setErrorMsg(error.data);
      message.error(error.data);
    }
  };

  return (
    <div className="h-screen overflow-hidden w-screen flex flex-col items-center justify-center relative">
      <FormLayout
        leftSideElements={
          <img
            src="/reset-pass.svg"
            alt="reset password"
            className="h-auto max-w-[400px] w-full"
          />
        }
        rightSideElements={
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full">
              <p className="text-2xl font-semibold text-center">
                Reset Password for{" "}
                <span className="text-primaryblue font-semibold">
                  {getEmployeeLoading || getOrganizationLoading ? (
                    <Spin />
                  ) : employee ? (
                    employee?.firstName + " " + employee?.lastName
                  ) : (
                    organization?.companyName
                  )}
                </span>
              </p>
              {errorMsg && (
                <p className="text-red-600 text-center my-2 font-semibold">
                  {errorMsg}
                </p>
              )}{" "}
            </div>
            <form className="max-w-[400px] w-full grid gap-6">
              <div className="grid gap-4">
                {formFields.map((item) => (
                  <div className="relative" key={item.label}>
                    <FormItemWrapper
                      label={item.label}
                      name={item.name}
                      inputType={"password"}
                    />
                  </div>
                ))}
              </div>
              <Button
                loading={isLoading}
                onClick={handleUpdatePassword}
                className="bg-primaryblue border-none text-white hover:!bg-hoverblue hover:!text-white"
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          </div>
        }
      />
    </div>
  );
};

export default ChangePassword;
