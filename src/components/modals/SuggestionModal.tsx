import { Button, Checkbox, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseGetAuth from "../../hooks/useGetAuth";
import { useGetEmployeeQuery } from "../../redux/data/employees";
import { useAddSuggestionMutation } from "../../redux/data/suggestions";
import { hideNewSuggestionModal } from "../../redux/modals";
import { FormGroup } from "../SmallerComponents";

interface newSuggestionModalProps {
  modals: {
    newSuggestionModal: boolean;
  };
}

const newSuggestionData = {
  title: "",
  suggestion: "",
  isAnonymous: false,
};

const SuggestionModal = () => {
  const [addSuggestion, { isLoading }] = useAddSuggestionMutation();
  const [newSuggestion, setNewSuggestion] = useState(newSuggestionData);
  const { newSuggestionModal } = useSelector(
    (state: newSuggestionModalProps) => state.modals
  );
  const dispatch = useDispatch();
  const { user } = UseGetAuth();

  const { data: employee } = useGetEmployeeQuery(user?._id);

  const id = user?.companyId;

  useEffect(() => {
    if (employee?.defaultAnonymousSuggestion) {
      newSuggestion.isAnonymous = true;
    }
  }, [newSuggestionModal]);

  const handleSubmit = async () => {
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

      console.log(newSuggestion);
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
    console.log(newSuggestion);
  };

  const disabled =
    isLoading || newSuggestion.suggestion === "" || newSuggestion.title === "";

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
          <div className="formGroup">
            <Checkbox
              name="isAnonymous"
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
              loading={isLoading}
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
