import { Button, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup } from "../components/SmallerComponents";
import { useResetEmployeePasswordMutation } from "../redux/api/auth";
import { useGetEmployeeQuery } from "../redux/data/employees";

const formDataFields = {
  newPassword: "",
  repeatNewPassword: "",
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(formDataFields);
  const [newPasswordDontMatchError, setNewPasswordDontMatchError] =
    useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resetEmployeePassword, { isLoading }] =
    useResetEmployeePasswordMutation();

  const navigate = useNavigate();

  const { id, token } = useParams();

  const { data: employee, isLoading: getEmployeeLoading } =
    useGetEmployeeQuery(id);

  const formFields = [
    {
      label: "New Password",
      value: formData.newPassword,
      name: "newPassword",
    },
    {
      label: "Repeat New Password",
      value: formData.repeatNewPassword,
      name: "repeatNewPassword",
    },
  ];

  const handleInputChange = async (e: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

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
    try {
      await resetEmployeePassword({
        email: employee.email,
        newPassword: formData.newPassword,
        action: "forgotPassword",
        token: token,
      }).unwrap();
      message.success("Password Reset Successful.");
      formData.newPassword = "";
      formData.repeatNewPassword = "";
    } catch (error: any) {
      switch (error.status) {
        case 401:
          setErrorMsg("Token expired!");
          message.error("Error. Your token has expired.");
          navigate("/portal");
          break;
        case 403:
          setErrorMsg(
            "Old passwords can't be reused. Please choose a new password."
          );
          message.error(
            "Old passwords can't be reused. Please choose a new password."
          );
          break;
        case 404:
          setErrorMsg("Token verification failed.");
          message.error("Token verification failed.");
          navigate("/portal");
          break;
        default:
          setErrorMsg("Password reset failed. Try again.");
          message.error("Password reset failed. Try again.");
      }
    }
  };

  const checkFormValues =
    formData.newPassword !== "" && formData.repeatNewPassword !== "";

  return (
    <div className="h-screen overflow-hidden w-screen flex flex-col items-center justify-center relative">
      <img
        src="/reset-password.jpg"
        alt="reset password"
        className="h-auto w-[900px] absolute -left-48 -bottom-40 opacity-60 z-0"
      />
      <div className="wrapper flex flex-col items-center justify-center gap-12 relative z-20">
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
        <form className="w-[400px] grid gap-6 border shadow-lg p-4 rounded-lg py-8  bg-white">
          <div className="grid gap-4">
            {formFields.map((item) => (
              <div className="relative" key={item.label}>
                <FormGroup
                  inputError={
                    newPasswordDontMatchError &&
                    item.name === "repeatNewPassword"
                      ? "Passwords don't match!"
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
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
