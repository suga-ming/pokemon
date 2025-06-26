import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { imageTypeReducer } from "./imageTypeSlice";

export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
