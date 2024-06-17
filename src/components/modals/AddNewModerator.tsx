import { Checkbox, Dropdown, Modal, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeAddModeratorModal } from "../../redux/modals";
import useGetEmployees from "../../hooks/useGetEmployees";
import { Key, useState } from "react";
import { FaBan, FaChevronDown } from "react-icons/fa";
import { employeeType } from "../../types";
import { useUpdateEmployeeRoleMutation } from "../../redux/data/employees";
import SpinLoading from "../SpinLoading";

const AddNewModerator = () => {
  const { employees, isLoading: loadingEmployees } = useGetEmployees();
  const [updateEmployeeRole, { isLoading: updatingRole }] =
    useUpdateEmployeeRoleMutation();
  const [selectedEmployees, setSelectedEmployees] = useState<any>([]);

  const { addModeratorModal } = useSelector(
    (state: { modals: { addModeratorModal: boolean } }) => state.modals
  );

  const dispatch = useDispatch();

  const nonModerators = employees?.filter(
    (employee: { isModerator: boolean }) => employee?.isModerator === false
  );

  const handleSelectEmployee = (item: { _id: string }) => {
    setSelectedEmployees((prev: any) => {
      const isSelected = prev.some((p: { _id: string }) => p._id === item._id);
      if (isSelected) {
        return prev.filter(
          (prevItem: employeeType) => prevItem._id !== item._id
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const items = [
    {
      label: nonModerators?.map(
        (item: { firstName: string; lastName: string; _id: string }) => (
          <div key={item._id} className="flex items-center gap-2">
            <Checkbox
              checked={selectedEmployees.some(
                (i: { _id: string }) => i._id === item._id
              )}
              onChange={() => handleSelectEmployee(item)}
              className="!border-gray-500"
            />
            {item.firstName + " " + item.lastName}
          </div>
        )
      ),
      key: "index",
    },
  ];

  const handleAddModerators = async () => {
    try {
      for (let index = 0; index < selectedEmployees.length; index++) {
        await updateEmployeeRole(selectedEmployees[index]._id).unwrap();
      }
      message.success("Moderators Added successfully");
      setSelectedEmployees([]);
      dispatch(closeAddModeratorModal());
    } catch (error) {
      console.log(error);
      message.error("Unable to add Moderators, Please try again.");
    }
  };

  const handleRemoveEmployee = (id: String) => {
    const updatedList = selectedEmployees.filter(
      (item: employeeType) => item._id !== id
    );
    setSelectedEmployees(updatedList);
  };

  if (loadingEmployees) {
    return <SpinLoading />;
  }

  return (
    <Modal
      okButtonProps={{
        loading: updatingRole,
        className: "bg-primaryblue hover:bg-hoverblue hover:text-white",
        disabled: selectedEmployees?.length < 1,
      }}
      open={addModeratorModal}
      onCancel={() => dispatch(closeAddModeratorModal())}
      title={"Add Moderator(s)"}
      onOk={handleAddModerators}
      okText={"Submit"}
    >
      <div className="my-6">
        <Dropdown menu={{ items }}>
          <a
            href=""
            onClick={(e) => e.preventDefault()}
            className="w-full flex justify-between items-center border border-gray-400 hover:border-primaryblue duration-100 rounded !h-8 px-3"
          >
            Select Moderators
            <FaChevronDown className="text-gray-400" />
          </a>
        </Dropdown>
      </div>
      {selectedEmployees.length ? (
        <div className="grid gap-2 mt-4">
          {selectedEmployees?.map((employee: employeeType, index: Key) => (
            <div
              className="flex items-center justify-between text-primaryblue border border-primaryblue py-1 px-2 rounded"
              key={index}
            >
              <p className="font-semibold">
                {employee?.firstName + " " + employee?.lastName}
              </p>
              <FaBan
                onClick={() => handleRemoveEmployee(employee._id)}
                className="text-red-500 hover:text-red-400 duration-150 cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </Modal>
  );
};

export default AddNewModerator;
