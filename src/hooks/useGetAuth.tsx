import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from "..";

const UseGetAuth = () => {
  const getUser = localStorage.getItem(AUTH_STORAGE_KEY);
  const user = getUser && JSON.parse(getUser);
  const getToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  const token = getToken && JSON.parse(getToken);

  const id = user?._id;
  const isAdmin = user?.isAdmin;

  return { token, user, id, isAdmin };
};

export default UseGetAuth;
