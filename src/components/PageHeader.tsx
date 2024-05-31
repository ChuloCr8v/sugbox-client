import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import { showNewEmployeeModal, showNewSuggestionModal } from "../redux/modals";
import Button from "./Button";

interface Props {
  title: ReactNode;
  showActionButton?: boolean;
}

const PageHeader = (props: Props) => {
  const dispatch = useDispatch();

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
          onClick={() => dispatch(showNewSuggestionModal())}
          className={twMerge(
            "text-white rounded md:rounded-md py-2 h-8",
            isAdmin && "hidden"
          )}
        />
      </div>
    </div>
  );
};

export default PageHeader;
