import { configureStore } from "@reduxjs/toolkit";
import data from "./slices/data";

export const store = configureStore({
  reducer: {
    data,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/types";
export * from "./slices/data";
export * from "./thunks/getCrypto";
export * from "./thunks/getHistory";
