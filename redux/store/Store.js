import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import docReducer from "../features/DocsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    docs: docReducer,
  },
});