import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEmployeeSignupMutation } from "../redux/api/auth";
import useGetAuth from "./useGetAuth";
import { useDispatch } from "react-redux";
import { hideNewEmployeeModal } from "../redux/modals";

const useAddEmployee = () => {
  const [employeeSignUp, { isLoading: addingEmployee }] =
    useEmployeeSignupMutation();
  const { id } = useGetAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addEmployee = async (formData: {}) => {
    try {
      await employeeSignUp({ id, formData }).unwrap();
      message.success("Employee added successfully");
      navigate("/employees");
      dispatch(hideNewEmployeeModal());
    } catch (error) {
      console.log(error);
      message.success("Oops, an error occured, please try again.");
    }
  };

  return { addEmployee, addingEmployee };
};

export default useAddEmployee;
