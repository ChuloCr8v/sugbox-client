import { Modal, message } from "antd";
import { FaBan, FaRegCheckCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import {
  useApproveSuggestionMutation,
  useGetSuggestionQuery,
  useRejectSuggestionMutation,
} from "../../redux/data/suggestions";
import ModalFooter from "./ModalFooter";

type Props = {
  statusAction: string;
  suggestionId: string;
  setOpenUpdateStatusModal: (arg: string) => void;
};

const UpdateStatusModal = (props: Props) => {
  const [approveSuggestion, { isLoading: approving }] =
    useApproveSuggestionMutation();
  const [rejectSuggestion, { isLoading: rejecting }] =
    useRejectSuggestionMutation();
  const { data: suggestion } = useGetSuggestionQuery(props.suggestionId);

  const { statusAction, suggestionId } = props;

  const handleUpdateStatus = async () => {
    const actionToTake =
      statusAction.toLowerCase() === "approve"
        ? approveSuggestion(suggestionId)
        : rejectSuggestion(suggestionId);
    try {
      await actionToTake.unwrap();
      message.success(`Suggestion ${statusAction} Successfully`);
      props.setOpenUpdateStatusModal("");
    } catch (error) {
      console.log(error);
      message.error(`${statusAction} suggestion failed. Try Again`);
    }
  };

  const icon =
    statusAction.toLowerCase() === "reject" ? <FaBan /> : <FaRegCheckCircle />;

  return (
    <Modal
      title={`${statusAction} Suggestion`}
      open={statusAction !== ""}
      onCancel={() => props.setOpenUpdateStatusModal("")}
      footer={
        <ModalFooter
          okBtnStyle={twMerge(
            "bg-primaryred hover:bg-red-700",
            statusAction.toLowerCase() === "approve" &&
              "!bg-green-500 hover:bg-green-700"
          )}
          handleOk={handleUpdateStatus}
          onClose={() => props.setOpenUpdateStatusModal("")}
          loading={approving || rejecting}
          disabled={approving || rejecting}
          okText={statusAction}
        />
      }
    >
      <div className="pt-4 flex flex-col items-center justify-center gap-4">
        <div
          className={twMerge(
            "text-5xl flex items-center justify-center text-red-500 bg-primaryred !bg-opacity-10 rounded-full h-20 w-20",
            statusAction.toLowerCase() === "approve" &&
              "!bg-green-600 text-green-500"
          )}
        >
          {icon}
        </div>
        <div className="">
          {statusAction}{" "}
          <span
            className={twMerge(
              "text-primaryred font-semibold capitalize",
              statusAction.toLowerCase() === "approve" && "text-green-600"
            )}
          >
            {suggestion?.title}?
          </span>
          .
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStatusModal;
