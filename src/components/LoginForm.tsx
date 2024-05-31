import { Checkbox } from "antd";
import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import { loginFormValues } from "../data";
import Button from "./Button";
import { FormGroup } from "./SmallerComponents";

interface Props {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  handleSubmit: any;
  isLoading: boolean;
}

const LoginForm = (props: Props) => {
  return (
    <form
      action=""
      className="bg-white px-6 py-10 flex flex-col items-start gap-6 max-w-[400px] w-full shadow-lg rounded-xl border-solid border-bordercolor border-2 bg-morph"
    >
      {loginFormValues.map((v, index) => (
        <FormGroup
          onInputChange={props.handleInputChange}
          label={v.label}
          inputType={v.type}
          placeholder={v.placeholder}
          name={v.name}
          key={index}
          required={v.required}
        />
      ))}

      <div className="w-full flex justify-between items-center">
        <Checkbox
          onChange={() => {}}
          className="hover:text-primaryblue duration-200 text-base text-white"
        >
          Remember Me
        </Checkbox>
        <a
          href="/forgot-password"
          className="hover:text-primaryblue duration-200 cursor-pointer text-[14.5px] text-white"
        >
          Forgot Password
        </a>
      </div>
      <Button
        className={twMerge(
          "w-full hover:bg-[#031932] bg-hoverblue font-bold text-white uppercase py-3",
          props.disabled && "bg-gray-200 hover:bg-gray-200"
        )}
        text={"Login"}
        onClick={props.handleSubmit}
        disabled={props.disabled}
        loading={props.isLoading}
        url={""}
      />
      <div className="place-self-center">
        <span className="text-center text-white">
          Don't have an account? Sign up{" "}
          <a
            href="/signup"
            className="underline font-bold hover:text-[#031932] duration-200"
          >
            here
          </a>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
