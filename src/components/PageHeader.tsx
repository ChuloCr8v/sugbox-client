import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import { showNewEmployeeModal } from "../redux/modals";
import Button from "./Button";
import { usePopup } from "../context/PopupContext";
import SuggestionModal from "./modals/SuggestionModal";

interface Props {
  title: ReactNode;
  showActionButton?: boolean;
}

const PageHeader = (props: Props) => {
  const dispatch = useDispatch();

  const { openModal } = usePopup();

  const { isAdmin } = UseGetAuth();

  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="font-bold text-lg">{props.title}</h2>
      <div className="btns">
        {props.showActionButton && (
          <Button
            text="add employee"
            className={twMerge("text-white", !isAdmin && "hidden")}
            type={"primary"}
            disabled={false}
            onClick={() => dispatch(showNewEmployeeModal())}
          />
        )}
        <Button
          text={
            <p className="">
              <span className="hidden md:flex">New Suggestion</span>
              <FaPlus className="md:hidden" />
            </p>
          }
          type="primary"
          disabled={false}
          onClick={() => openModal(<SuggestionModal />)}
          className={twMerge(
            "text-white !bg-primary rounded md:rounded-md py-2 h-8",
            isAdmin && "hidden"
          )}
        />
      </div>
    </div>
  );
};

export default PageHeader;
