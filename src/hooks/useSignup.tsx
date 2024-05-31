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
      message.success("Successful");
      navigate("/login-redirect");
    } catch (error) {
      console.log(error);
      message.success("Oops, an error occured, please try again.");
    }
  };

  return { adminSignup, isLoading };
};

export default useSignup;
