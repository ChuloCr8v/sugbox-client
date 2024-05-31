import { createSlice } from "@reduxjs/toolkit";
import { AUTH_STORAGE_KEY, TOKEN_STORAGE_KEY } from "../..";

const auth = createSlice({
  name: "auth",
  initialState: {
    user:
      localStorage.getItem(AUTH_STORAGE_KEY) &&
      localStorage.getItem(AUTH_STORAGE_KEY) !== undefined
        ? JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "")
        : null,
    token:
      localStorage.getItem(TOKEN_STORAGE_KEY) &&
      localStorage.getItem(TOKEN_STORAGE_KEY) !== undefined
        ? JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) || "")
        : null,
  },

  reducers: {
    setCredentials: (state, action) => {
      const { others: user, token: access_token } = action.payload;
      console.log(user, access_token);

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(access_token));
      state.user = user;
      state.token = access_token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = auth.actions;

export default auth.reducer;

export const selectCurrentAuthUser = (state: { auth: { user: object } }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: { token: string } }) =>
  state.auth.token;
