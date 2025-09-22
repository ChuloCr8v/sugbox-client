import { Button, Form } from "antd";
import { signupFormValues } from "../data";
import FormItemComponent from "./RenderFormItem";
import { useForm } from "antd/es/form/Form";
import { Label } from "./SmallerComponents";

const LoginForm = () => {
  const [form] = useForm();
  const { formItem } = FormItemComponent({ form });

  return (
    <Form className="w-full" form={form}>
      {signupFormValues.map((item) => (
        <Form.Item
          style={{
            marginBottom: 10,
          }}
          label={<Label title={item.label} />}
          className="w-full"
          rules={[
            { required: item.required, message: `${item.label} is required` },
          ]}
        >
          {formItem(item)}
        </Form.Item>
      ))}

      <Button
        size="large"
        type="primary"
        onClick={() => {}}
        className="w-full !mt-8"
      >
        Signup
      </Button>
    </Form>
  );
};

export default LoginForm;
