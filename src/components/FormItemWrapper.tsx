import { Form, Input, Select } from "antd";
import { twMerge } from "tailwind-merge";
import { Rule } from "antd/es/form"; // ✅ import Rule type
import { formGroupProps } from "../types";

const FormItemWrapper = (props: formGroupProps) => {
  const { inputType, placeholder, name, options, label, required, className } =
    props;

  const classNames = "w-full";
  // 🔹 Field mapping
  const fieldMap: Record<string, React.ReactNode> = {
    textarea: (
      <Input.TextArea
        placeholder={placeholder}
        name={name}
        className={className}
        variant="underlined"
      />
    ),
    select: (
      <Select options={options} className={classNames} variant="underlined" />
    ),
    password: (
      <Input.Password
        placeholder={placeholder}
        name={name}
        variant="underlined"
      />
    ),
    repeatPassword: (
      <Input.Password
        placeholder={placeholder}
        name={name}
        className={className}
        variant="underlined"
      />
    ),
  };

  const field = fieldMap[inputType ?? ""] ?? (
    <Input variant="underlined" className={"w-full"} />
  );

  // 🔹 Validation rules
  const rules: Rule[] = [];

  if (required) {
    rules.push({
      required: true,
      message: `${label} is required`,
    });
  }

  if (inputType === "repeatPassword") {
    rules.push(({ getFieldValue }) => ({
      validator(_: any, value: string) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Passwords do not match!"));
      },
    }));
  }

  return (
    <Form.Item
      label={label}
      layout="vertical"
      required={required}
      name={name}
      rules={rules}
      className={twMerge("w-full", className)}
    >
      {field}
    </Form.Item>
  );
};

export default FormItemWrapper;
