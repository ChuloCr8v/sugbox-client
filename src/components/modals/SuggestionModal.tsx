import { Checkbox, Form, message } from "antd";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import UseGetAuth from "../../hooks/useGetAuth";
import { useGetEmployeeQuery } from "../../redux/data/employees";
import { useAddSuggestionMutation } from "../../redux/data/suggestions";
import { Label } from "../SmallerComponents";
import { CustomModal } from "../global/CustomModal";
import { PlusSignCircleFreeIcons } from "@hugeicons/core-free-icons";
import { newSuggestionFormFields } from "../../data";
import FormItemComponent from "../RenderFormItem";
import { usePopup } from "../../context/PopupContext";
import FileUploadCard from "../global/FileDisplayCard";

const SuggestionModal = () => {
  const [form] = useForm();
  const [files, setFiles] = useState<any[]>([]);
  const { closeModal } = usePopup();

  const { user } = UseGetAuth();
  const { data: employee } = useGetEmployeeQuery(user?._id);

  const [addSuggestion, { isLoading }] = useAddSuggestionMutation();

  const newSuggestionData = {
    title: "",
    suggestion: "",
    isAnonymous: employee?.defaultAnonymousSuggestion,
    attachments: files,
  };

  const [newSuggestion, setNewSuggestion] = useState(newSuggestionData);
  const { formItem } = FormItemComponent({ form });
  const id = user?.companyId;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const attachments = files.map((item) => ({
        asset_id: item.asset_id,
        secure_url: item.secure_url,
      }));

      const payload = { ...newSuggestion, ...values, attachments };

      await addSuggestion({ id, suggestion: payload }).unwrap();

      message.success("Suggestion Added Successfully");
      setNewSuggestion(newSuggestionData);
      form.resetFields();
      setFiles([]);
      closeModal();
    } catch (error) {
      console.log(error);
      message.error("Unable to add Suggestion, try again!");
    }
  };

  const disabled =
    isLoading || !newSuggestion.title || !newSuggestion.suggestion;

  return (
    <CustomModal
      title="Add Suggestion"
      modalSubtitle="You can share your thoughts anonymously too"
      icon={PlusSignCircleFreeIcons}
      disabled={disabled}
      loading={isLoading}
      onOk={handleSubmit}
    >
      <Form className="w-full space-y-3" form={form} layout="vertical">
        {newSuggestionFormFields.map((item) => (
          <Form.Item
            key={item.name}
            name={item.name}
            style={{ marginBottom: 10 }}
            label={<Label title={item.label} />}
            className="w-full"
            rules={[{ required: true, message: `${item.label} is required` }]}
          >
            {formItem(item)}
          </Form.Item>
        ))}

        {/* File Upload Card */}

        <div className="">
          <Label title="Attachments (Optional)" />
        </div>
        <FileUploadCard files={files} setFiles={setFiles} allowUpload />

        <div className="formGroup">
          <Checkbox
            name="isAnonymous"
            defaultChecked={newSuggestion.isAnonymous}
            checked={newSuggestion.isAnonymous}
            onChange={(e) =>
              setNewSuggestion((prev) => ({
                ...prev,
                isAnonymous: e.target.checked,
              }))
            }
            className="duration-200 text-gray-300 text-xs"
          >
            Suggest Anonymously
          </Checkbox>
        </div>
      </Form>
    </CustomModal>
  );
};

export default SuggestionModal;
