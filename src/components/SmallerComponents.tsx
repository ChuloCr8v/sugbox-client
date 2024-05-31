import { Select } from "antd";
import { FaAsterisk } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { formGroupProps, inputProps, labelProps, selectProps } from "../types";

export const Label = (props: labelProps) => {
  return (
    <label
      className={twMerge(
        "text-black flex items-center gap-1",
        props.labelClassName
      )}
    >
      {props.title}{" "}
      {props.isRequired && (
        <span className="text-red-500">
          <FaAsterisk className="text-[6px]" />
        </span>
      )}
    </label>
  );
};

export const Input = (props: inputProps) => {
  return (
    <div className="relative w-full">
      {props.inputError && (
        <p className="errorMsg text-sm text-red-600 font-semibold absolute right-0 -top-3 bg-white px-1 z-50">
          {props.inputError}
        </p>
      )}
      <input
        name={props.name}
        type={props.type}
        className={twMerge(
          "w-full h-8 border-solid border-[1.5px] border-gray-300 rounded-md px-3 py-2 hover:border-primaryblue duration-200 focus:outline-primaryblue bg-transparent placeholder:text-gray-300",
          props.inputClassName,
          props.inputError &&
            "border-red-600 hover:border-red-600 focus:outline-red-600"
        )}
        onChange={props.onchange}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
      />
    </div>
  );
};

export const TextArea = (props: inputProps) => {
  return (
    <textarea
      name={props.name}
      className="w-full border-solid border-2 border-bordercolor rounded-md px-3 py-3 hover:border-primaryblue duration-200 focus:outline-primaryblue"
      onChange={props.onchange}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
    />
  );
};

export const SelectComponent = (props: selectProps) => {
  return (
    <Select
      defaultValue={props.defaultValue}
      onChange={props.onchange}
      className={props.className}
      options={props.options}
    />
  );
};

export const FormGroup = (props: formGroupProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-start gap-2 w-full",
        props.className
      )}
    >
      <Label
        title={props.label}
        isRequired={props.required}
        labelClassName={props.labelClassName}
      />
      {props.inputType === "textarea" ? (
        <TextArea
          onchange={props.onInputChange}
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
          value={props.value}
          defaultValue={undefined}
        />
      ) : props.inputType === "select" ? (
        <SelectComponent
          options={props.options}
          defaultValue={props.defaultValue}
          onchange={props.selectOnchange}
          name={""}
        />
      ) : (
        <Input
          inputError={props.inputError}
          inputClassName={props.inputClassName}
          type={props.inputType}
          onchange={props.onInputChange}
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
          value={props.value}
        />
      )}
    </div>
  );
};
