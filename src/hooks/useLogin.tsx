import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminLoginMutation,
  useEmployeeLoginMutation,
} from "../redux/api/auth";
import { setCredentials } from "../redux/data/auth";

type Props = {
  email: string;
  password: string;
};

export type loginRoleProps = { auth: { loginRole: String } };

const useLogin = () => {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [employeeLogin, { isLoading: employeeLoading }] =
    useEmployeeLoginMutation();

  const loading = isLoading || employeeLoading;

  const { loginRole } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminSignin = async (values: Props) => {
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

  const employeeSignin = async (values: Props) => {
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
    }
  };

  const login = async (values: Props) => {
    try {
      if (loginRole === "organization") {
        adminSignin(values);
      } else {
        employeeSignin(values);
      }
    } catch (error) {
      message.error("Error, try again");
      console.log(error);
    }
  };

  return { login, loading };
};

export default useLogin;
