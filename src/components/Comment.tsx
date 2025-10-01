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
import Icon from "./global/Icon";
import { Calendar01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import useGetAvatar from "../hooks/useGetAvatar";

const Comment = (props: { data: commentsProps }) => {
  const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
  const { id } = UseGetAuth();
  const verifyCommentOwnership = id === props.data?.userId;
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();
  const { data: commenter } = useGetEmployeeQuery(props.data.userId);

  console.log(commenter);
  const { avatar } = useGetAvatar(commenter._id);

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
    <div
      className="border-t first-of-type:border-t-0 [1.5px] pt-4"
      id={props.data._id}
    >
      <div className="flex items-start flex-col gap-4">
        <p className="text-xs text-gray-200">
          <div className="flex items-center gap-3">
            <div className="">{avatar("!h-8 !w-8 !rounded-full !text-sm")}</div>
            <div className="">
              <p className="text-sm">
                {`${commenter?.firstName} ${commenter?.lastName}`}
              </p>
              <div className="flex items-center gap-2 *:!text-xs">
                <div className="flex items-center gap-1">
                  <Icon icon={Calendar01Icon} />{" "}
                  <p className=" text-gray-400">
                    {dateFormatter(props.data.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2 items-center text-gray-400">
                  <Icon icon={Clock01Icon} />{" "}
                  <p className="">
                    {dayjs(props.data.createdAt).format("hh:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </p>
        <div className="flex flex-col items-start gap-3 w-full">
          <p className="normal-case text-sm text-gray-200">
            {props.data.comment}
          </p>
          <div className="flex items-center gap-4 w-full">
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
