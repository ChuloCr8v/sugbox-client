import TextArea from "antd/es/input/TextArea";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { hideNewCommentModal } from "../redux/modals";
import Button from "./Button";

type Props = {
  handleBtnClick: () => void;
  placeholder: string;
  comment: string;
  onchange: ChangeEventHandler<HTMLTextAreaElement>;
  setComment: Dispatch<SetStateAction<string>>;
  addCommentLoading: boolean;
};

const CommentBox = (props: Props) => {
  const { newCommentModal } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();

  // console.log(addCommentLoading);

  return (
    <>
      {newCommentModal && (
        <div
          className={twMerge(
            "flex flex-col w-full items-end gap-4 bg-white  overflow-hidden duration-150"
          )}
        >
          <TextArea
            rows={2}
            placeholder={props.placeholder}
            onChange={props.onchange}
            value={props.comment}
            className="border-gray-200 p-2"
          />
          <div className="flex items-center gap-4">
            <Button
              className={"bg-primaryred hover:bg-red-600 text-white "}
              text={"Cancel"}
              disabled={props.addCommentLoading}
              loading={props.addCommentLoading}
              onClick={() => {
                props.setComment("");
                dispatch(hideNewCommentModal());
              }}
            />{" "}
            <Button
              className={"bg-primaryblue text-white hover:bg-blue-600 "}
              text={"Submit"}
              disabled={props.comment === "" || props.addCommentLoading}
              onClick={props.handleBtnClick}
              loading={props.addCommentLoading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CommentBox;
