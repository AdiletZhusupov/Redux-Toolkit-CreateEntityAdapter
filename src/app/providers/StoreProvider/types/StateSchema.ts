import { CommentSchema } from "../../../../entities/Comment";

export interface StateSchema {
  comments: CommentSchema;
}

export interface ThunkConfig<T> {
  rejectValue: T;
}
