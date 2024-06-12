import { Button, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import UseGetAuth from "../hooks/useGetAuth";
import { useDeleteCommentMutation } from "../redux/data/Comments";
import { useGetEmployeeQuery } from "../redux/data/employees";
import { commentsProps } from "../types";
import { dateFormatter } from "../utils.ts/dateFormatter";
import DeleteItemModal from "./modals/DeleteItemModal";
import EditCommentModal from "./modals/EditCommentModal";

const Comment = (props: { data: commentsProps }) => {
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
  const { id } = UseGetAuth();
  const verifyCommentOwnership = id === props.data?.userId;
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();
  const { data: commenter } = useGetEmployeeQuery(props.data.userId);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(props.data._id).unwrap();
      message.success("Comment deleted successfully");
      setOpenDeleteItemModal(false);
    } catch (error) {
      message.error("Delete comment failed, try again!");
      console.log(error);
    }
  };

  return (
    <div className="border-b-[1.5px] py-4" id={props.data._id}>
      <div className="flex items-start flex-col gap-3">
        <p className="text-[14px] font-bold text-primaryblue">
          {props.data?.isAdmin ? (
            <span className="flex items-center gap-1 text-yellow-600">
              {" "}
              Admin
            </span>
          ) : (
            `${commenter?.firstName} ${commenter?.lastName}`
          )}
        </p>
        <div className="flex flex-col items-start gap-3 w-full">
          <p className="normal-case">{props.data.comment}</p>
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 items-center font-bold text-gray-500">
              <p className="text-[12px]">
                {dateFormatter(props.data.createdAt)}
              </p>
              <p className="text-[12px]">
                {dayjs(props.data.createdAt).format("hh.mm.ss")}
              </p>
            </div>
            {verifyCommentOwnership && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  disabled={deleteCommentLoading}
                  loading={deleteCommentLoading}
                  onClick={() => setOpenDeleteItemModal(true)}
                  className="text-red-600 border-red-600 text-sm h-6 w-fit flex items-center justify-center"
                >
                  Delete
                </Button>

                <Button
                  disabled={deleteCommentLoading}
                  loading={deleteCommentLoading}
                  onClick={() => setOpenEditCommentModal(true)}
                  className="text-primaryblue border-primaryblue h-6 w-fit flex items-center justify-center text-sm"
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
          <DeleteItemModal
            openDeleteItemModal={openDeleteItemModal}
            isLoading={deleteCommentLoading}
            disabled={deleteCommentLoading}
            okText={"Delete"}
            closeDeleteItemModal={() => setOpenDeleteItemModal(false)}
            handleDeleteItemOk={handleDeleteComment}
            itemTitle={props.data.comment}
            modalTitle={"Delete Comment"}
          />
          <EditCommentModal
            commentId={props.data._id}
            openEditCommentModal={openEditCommentModal}
            setOpenEditCommentModal={setOpenEditCommentModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
