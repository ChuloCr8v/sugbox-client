import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import ModalFooter from "./ModalFooter";

type Props = {
  previewAttachment: boolean | undefined;
  src: string | undefined;
  suggestionTitle: string | undefined;
  setPreviewAttachment: Dispatch<
    SetStateAction<{ isOpen: boolean; src: string }>
  >;
};

const AttachmentPreview = (props: Props) => {
  return (
    <Modal
      footer={
        <ModalFooter
          handleOk={() => console.log("hii")}
          onClose={() => {
            props.setPreviewAttachment({ src: "", isOpen: false });
          }}
          loading={false}
          okText={"Dpwnload"}
          disabled={false}
        />
      }
      okText={"Download"}
      open={props.previewAttachment}
      onCancel={() => {
        props.setPreviewAttachment({ src: "", isOpen: false });
      }}
    >
      <img src={props.src} alt={props.suggestionTitle} className="" />
    </Modal>
  );
};

export default AttachmentPreview;
