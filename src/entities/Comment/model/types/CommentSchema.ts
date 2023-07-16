import { EntityState } from "@reduxjs/toolkit";
import { Comment, Reaction, Reply } from "./comment";

export interface CommentSchema extends EntityState<Comment> {
  isLoading: boolean;
  error?: string;
  replies: EntityState<Reply>;
  reactions: EntityState<Reaction>;
}
