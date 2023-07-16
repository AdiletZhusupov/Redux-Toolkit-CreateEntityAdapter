import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "../types/StateSchema";
import { commentsReducer } from "../../../../entities/Comment/";

export const store = configureStore<StateSchema>({
  reducer: {
    comments: commentsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
