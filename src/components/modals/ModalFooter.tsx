import { twMerge } from "tailwind-merge";
import Button from "../Button";

interface modalFooterProps {
  okBtnStyle?: string;
  handleOk: (arg0: {}) => void;
  onClose: (arg0: {}) => void;
  loading: boolean;
  okText: string;
  disabled: boolean;
}

const ModalFooter = (props: modalFooterProps) => {
  return (
    <div className="place-self-end flex items-center justify-end gap-4 w-full pb-4 mt-8">
      <Button
        text={"Cancel"}
        className={
          "place-self-end text-center border border-gray-400 text-gray-400 capitalize h-8 w-[144px] hover:border-hoverblue hover:text-hoverblue"
        }
        disabled={false}
        onClick={props.onClose}
      />
      <Button
        loading={props.loading}
        text={props.okText}
        className={twMerge(
          "place-self-end text-center bg-primaryblue text-white capitalize h-8 w-[144px] hover:bg-hoverblue",
          props.okBtnStyle
        )}
        disabled={props.disabled}
        onClick={props.handleOk}
      />
    </div>
  );
};

export default ModalFooter;
