import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkConfig } from "../../../../app/providers/StoreProvider";
import { Comment } from "../types/comment";
import { API_URL } from "../../../../shared/const/variables";

export const updateComment = createAsyncThunk<
  Comment,
  Comment,
  ThunkConfig<string>
>("comments/updateComment", async (updatedComment, { rejectWithValue }) => {
  const { id: commentId } = updatedComment;
  try {
    const response = await axios.put<Comment>(
      `${API_URL}/comments/${commentId}`,
      updatedComment
    );
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
