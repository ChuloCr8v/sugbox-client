import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountModal: false,
  signinModal: false,
  newEmployeeModal: false,
  newSuggestionModal: false,
  newCommentModal: false,
  editSuggestionModal: "",
  sendEmailModal: { isOpen: false, id: "" },
  addModeratorModal: false,
};
export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showNewEmployeeModal: (state) => {
      state.newEmployeeModal = true;
    },
    hideNewEmployeeModal: (state) => {
      state.newEmployeeModal = false;
    },
    showNewSuggestionModal: (state) => {
      state.newSuggestionModal = true;
    },
    hideNewSuggestionModal: (state) => {
      state.newSuggestionModal = false;
    },
    showNewCommentModal: (state) => {
      state.newCommentModal = true;
    },
    hideNewCommentModal: (state) => {
      state.newCommentModal = false;
    },
    showEditSuggestionModal: (state, action) => {
      state.editSuggestionModal = action.payload;
    },
    hideEditSuggestionModal: (state) => {
      state.editSuggestionModal = "";
    },
    openSendEmailModal: (state, action) => {
      state.sendEmailModal.isOpen = true;
      state.sendEmailModal.id = action.payload;
    },
    closeSendEmailModal: (state) => {
      state.sendEmailModal.isOpen = false;
      state.sendEmailModal.id = "";
    },
    openAddModeratorModal: (state) => {
      state.addModeratorModal = true;
    },
    closeAddModeratorModal: (state) => {
      state.addModeratorModal = false;
    },
  },
});

export const {
  showNewEmployeeModal,
  hideNewEmployeeModal,
  showNewSuggestionModal,
  hideNewSuggestionModal,
  showNewCommentModal,
  hideNewCommentModal,
  showEditSuggestionModal,
  hideEditSuggestionModal,
  openSendEmailModal,
  closeSendEmailModal,
  openAddModeratorModal,
  closeAddModeratorModal,
} = modalSlice.actions;
export default modalSlice.reducer;
