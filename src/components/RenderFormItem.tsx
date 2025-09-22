// import type { IconSvgElement } from "@hugeicons/react";
import {
  DatePicker,
  Input,
  Select,
  type FormInstance,
  type UploadProps,
} from "antd";
// import { useState, type ReactNode } from "react";
// import type { JobType } from "../../api/types";
// import DynamicDocumentUpload, {
//   type DocumentEntry,
// } from "./DynamicDocumentUpload";
// import Icon from "./Icon";
// import MultiUpload from "./MultiUploads";
// import CustomFilePicker from "../global/CustomFilePicker";
import type { Dayjs } from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { ReactNode, useEffect } from "react";
import { IconType } from "react-icons/lib";

const { Option } = Select;

export type FormFieldProps = {
  mode?: "multiple" | "tags" | undefined;
  accept?: string;
  listType?: UploadProps["listType"];
  minDate?: Dayjs;
  maxDate?: Dayjs;
  indexName?: string;
  label: string;
  name?: string;
  disabled?: boolean;
  value?: ReactNode;
  required?: boolean;
  options?: {
    label: string;
    value: ReactNode;
  }[];
  type: string;
  icon?: IconType;
  placeholder?: string;
};

type Props = {
  form: FormInstance<any>;
};

const FormItemComponent = ({ form }: Props) => {
  // const [documents, setDocuments] = useState<DocumentEntry[] | []>([]);

  const formItem = (item: FormFieldProps) => {
    useEffect(() => {
      console.log(form);
    }, []);

    switch (item.type) {
      case "text":
      case "email":
        return (
          <Input
            type={item.type}
            prefix={item.icon ? item.icon : undefined}
            placeholder={item.placeholder}
            allowClear
            disabled={item.disabled}
            className="!bg-transparent !text-white !rounded-lg "
            size="large"
          />
        );
      case "password":
        return (
          <Input.Password
            type={item.type}
            prefix={item.icon ? item.icon : undefined}
            placeholder={item.placeholder}
            allowClear
            disabled={item.disabled}
            className="!bg-transparent !text-white !rounded-lg"
            size="large"
            visibilityToggle={{ visible: true }}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            prefix={item.icon}
            placeholder={item.placeholder}
            allowClear
            disabled={item.disabled}
          />
        );
      // case "phone":
      //   return <PhoneInput enableSearch disabled={item.disabled} />;
      case "date":
        return (
          <DatePicker
            className="w-full"
            minDate={item.minDate ?? undefined}
            maxDate={item.maxDate ?? undefined}
            disabled={item.disabled}
            disabledDate={(current) => {
              if (!current) return false;
              const day = current.day();
              return day === 0 || day === 6;
            }}
          />
        );
      // case "dynamic-documents":
      //   return (
      //     <DynamicDocumentUpload
      //       documents={documents}
      //       setDocuments={setDocuments}
      //       disabled={item.disabled}
      //     />
      //   );
      case "select":
        return (
          <Select
            allowClear
            showSearch
            mode={item.mode ?? undefined}
            // prefix={
            //   item.icon
            // }
            placeholder={`Select ${item.label.toLowerCase()}`}
            // onChange={item.name === "jobType" ? handleJobTypeChange : undefined}
            disabled={item.disabled}
          >
            {item.options?.map((opt, x) => (
              <Option key={x} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );
      // case "file":
      //   return (
      //     <MultiUpload
      //       listType={item.listType}
      //       accept={item.accept}
      //       disabled={item.disabled}
      //     />
      //   );
      // case "file-picker":
      //   return <CustomFilePicker disabled={item.disabled} />;
      // case "image-picker":
      //   return (
      //     <CustomFilePicker
      //       listType="picture"
      //       containerStyle="grid grid-cols-2"
      //       maxFiles={3}
      //       disabled={item.disabled}
      //     />
      //   );
      // case "button":
      //   return (
      //     <Button
      //       type="dashed"
      //       disabled={item.disabled}
      //       icon={item.icon ? <Icon icon={item.icon} size={16} /> : undefined}
      //     >
      //       {item.label}
      //     </Button>
      //   );
      case "textArea":
        return <TextArea disabled={item.disabled} />;
      default:
        return (
          <Input placeholder={item.placeholder} disabled={item.disabled} />
        );
    }
  };

  return { formItem };
};

export default FormItemComponent;
