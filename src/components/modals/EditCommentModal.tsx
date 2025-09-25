import { Modal, message } from "antd";
import { useEffect, useState } from "react";
import ModalFooter from "./ModalFooter";
import {
  useEditCommentMutation,
  useGetCommentQuery,
} from "../../redux/data/Comments";
import TextArea from "antd/es/input/TextArea";

type Props = {
  openEditCommentModal: boolean | undefined;
  setOpenEditCommentModal(arg0: boolean): void;
  commentId: string;
};

const EditCommentModal = (props: Props) => {
  const { data: comment } = useGetCommentQuery(props.commentId);
  const [editComment, { isLoading: editCommentLoading }] =
    useEditCommentMutation();
  const [formData, setFormData] = useState(comment);

  const handleUpdateComment = async () => {
    try {
      const res = await editComment({
        id: comment?._id,
        comment: formData.comment,
      }).unwrap();
      message.success("Comment edited successfully.");
      props.setOpenEditCommentModal(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      message.error("Failed to update comment. Try again.");
    }
  };

  useEffect(() => {
    setFormData(comment); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  return (
    <Modal
      title={"Edit Comment"}
      open={props.openEditCommentModal}
      onCancel={() => props.setOpenEditCommentModal(false)}
      footer={
        <ModalFooter
          handleOk={handleUpdateComment}
          onClose={() => props.setOpenEditCommentModal(false)}
          loading={editCommentLoading}
          okText={"Submit"}
          disabled={
            formData?.comment === "" ||
            formData?.comment === comment?.comment ||
            editCommentLoading
          }
        />
      }
    >
      <div className="grid gap-2 pt-2">
        <p className="text-gray-500 text-base">{"Comment"} </p>
        <TextArea name={"comment"} />
      </div>
    </Modal>
  );
};

export default EditCommentModal;
