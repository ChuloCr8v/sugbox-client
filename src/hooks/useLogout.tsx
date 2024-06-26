import { useNavigate } from "react-router-dom";
import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from "..";
import { useLogoutMutation } from "../redux/api/auth";

const useLogout = () => {
  const [logOut] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/");
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.location.reload();
  };

  return { handleLogOut };
};

export default useLogout;
