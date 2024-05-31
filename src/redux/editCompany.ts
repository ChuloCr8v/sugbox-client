import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editCompanyModal: false,
};
export const editCompanyModalSlice = createSlice({
  name: "editCompanyModal",
  initialState,
  reducers: {
    showEditCompanyModal: (state) => {
      state.editCompanyModal = true;
    },
    hideEditCompanyModal: (state) => {
      state.editCompanyModal = false;
    },
  },
});

export const { showEditCompanyModal, hideEditCompanyModal } =
  editCompanyModalSlice.actions;
export default editCompanyModalSlice.reducer;
