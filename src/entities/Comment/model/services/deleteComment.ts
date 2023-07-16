import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "../../../../app/providers/StoreProvider";
import { Comment } from "../types/comment";
import { API_URL } from "../../../../shared/const/variables";

export const deleteComment = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>("comments/deleteComment", async (commentId, { rejectWithValue }) => {
  try {
    const response = await axios.delete<Comment>(
      `${API_URL}/comments/${commentId}`
    );
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
