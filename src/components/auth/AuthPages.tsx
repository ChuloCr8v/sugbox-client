import SignIn from "../../pages/login";
import LoginPageRedirect from "../../pages/LoginPageRedirect";
import Signup from "../../pages/signup";
import { useAppSelector } from "../../redux/store";

const AuthPages = () => {
  const { authIndex } = useAppSelector((state) => state.authSlide);

  console.log(authIndex);

  const renderPages = () => {
    switch (authIndex) {
      case 0:
        return <SignIn />;
      case 1:
        return <Signup />;
      case 2:
        return <LoginPageRedirect />;
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
