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

  const { id: userId, isAdmin } = UseGetAuth();

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
            "rounded border font-semibold flex items-center capitalize shadow-none !h-7",
            item.title === "approve" &&
              " border-green-600 text-green-600 hover:!border-green-800 hover:!text-green-800",
            item.title === "edit" &&
              "border-primaryblue hover:!border-hoverblue rounded text-primaryblue hover:!text-hoverblue ",
            item.title === "reject" &&
              " border-red-600 text-red-600 hover:!border-red-800 hover:!text-red-800",
            item.title === "delete" &&
              " border-primaryred text-primaryred hover:!text-red-800 group hover:!border-yellow-600",
            !verifyUser &&
              (item?.title === "delete" || item?.title === "edit") &&
              "hidden",
            isAdmin && item?.title === "delete" && "flex",
            !isAdmin &&
              (item?.title === "approve" || item?.title === "reject") &&
              "hidden",
            item.title.toLowerCase() === "approve" &&
              suggestion?.status === "approved" &&
              "hidden",
            item.title.toLowerCase() === "reject" &&
              suggestion?.status === "rejected" &&
              "hidden",
            (item.title.toLowerCase() === "delete" ||
              item.title.toLowerCase() === "edit") &&
              suggestion?.status === "approved" &&
              "hidden"
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
