import { Button, Checkbox, Modal, Spin, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaPaperclip, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../../hooks/useGetAuth";
import { useGetEmployeeQuery } from "../../redux/data/employees";
import { useAddSuggestionMutation } from "../../redux/data/suggestions";
import { hideNewSuggestionModal } from "../../redux/modals";
import { FormGroup } from "../SmallerComponents";
import { API_URL } from "../..";
interface newSuggestionModalProps {
  modals: {
    newSuggestionModal: boolean;
  };
}

const SuggestionModal = () => {
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
  const { newSuggestionModal } = useSelector(
    (state: newSuggestionModalProps) => state.modals
  );
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

  const handleUpdateNewSuggestion = (e: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = e.target;
    setNewSuggestion((prev) => ({ ...prev, [name]: value }));
  };

  const disabled =
    isLoading || newSuggestion.suggestion === "" || newSuggestion.title === "";

  function formatName(str: string) {
    let slashIndex = str.indexOf("/");
    return str.substring(slashIndex + 1);
  }

  return (
    <>
      <Modal
        title={"New Suggestion"}
        open={newSuggestionModal}
        onCancel={() => dispatch(hideNewSuggestionModal())}
        footer={false}
      >
        <form className="flex flex-col items-start gap-4 mt-6">
          <FormGroup
            value={newSuggestion.title}
            onInputChange={handleUpdateNewSuggestion}
            label={"Title"}
            inputType={"text"}
            placeholder={"Suggestion Title"}
            name={"title"}
          />
          <FormGroup
            value={newSuggestion.suggestion}
            onInputChange={handleUpdateNewSuggestion}
            label={"Suggestion"}
            inputType={"textarea"}
            placeholder={"Leave your suggestion"}
            name={"suggestion"}
          />

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
              <div className="w-fit place-self-start border rounded px-2 py-1 bg-gray-50 relative flex items-center gap-2 text-gray-500 hover:text-primaryblue hover:border-primaryblue">
                <input
                  onChange={handleGetFiles}
                  type="file"
                  accept="image/*"
                  className="absolute left-0 top-0 w-full opacity-0"
                />
                <FaPaperclip className="" />
                <p className="text-sm ">Add attachments</p>
              </div>
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
              className="hover:text-primaryblue duration-200"
            >
              Suggest Anonymously
            </Checkbox>
          </div>
          <div className="w-full flex items-center justify-end gap-4 mt-4">
            <Button
              onClick={() => dispatch(hideNewSuggestionModal())}
              disabled={isLoading}
              loading={isLoading}
              type="default"
              className="h-8 w-[144px] "
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={disabled}
              loading={isLoading || loading}
              type="primary"
              className="bg-primaryblue h-8 w-[144px]"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SuggestionModal;
