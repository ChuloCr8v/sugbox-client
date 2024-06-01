import { Button, Dropdown } from "antd";
import { useState } from "react";
import {
  FaBan,
  FaChevronDown,
  FaRegCheckCircle,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import UseGetAuth from "../hooks/useGetAuth";
import { useGetSuggestionQuery } from "../redux/data/suggestions";
import { showEditSuggestionModal } from "../redux/modals";
import UpdateStatusModal from "./modals/UpdateStatusModal";

interface Props {
  id: string;
  setOpenDeleteItemModal: (arg: boolean) => void;
}

const SuggestionActionButtons = (props: Props) => {
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState("");
  const { data: suggestion } = useGetSuggestionQuery(props.id);

  const { id: userId, isAdmin } = UseGetAuth();

  const verifyUser = userId === suggestion?.userId;

  const items = [
    {
      key: 1,
      label: "Edit",
      icon: <FaRegEdit />,
      onClick: () => dispatch(showEditSuggestionModal(id)),
    },
    {
      key: 2,
      label: <button className="">Approve</button>,
      icon: <FaRegCheckCircle />,
      onClick: () => setOpenUpdateStatusModal("Approve"),
    },
    {
      key: 3,
      label: <button className="">Reject</button>,
      icon: <FaBan />,
      onClick: () => setOpenUpdateStatusModal("Reject"),
    },
    {
      key: 3,
      label: <button className="">Delete</button>,
      icon: <FaTrashAlt />,
      onClick: () => props.setOpenDeleteItemModal(true),
    },
  ];

  const id = props.id;
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Dropdown menu={{ items }} className="cursor-pointer">
        <a
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-between gap-2 rounded bg-gray-200 text-gray-500 px-2 py-1"
        >
          Actions
          <FaChevronDown className="h-3 mt-1" />
        </a>
      </Dropdown>

      <UpdateStatusModal
        suggestionId={props.id}
        statusAction={openUpdateStatusModal}
        setOpenUpdateStatusModal={setOpenUpdateStatusModal}
      />
    </div>
  );
};

export default SuggestionActionButtons;
