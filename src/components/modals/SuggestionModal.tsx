import { Checkbox, Form, Spin, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaPaperclip, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../../hooks/useGetAuth";
import { useGetEmployeeQuery } from "../../redux/data/employees";
import { useAddSuggestionMutation } from "../../redux/data/suggestions";
import { hideNewSuggestionModal } from "../../redux/modals";
import { Label } from "../SmallerComponents";
import { API_URL } from "../..";
import { CustomModal } from "../global/CustomModal";
import { PlusSignCircleFreeIcons } from "@hugeicons/core-free-icons";
import { newSuggestionFormFields } from "../../data";
import FormItemComponent from "../RenderFormItem";
import { useForm } from "antd/es/form/Form";
import CardWrapper from "../global/CardWrapper";

const SuggestionModal = () => {
  const [form] = useForm();
  const [files, setFiles] = useState<any>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const { user } = UseGetAuth();
  const { data: employee } = useGetEmployeeQuery(user?._id);

  const newSuggestionData = {
    title: "",
    suggestion: "",
    isAnonymous: employee?.defaultAnonymousSuggestion,
    attachments: files,
  };

  const [addSuggestion, { isLoading }] = useAddSuggestionMutation();
  const [newSuggestion, setNewSuggestion] = useState(newSuggestionData);

  const { formItem } = FormItemComponent({ form });

  const dispatch = useDispatch();

  const { token } = UseGetAuth();

  const id = user?.companyId;

  const handleGetFiles = async (e: any) => {
    setLoading(true);
    const _files: any = Array.from(e.target.files);

    const formData = new FormData();

    for (let index = 0; index < _files.length; index++) {
      formData.append(`files`, _files[index]);
    }

    try {
      await axios
        .post(`${API_URL}files/upload-files`, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
            console.log(`Upload progress: ${percentCompleted}%`);
            // Optionally, update your UI to reflect the progress
          },
        })
        .then((res) => {
          console.log(res.data);
          setFiles((prev: any) => [...prev, res.data]);
          message.success("Upload Successfull");
          console.log(files);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      message.error("Upload Failed");
    }
    setProgress(0);
    setLoading(false);
  };

  const handleRemoveFile = async (asset_id: string) => {
    try {
      const updatedFiles = files.filter(
        (file: { asset_id: string }) => file.asset_id !== asset_id
      );
      setFiles(updatedFiles);
    } catch (error) {
      console.log(error);
      message.error("Delete file failed, try again!");
    }
  };

  const handleSubmit = async () => {
    const attachments = files.map(
      (item: { asset_id: string; secure_url: string }) => {
        return { asset_id: item.asset_id, secure_url: item.secure_url };
      }
    );

    newSuggestion.attachments = attachments;
    try {
      const add = await addSuggestion({
        id,
        suggestion: newSuggestion,
      }).unwrap();
      console.log(add);
      message.success("Suggestion Added Successfully");
      setNewSuggestion((prev) => {
        return { ...prev, title: "", suggestion: "", isAnonymous: false };
      });
      setFiles([]);
      dispatch(hideNewSuggestionModal());
    } catch (error) {
      console.log(error);
      message.error("Unable to add Suggestion, try again!.");
    }
  };

  const disabled =
    isLoading || newSuggestion.suggestion === "" || newSuggestion.title === "";

  function formatName(str: string) {
    let slashIndex = str.indexOf("/");
    return str.substring(slashIndex + 1);
  }

  return (
    <>
      <CustomModal
        title={"Add Suggestion"}
        modalSubtitle="You can share your thoughts anonymously too"
        icon={PlusSignCircleFreeIcons}
        disabled={disabled}
        loading={isLoading}
        onOk={handleSubmit}
      >
        <Form className="w-full space-y-3" form={form} layout="vertical">
          {newSuggestionFormFields.map((item) => (
            <Form.Item
              name={item.name}
              style={{
                marginBottom: 10,
              }}
              label={<Label title={item.label} />}
              className="w-full"
              rules={[{ required: true, message: `${item.label} is required` }]}
            >
              {formItem(item)}
            </Form.Item>
          ))}

          <div className="">
            {progress > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-1  w-[300px] overflow-hidden bg-gray-200 rounded-full">
                  <div
                    style={{ width: `${progress}%` }}
                    className={twMerge(
                      ` bg-green-600 h-3`,
                      progress < 50 && "bg-red-600"
                    )}
                  ></div>
                </div>
                <p className="text-gray-500">{progress}%...</p>
              </div>
            )}
            {loading ? (
              <div className="">
                <Spin /> getting files...
              </div>
            ) : (
              <CardWrapper className="!w-fit py-2 px-3 text-gray-300 gap-2 !rounded-lg *:text-xs items-center">
                <input
                  onChange={handleGetFiles}
                  type="file"
                  accept="image/*"
                  className="absolute left-0 top-0 w-full opacity-0"
                />
                <FaPaperclip className="" />
                <p className="text-sm ">Add attachments</p>
              </CardWrapper>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            {files?.map((file: { public_id: string; asset_id: string }) => (
              <div
                key={file.asset_id}
                className="flex items-center justify-between bg-gray-50 border rounded px-2 py-0.5"
              >
                <p className="">
                  {formatName(file?.public_id)?.slice(0, 25)}
                  {formatName(file?.public_id)?.length > 25 && "..."}
                </p>
                <FaRegTrashAlt
                  className="text-red-400 hover:text-red-700 duration-200"
                  onClick={() => handleRemoveFile(file.asset_id)}
                />
              </div>
            ))}
          </div>

          <div className="formGroup">
            <Checkbox
              name="isAnonymous"
              defaultChecked={newSuggestion.isAnonymous}
              checked={newSuggestion.isAnonymous}
              onChange={(e) => {
                setNewSuggestion((prev) => ({
                  ...prev,
                  isAnonymous: e.target.checked,
                }));
                console.log(newSuggestion);
              }}
              className="duration-200 text-gray-300 text-xs"
            >
              Suggest Anonymously
            </Checkbox>
          </div>
        </Form>
      </CustomModal>
    </>
  );
};

export default SuggestionModal;
