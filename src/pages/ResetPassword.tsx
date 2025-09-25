import { Button, Spin, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import FormItemWrapper from "../components/FormItemWrapper";
import { useResetPasswordMutation } from "../redux/api/auth";
import { useGetEmployeeQuery } from "../redux/data/employees";
import { useGetOrganizationQuery } from "../redux/data/organizations";
import useLogout from "../hooks/useLogout";
import { useForm } from "antd/es/form/Form";

const ResetPassword = () => {
  const [form] = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { handleLogOut } = useLogout();

  const { id } = useParams();

  const { data: employee, isLoading: getEmployeeLoading } =
    useGetEmployeeQuery(id);

  const { data: organization, isLoading: getOrgLoading } =
    useGetOrganizationQuery(id);

  const formFields = [
    {
      label: "Old Password",
      name: "oldPassword",
    },
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

    const formData = await form.validateFields();
    try {
      await resetPassword({
        email: employee ? employee.email : organization.companyEmail,
        formData,
        action: "resetPassword",
      }).unwrap();
      message.success("Password Reset Successful.");
      handleLogOut();
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.data);
      message.error(error.data);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <FormLayout
        leftSideElements={
          <img
            src="/reset-pass.svg"
            alt="reset-password"
            className="max-w-[400px] w-full"
          />
        }
        rightSideElements={
          <div className="flex flex-col items-center justify-center gap-12 w-full">
            <div className="">
              <p className="text-xl font-semibold text-center">
                Reset Password for{" "}
                <span className="text-primaryblue font-semibold text-2xl">
                  {getEmployeeLoading || getOrgLoading ? (
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
            <form className="max-w-[500px] w-full grid gap-10">
              <div className="grid gap-4">
                {formFields.map((item) => (
                  <div className="relative">
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
              {/* <a
                href="/forgot-password"
                className=" -mt-8 place-self-end text-primaryblue underline underline-offset-2 font-semibold"
              >
                Forgot Password
              </a> */}
            </form>
          </div>
        }
      />
    </div>
  );
};

export default ResetPassword;
