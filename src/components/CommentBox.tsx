import TextArea from "antd/es/input/TextArea";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { hideNewCommentModal } from "../redux/modals";
import Button from "./Button";
import CardWrapper from "./global/CardWrapper";

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
        <CardWrapper className={twMerge("flex-col items-end gap-3")}>
          <TextArea
            rows={2}
            placeholder={props.placeholder}
            onChange={props.onchange}
            value={props.comment}
            className="border-gray-600 !bg-transparent p-2 rounded-lg"
          />
          <div className="flex items-center gap-3">
            <Button
              className={
                "bg-transparent border-gray-600 border hover:bg-red-600 text-white w-[120px]"
              }
              text={"Cancel"}
              disabled={props.addCommentLoading}
              loading={props.addCommentLoading}
              onClick={() => {
                props.setComment("");
                dispatch(hideNewCommentModal());
              }}
            />{" "}
            <Button
              className={"w-[120px] bg-primary text-white"}
              text={"Submit"}
              disabled={props.comment === "" || props.addCommentLoading}
              onClick={props.handleBtnClick}
              loading={props.addCommentLoading}
            />
          </div>
        </CardWrapper>
      )}
    </>
  );
};

export default CommentBox;
