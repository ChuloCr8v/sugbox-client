import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  LoginInput,
  useAdminLoginMutation,
  useEmployeeLoginMutation,
} from "../redux/api/auth";
import { setCredentials } from "../redux/data/auth";

export type loginRoleProps = { auth: { loginRole: String } };

const useLogin = () => {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [employeeLogin, { isLoading: employeeLoading }] =
    useEmployeeLoginMutation();

  const { loginRole } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminSignIn = async (values: LoginInput) => {
    try {
      const res = await adminLogin(values).unwrap();

      dispatch(setCredentials({ ...res }));
      message.success("Login Successful");
      navigate("/dashboard");
      window.location.reload();
    } catch (error: any) {
      message.error(error.data.message);
    }
  };

  const employeeSignIn = async (values: LoginInput) => {
    try {
      const res = await employeeLogin(values).unwrap();
      if (res.others.isDisabled) {
        message.error(
          "Your account is currently disabled, please contact your admin."
        );
        return;
      }

      const data = { ...res };
      console.log(data);
      dispatch(setCredentials(data));
      message.success("Login Successful");
      navigate("/dashboard");
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      error.originalStatus === 404 &&
        message.error(
          "Account does not exist, please contact your admin for account creation."
        );
      error.originalStatus === 401 && message.error("Wrong employee password.");
      message.error(error.data.message);
    }
  };

  return { isLoading, loginRole, adminSignIn, employeeSignIn, employeeLoading };
};

export default useLogin;
