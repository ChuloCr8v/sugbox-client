import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEmployeeSignupMutation } from "../redux/api/auth";
import { hideNewEmployeeModal } from "../redux/modals";
import useGetAuth from "./useGetAuth";

const useAddEmployee = () => {
  const [employeeSignUp, { isLoading: addingEmployee }] =
    useEmployeeSignupMutation();
  const { id } = useGetAuth();

  const dispatch = useDispatch();

  const addEmployee = async (formData: {}) => {
    try {
      await employeeSignUp({ id, formData }).unwrap();
      message.success("Employee added successfully");
      dispatch(hideNewEmployeeModal());
    } catch (error: any) {
      console.log(error);
      message.error(error.data);
    }
  };

  return { addEmployee, addingEmployee };
};

export default useAddEmployee;
