import { createSlice } from "@reduxjs/toolkit";

export enum ModalType {
  "NEW_EMPLOYEE" = "NEW_EMPLOYEE",
  "NEW_SUGGESTION" = "NEW_SUGGESTION",
  "NEW_COMMENT" = "NEW_COMMENT",
  "EDIT_SUGGESTION" = "EDIT_SUGGESTION",
  "SEND_EMAIL" = "SEND_EMAIL",
  "ADD_MODERATOR" = "ADD_MODERATOR",
}

const initialState = {
  modalIsOpen: "",
};
export const customModalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalIsOpen = action.payload.open;
    },
    hideModal: (state) => {
      state.modalIsOpen = "";
    },
  },
});

export const {} = customModalSlice.actions;
export default customModalSlice.reducer;
