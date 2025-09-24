import { createSlice } from "@reduxjs/toolkit";


export enum LoginRole {
  EMPLOYEE = "EMPLOYEE",
  ADMIN = "ADMIN"
}
const initialState = {
  slideIndex: 0,
  authIndex: 0,
  loginRole: ""
};
export const setAuthSlide = createSlice({
  name: "authSlideIndex",
  initialState,
  reducers: {
    setSlideIndex: (state, action) => {
      state.slideIndex = action.payload;
    },
    setAuthIndex: (state, action) => {
      state.authIndex = action.payload;
    },
    setLoginRole: (state, action) => {
      state.loginRole = action.payload;
    },
  },
});

export const { setSlideIndex, setAuthIndex, setLoginRole } =
  setAuthSlide.actions;
export default setAuthSlide.reducer;
