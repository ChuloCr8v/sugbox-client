import { Button, Spin, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormGroup } from "../components/SmallerComponents";
import { useResetEmployeePasswordMutation } from "../redux/api/auth";
import { useGetEmployeeQuery } from "../redux/data/employees";

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
  const [resetEmployeePassword, { isLoading }] =
    useResetEmployeePasswordMutation();

  const { id } = useParams();

  const { data: employee, isLoading: getEmployeeLoading } =
    useGetEmployeeQuery(id);

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
      await resetEmployeePassword({ email: employee.email, formData }).unwrap();
      message.success("Password Reset Successful.");
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        setPasswordDontMatch(true);
        message.error("The old password you provided is incorrect.");
        setErrorMsg("The old password you provided is incorrect.");
      } else if (error.status === 403) {
        setErrorMsg(
          "Old passwords can't be reused. Please choose a new password."
        );
        message.error(
          "Old passwords can't be reused. Please choose a new password."
        );
      } else {
        if (error.status === 403) {
          message.error("Incorrect OTP.");
          setErrorMsg("Incorrect OTP.");
        } else if (error.status === 404) {
          message.error("No OTP available for your account.");
          setErrorMsg("No OTP available for your account.");
        } else {
          message.error("Password reset failed. Try again.");
          setErrorMsg("Password reset failed. Try again.");
          setPasswordDontMatch(false);
        }
      }
    }
  };

  const checkFormValues =
    formData.oldPassword !== "" &&
    formData.newPassword !== "" &&
    formData.repeatNewPassword !== "";

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="wrapper flex flex-col items-center justify-center gap-12">
        <div className="">
          <p className="text-2xl font-semibold text-center">
            Reset Password for{" "}
            <span className="text-primaryblue font-semibold">
              {getEmployeeLoading ? (
                <Spin />
              ) : (
                employee?.firstName + " " + employee?.lastName
              )}
            </span>
          </p>
          {errorMsg && (
            <p className="text-red-600 text-center my-2 font-semibold">
              {errorMsg}
            </p>
          )}{" "}
        </div>
        <form className="w-[400px] grid gap-10">
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
          <a
            href="/forgot-password"
            className=" -mt-8 place-self-end text-primaryblue underline underline-offset-2 font-semibold"
          >
            Forgot Password
          </a>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
