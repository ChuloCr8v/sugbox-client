import { Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideNewEmployeeModal } from "../redux/modals";
import { FormGroup } from "./SmallerComponents";
import ModalFooter from "./modals/ModalFooter";
import useAddEmployee from "../hooks/useAddEmployee";

type newEmployeeFormInput = {
  firstName: string;
  adminRole: string;
  lastName: string;
  email: string;
};

type newEmployeeModalState = {
  modals: {
    newEmployeeModal: boolean;
  };
};

export const newEmployeeInputValues = {
  firstName: "",
  adminRole: "staff",
  lastName: "",
  email: "",
};

const NewEmployeeModal = () => {
  const { newEmployeeModal } = useSelector(
    (state: newEmployeeModalState) => state.modals
  );
  const [formData, setFormData] = useState<newEmployeeFormInput>(
    newEmployeeInputValues
  );

  const { addEmployee, addingEmployee } = useAddEmployee();

  const dispatch = useDispatch();

  const newEmployeeFormItems = [
    {
      label: "First Name",
      placeholder: "Employee first name",
      required: true,
      type: "text",
      name: "firstName",
      value: formData.firstName,
    },
    {
      label: "Last Name",
      placeholder: "Employee last name",
      required: true,
      type: "text",
      name: "lastName",
      value: formData.lastName,
    },
    {
      label: "Email",
      placeholder: "Employee email",
      required: true,
      type: "email",
      name: "email",
      value: formData.email,
    },
    {
      label: "Role",
      placeholder: "Select role",
      required: false,
      type: "select",
      name: "isModerator",
      value: formData.adminRole,
      options: [
        { value: "staff", label: "Staff" },
        { value: "moderator", label: "Moderator" },
      ],
    },
  ];

  const handleInputChange = (name: string, value: string) => {
    if (name === "isModerator") {
      setFormData((prev) => ({
        ...prev,
        isModerator: value === "moderator" ? true : false,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(formData);
  };

  const onClose = () => {
    dispatch(hideNewEmployeeModal());
    setFormData(newEmployeeInputValues);
  };

  const verifyInputFields = () => {
    return Object.values(formData).some((value) => value === "");
  };

  return (
    <>
      <Modal
        title={"Add Employee"}
        open={newEmployeeModal}
        onCancel={onClose}
        footer={
          <ModalFooter
            handleOk={() => addEmployee(formData)}
            onClose={onClose}
            loading={addingEmployee || verifyInputFields()}
            okText={"Submit"}
            disabled={verifyInputFields()}
          />
        }
      >
        <form action="" className="grid md:grid-cols-2 items-start gap-4 pt-6">
          {newEmployeeFormItems.map((item, index) => (
            <FormGroup
              onInputChange={(e) =>
                handleInputChange(item.name, e.target.value)
              }
              required={item.required}
              label={item.label}
              inputType={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={item.value}
              key={index}
              labelClassName="text-textcolor text-sm"
              options={item.options?.map((o) => ({
                label: o.label,
                value: o.value,
              }))}
              defaultValue={item.value}
              selectOnchange={(value) => handleInputChange(item.name, value)}
            />
          ))}
        </form>
      </Modal>
    </>
  );
};

export default NewEmployeeModal;
