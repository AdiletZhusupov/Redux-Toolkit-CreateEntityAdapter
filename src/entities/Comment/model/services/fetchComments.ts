import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment, Reaction, Reply } from "../types/comment";
import axios from "axios";
import { ThunkConfig } from "../../../../app/providers/StoreProvider";
import { API_URL } from "../../../../shared/const/variables";

interface CombinedCommentsReactionsReplies {
  comments: Comment[];
  reactions?: Reaction[];
  replies?: Reply[];
}

export const fetchComments = createAsyncThunk<
  CombinedCommentsReactionsReplies,
  void,
  ThunkConfig<string>
>("comments/fetchComments", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Comment[]>(`${API_URL}/comments`);
    if (!response.data) {
      throw new Error();
    }
    const comments = response.data.map(({ id, body }) => ({ id, body }));

    const reactions = response.data.reduce(
      (accumulator: Reaction[] | undefined, comment) => {
        if (comment.reactions) {
          return accumulator?.concat(comment.reactions);
        }
        return undefined;
      },
      []
    );

    const replies = response.data.reduce(
      (accumulator: Reply[] | undefined, comment) => {
        if (comment.replies) {
          return accumulator?.concat(comment.replies);
        }
        return undefined;
      },
      []
    );

    return { comments, reactions, replies };
  } catch (error) {
    return rejectWithValue("error");
  }
});
