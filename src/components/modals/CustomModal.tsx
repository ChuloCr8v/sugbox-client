import { Button, Modal } from "antd";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { ModalType } from "../../redux/customModalSlice";
import { useAppSelector } from "../../redux/store";

type Props = {
  children: ReactNode;
  cancelText?: string;
  okText?: string;
  okButtonClassName?: string;
  cancelButtonClassName?: string;
  isOpen: boolean;
};

const CustomModal = (props: Props) => {
  const { modalIsOpen } = useAppSelector((state) => state.customModal);

  const title = () => {
    switch (modalIsOpen) {
      case ModalType.ADD_MODERATOR:
        return "Add Moderator";
    }
  };
  return (
    <Modal title={title} open={props.isOpen} footer={false}>
      <div className="">{props.children}</div>

      <div className="flex items-center justify-center gap-4">
        <Button className={twMerge("w-[134px]", props.cancelButtonClassName)}>
          {props.cancelText ?? "Cancel"}
        </Button>
        <Button className={twMerge("w-[134px]", props.okButtonClassName)}>
          {props.okText ?? "Ok"}
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
