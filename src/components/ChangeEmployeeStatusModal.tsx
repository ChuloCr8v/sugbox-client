import { Modal, Spin, message } from "antd";
import ModalFooter from "./modals/ModalFooter";
import { FaBan } from "react-icons/fa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../redux/data/employees";

type Props = {
  open: boolean;
  id: string;
  setUpdateEmployeeStatus: Dispatch<
    SetStateAction<{ open: boolean; id: string }>
  >;
};

const ChangeEmployeeStatusModal = (props: Props) => {
  const { data: employee, isLoading } = useGetEmployeeQuery(props.id);
  const [employeeData, setEmployeeData] = useState<any>([]);

  useEffect(() => {
    setEmployeeData(employee);
  }, [props.id]);

  const [editEmployee, { isLoading: editingEmployee }] =
    useEditEmployeeMutation();

  const updateAction = employee?.isDisabled ? "Activate" : "Deactivate";

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <Spin />
      </div>
    );
  }
  const handleUpdateEmployeeStatus = async () => {
    const updatedEmployeeData = {
      ...employeeData,
      isDisabled: !employeeData?.isDisabled,
    };

    setEmployeeData(updatedEmployeeData);

    try {
      await editEmployee(updatedEmployeeData).unwrap();
      message.success("Successful.");
      props.setUpdateEmployeeStatus((prev) => ({
        ...prev,
        open: false,
        id: "",
      }));
    } catch (error) {
      console.log(error);
      message.error("Edit employee status failed, try again.");
    }
  };

  return (
    <Modal
      title={updateAction + " " + "Employee"}
      open={props.open}
      footer={
        <ModalFooter
          handleOk={handleUpdateEmployeeStatus}
          loading={editingEmployee}
          onClose={() =>
            props.setUpdateEmployeeStatus((prev) => ({
              ...prev,
              open: false,
              id: "",
            }))
          }
          okText={updateAction}
          disabled={editingEmployee}
        />
      }
    >
      <div className="flex flex-col items-center justify-center gap-4 pt-6">
        <FaBan className="text-red-600 text-5xl" />
        <p className="text-lg">
          {updateAction} {employee?.firstName + " " + employee?.lastName}?
        </p>
      </div>
    </Modal>
  );
};

export default ChangeEmployeeStatusModal;
