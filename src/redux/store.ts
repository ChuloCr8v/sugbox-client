import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api/base";
import sideBar from "./sideBar";
import modals from "./modals";
import editCompany from "./editCompany";
import authReducer from "./data/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    sideBar: sideBar,
    modals: modals,
    editCompanyModal: editCompany,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
