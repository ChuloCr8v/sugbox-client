import { Button } from "antd";
import { useState } from "react";
import { FaBan, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { showEditSuggestionModal } from "../redux/modals";
import UpdateStatusModal from "./modals/UpdateStatusModal";
import { useGetSuggestionQuery } from "../redux/data/suggestions";
import UseGetAuth from "../hooks/useGetAuth";

interface Props {
  id: string;
  setOpenDeleteItemModal: (arg: boolean) => void;
}

const SuggestionActionButtons = (props: Props) => {
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState("");
  const { data: suggestion } = useGetSuggestionQuery(props.id);

  const { id: userId, isAdmin, isModerator } = UseGetAuth();

  const btns = [
    {
      title: "edit",
      icon: <FaRegCheckCircle className="" />,
    },
    {
      title: "approve",
      icon: <FaRegCheckCircle className="" />,
    },
    {
      title: "reject",
      icon: <FaBan />,
    },
    {
      title: "delete",
      icon: <FaTrashAlt />,
    },
  ];

  const id = props.id;
  const dispatch = useDispatch();

  const verifyUser = userId === suggestion?.userId;

  const canEdit = (item: string) => {
    return verifyUser && item === "edit" && "flex";
  };

  const canDelete = (item: string) => {
    return (verifyUser || isAdmin) && item === "delete" && "flex";
  };

  const canApproveAndReject = (item: string) => {
    return (
      (isAdmin || isModerator) &&
      !verifyUser &&
      (item === "approve" || item === "reject") &&
      "flex"
    );
  };

  const handleBtnClick = async (action: string, id: string) => {
    switch (action) {
      case "edit":
        dispatch(showEditSuggestionModal(id));
        break;
      case "delete":
        props.setOpenDeleteItemModal(true);
        break;
      case "approve":
        setOpenUpdateStatusModal("Approve");
        break;
      case "reject":
        setOpenUpdateStatusModal("Reject");
        break;
    }
  };
  return (
    <div className="flex items-center gap-2">
      {btns.map((item) => (
        <Button
          key={item.title}
          onClick={() => handleBtnClick(item.title, id)}
          className={twMerge(
            "capitalize items-center hover:border-primaryblue text-textcolor hidden",
            canEdit(item.title),
            canDelete(item.title),
            canApproveAndReject(item.title)
          )}
          icon={item.icon}
        >
          {item.title}
        </Button>
      ))}

      <UpdateStatusModal
        suggestionId={props.id}
        statusAction={openUpdateStatusModal}
        setOpenUpdateStatusModal={setOpenUpdateStatusModal}
      />
    </div>
  );
};

export default SuggestionActionButtons;
