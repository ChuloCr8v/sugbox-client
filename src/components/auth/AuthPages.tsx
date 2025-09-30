import ForgotPassword from "../../pages/ForgotPassword";
import SignIn from "../../pages/login";
import LoginPageRedirect from "../../pages/LoginPageRedirect";
import Signup from "../../pages/signup";
import { useAppSelector } from "../../redux/store";

const AuthPages = () => {
  const { authIndex } = useAppSelector((state) => state.authSlide);

  const renderPages = () => {
    switch (authIndex) {
      case 0:
        return <SignIn />;
      case 1:
        return <Signup />;
      case 2:
        return <LoginPageRedirect />;
      case 3:
        return <ForgotPassword />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {renderPages()}
    </div>
  );
};

export default AuthPages;
