import { Button, Checkbox, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  useEditSuggestionMutation,
  useGetSuggestionQuery,
} from "../../redux/data/suggestions";
import { hideEditSuggestionModal } from "../../redux/modals";
import { FormGroup } from "../SmallerComponents";

interface editSuggestionModalProps {
  modals: {
    editSuggestionModal: string;
  };
}

const EditSuggestionModal = () => {
  const { editSuggestionModal } = useSelector(
    (state: editSuggestionModalProps) => state.modals
  );

  const id = editSuggestionModal;
  const { data } = useGetSuggestionQuery(id);

  const [formData, setFormData] = useState(data);

  const [editSuggestion, { isLoading: loadingEditSuggestion }] =
    useEditSuggestionMutation();

  const dispatch = useDispatch();

  const handleUpdateSuggestion = (e: {
    target: { name: string; value: string };
  }) => {
    const { value, name } = e.target;
    setFormData((prevState: object) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [editSuggestionModal]);

  const disabled =
    formData?.title === data?.title &&
    formData?.isAnonymous === data?.isAnonymous &&
    formData?.suggestion === data?.suggestion &&
    formData?.attachments?.length === data?.attachments?.length;

  const updateSuggestion = async () => {
    try {
      const update = await editSuggestion(formData).unwrap();
      console.log(update);
      message.success("Suggestion updated successfully.");
      dispatch(hideEditSuggestionModal());
    } catch (error) {
      console.log(error);
      message.error("Update suggestion failed. Try again.");
    }
  };

  const handleRemoveAttachment = (asset_id: string) => {
    console.log(asset_id);
    const updatedAttachments = formData.attachments?.filter(
      (attachment: { asset_id: string }) => attachment.asset_id !== asset_id
    );

    setFormData((prevState: object) => ({
      ...prevState,
      attachments: updatedAttachments,
    }));

    console.log(formData.attachments);
  };

  return (
    <>
      <Modal
        maskClosable={!loadingEditSuggestion}
        closable={!loadingEditSuggestion}
        title={"Edit Suggestion"}
        open={id !== ""}
        onCancel={() => dispatch(hideEditSuggestionModal())}
        footer={false}
      >
        <form className="flex flex-col items-start gap-4 pt-6">
          <FormGroup
            onInputChange={handleUpdateSuggestion}
            label={"Title"}
            inputType={"text"}
            placeholder={"Suggestion Title"}
            name={"title"}
            value={formData?.title}
            labelClassName="font-semibold"
          />
          <FormGroup
            onInputChange={handleUpdateSuggestion}
            label={"Suggestion"}
            inputType={"textarea"}
            placeholder={"Leave your suggestion"}
            name={"suggestion"}
            value={formData?.suggestion}
            labelClassName="font-semibold"
          />
          <div className="formGroup">
            <Checkbox
              onChange={(e) => {
                setFormData((prev: object) => ({
                  ...prev,
                  isAnonymous: e.target.checked,
                }));
              }}
              className="hover:text-primaryblue duration-200"
              checked={formData?.isAnonymous}
            >
              Suggest Anonymously
            </Checkbox>
          </div>
          <div className="grid min-[600px]:grid-cols-2 gap-2">
            {formData?.attachments?.map(
              (attachment: { secure_url: string; asset_id: string }) => (
                <div className="h-[100px] w-full border rounded overflow-hidden relative">
                  <FaTrashAlt
                    className="absolute right-2 top-2 hover:text-red-600 duration-200"
                    onClick={() => handleRemoveAttachment(attachment.asset_id)}
                  />
                  <img
                    src={attachment.secure_url}
                    alt="attachment"
                    className="object-fit w-full h-auto"
                  />
                </div>
              )
            )}
          </div>
          <div className="w-full flex items-center gap-4 justify-end mt-4">
            <Button
              disabled={loadingEditSuggestion}
              className="w-[144px]"
              onClick={() => dispatch(hideEditSuggestionModal())}
              loading={loadingEditSuggestion}
            >
              Cancel
            </Button>
            <Button
              className="w-[144px] bg-primaryblue text-white hover:!text-white h-8 px-6 rounded-md hover:!bg-hoverblue"
              onClick={updateSuggestion}
              disabled={disabled || loadingEditSuggestion}
              loading={loadingEditSuggestion}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditSuggestionModal;
