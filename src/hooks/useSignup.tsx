import { message } from "antd";
import { useAdminSignupMutation } from "../redux/api/auth";
import { useNavigate } from "react-router-dom";

interface signupProps {
  companyName: string;
}

const useSignup = () => {
  const [signup, { isLoading }] = useAdminSignupMutation();

  const navigate = useNavigate();

  const adminSignup = async (signupData: signupProps) => {
    try {
      await signup(signupData).unwrap();
      message.success("Signup Successful");
      navigate("/login-redirect");
    } catch (error: any) {
      console.log(error);
      message.error(error.data);
    }
  };

  return { adminSignup, isLoading };
};

export default useSignup;
