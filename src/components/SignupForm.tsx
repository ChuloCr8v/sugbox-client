import { twMerge } from "tailwind-merge";
import { Button } from "antd";
import { FormGroup } from "./SmallerComponents";

import { ChangeEventHandler } from "react";

interface Props {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  formValues: {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    required: boolean;
  }[];
  handleSubmit: (e: { preventDefault: () => void }) => void;
  disabled: boolean;
  isLoading: boolean;
}

const SignupForm = (props: Props) => {
  return (
    <form
      action=""
      className="flex flex-col items-start gap-6 max-w-[500px] w-full "
    >
      {props.formValues.map(
        (
          v: {
            required: boolean;
            label: string;
            type: string;
            placeholder: string;
            name: string;
          },
          index: React.Key
        ) => (
          <FormGroup
            key={index}
            onInputChange={props.handleInputChange}
            label={v.label}
            inputType={v.type}
            placeholder={v.placeholder}
            name={v.name}
            required={v.required}
          />
        )
      )}

      <Button
        className={twMerge(
          "w-full flex items-center justify-center border-none bg-primaryblue hover:bg-hoverblue font-bold text-white uppercase py-3"
        )}
        onClick={props.handleSubmit}
        disabled={props.disabled}
        loading={props.isLoading}
      >
        Signup
      </Button>

      <div className="place-self-center">
        <span className="text-center text-white">
          Already have an account? Login{" "}
          <a
            href="/login"
            className="underline font-bold hover:text-[#031932] duration-200"
          >
            here
          </a>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
