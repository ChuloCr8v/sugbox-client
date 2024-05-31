import { Modal } from "antd";
import ModalFooter from "./ModalFooter";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  openDeleteItemModal: boolean;
  isLoading: boolean;
  disabled: boolean;
  okText: string;
  closeDeleteItemModal: () => void;
  handleDeleteItemOk: () => void;
  itemTitle: string;
  modalTitle: string;
};

const DeleteItemModal = (props: Props) => {
  return (
    <Modal
      title={props.modalTitle}
      open={props.openDeleteItemModal}
      onCancel={props.closeDeleteItemModal}
      footer={
        <ModalFooter
          okBtnStyle={"bg-primaryred hover:bg-red-700"}
          handleOk={props.handleDeleteItemOk}
          onClose={props.closeDeleteItemModal}
          loading={props.isLoading}
          okText={props.okText}
          disabled={props.disabled}
        />
      }
    >
      <div className="pt-4 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center bg-primaryred bg-opacity-10 rounded-full h-20 w-20">
          <FaTrashAlt className="text-3xl text-primaryred " />
        </div>
        <div className="">
          Delete
          <span className="text-primaryred font-semibold capitalize">
            {" "}
            {props?.itemTitle}
          </span>
          . This action cannot be undone.
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItemModal;
