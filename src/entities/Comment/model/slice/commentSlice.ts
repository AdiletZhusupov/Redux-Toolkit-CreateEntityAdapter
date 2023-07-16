import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "../../../../app/providers/StoreProvider";
import { CommentSchema } from "../../model/types/CommentSchema";
import { fetchComments } from "../services/fetchComments";
import { deleteComment } from "../services/deleteComment";
import { updateComment } from "../services/updateComment";
import { Comment, Reaction, Reply } from "../types/comment";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id
});

const reactionsAdapter = createEntityAdapter<Reaction>({
  selectId: (reaction) => reaction.id
});

const repliesAdapter = createEntityAdapter<Reply>({
  selectId: (reply) => reply.id
});

export const commentsSelectors = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.comments || commentsAdapter.getInitialState()
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState<CommentSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    reactions: reactionsAdapter.getInitialState(),
    replies: repliesAdapter.getInitialState()
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      commentsAdapter.setAll(state, action.payload.comments);
      if (action.payload.reactions) {
        reactionsAdapter.setAll(state.reactions, action.payload.reactions);
      }
      if (action.payload.replies) {
        repliesAdapter.setAll(state.replies, action.payload.replies);
      }
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      commentsAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      commentsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      });
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

export const { actions: commentsActions } = commentsSlice;
export const { reducer: commentsReducer } = commentsSlice;
