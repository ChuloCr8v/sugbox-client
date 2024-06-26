import { Button, Spin, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FormLayout from "../components/FormLayout";
import { FormGroup } from "../components/SmallerComponents";
import { useResetPasswordMutation } from "../redux/api/auth";
import { useGetEmployeeQuery } from "../redux/data/employees";
import { useGetOrganizationQuery } from "../redux/data/organizations";

const formDataFields = {
  oldPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(formDataFields);
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);
  const [newPasswordDontMatchError, setNewPasswordDontMatchError] =
    useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { id } = useParams();

  const { data: employee, isLoading: getEmployeeLoading } =
    useGetEmployeeQuery(id);

  const { data: organization, isLoading: getOrgLoading } =
    useGetOrganizationQuery(id);

  const formFields = [
    {
      label: "Old Password",
      value: formData.oldPassword,
      name: "oldPassword",
    },
    {
      label: "New Password",
      value: formData.oldPassword,
      name: "newPassword",
    },
    {
      label: "Repeat New Password",
      value: formData.oldPassword,
      name: "repeatNewPassword",
    },
  ];

  const handleInputChange = async (e: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    name === "oldPassword" && setPasswordDontMatch(false);

    if (name === "repeatNewPassword" || name === "newPassword") {
      const newPassword = name === "newPassword" ? value : formData.newPassword;
      const repeatNewPassword =
        name === "repeatNewPassword" ? value : formData.repeatNewPassword;

      if (newPassword !== repeatNewPassword) {
        setNewPasswordDontMatchError(true);
      } else {
        setNewPasswordDontMatchError(false);
      }
    }
  };

  const handleUpdatePassword = async () => {
    setErrorMsg("");
    setPasswordDontMatch(false);

    try {
      await resetPassword({
        email: employee ? employee.email : organization.companyEmail,
        formData,
        action: "resetPassword",
      }).unwrap();
      message.success("Password Reset Successful.");
      // handleLogOut();
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.data);
      message.error(error.data);
    }
  };

  const checkFormValues =
    formData.oldPassword !== "" &&
    formData.newPassword !== "" &&
    formData.repeatNewPassword !== "";

  console.log(organization);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <FormLayout
        leftSideElements={
          <img src="/reset-pass.svg" className="max-w-[400px] w-full" />
        }
        rightSideElements={
          <div className="flex flex-col items-center justify-center gap-12 w-full">
            <div className="">
              <p className="text-2xl font-semibold text-center">
                Reset Password for{" "}
                <span className="text-primaryblue font-semibold">
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
                    <FormGroup
                      inputError={
                        newPasswordDontMatchError &&
                        item.name === "repeatNewPassword"
                          ? "Passwords don't match!"
                          : passwordDontMatch && item.name === "oldPassword"
                          ? "Incorrect old password"
                          : ""
                      }
                      label={item.label}
                      name={item.name}
                      onInputChange={handleInputChange}
                      inputType={"password"}
                    />
                  </div>
                ))}
              </div>
              <Button
                loading={isLoading}
                onClick={handleUpdatePassword}
                className="bg-primaryblue border-none text-white hover:!bg-hoverblue hover:!text-white"
                disabled={
                  isLoading || newPasswordDontMatchError || !checkFormValues
                }
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
