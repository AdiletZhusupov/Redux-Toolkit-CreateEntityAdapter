import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchComments } from "../../model/services/fetchComments";
import { deleteComment } from "../../model/services/deleteComment";
import { updateComment } from "../../model/services/updateComment";
import { commentsSelectors } from "../../model/slice/commentSlice";
import { useAppDispatch } from "../../../../shared/hooks/useAppDispatch";
import {
  getCommentsIsLoading,
  getCommentsError
} from "../../model/selectors/getComments";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types/comment";

export const CommentsList = () => {
  const dispatch = useAppDispatch();
  const comments = useSelector(commentsSelectors.selectAll);
  const isLoading = useSelector(getCommentsIsLoading);
  const error = useSelector(getCommentsError);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const onDeleteComment = useCallback(
    (commentId: string) => {
      dispatch(deleteComment(commentId));
    },
    [dispatch]
  );

  const onUpdateComment = useCallback(
    (updatedComment: Comment) => {
      dispatch(updateComment(updatedComment));
    },
    [dispatch]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops, unexpected error occurred</div>;
  }

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDelete={onDeleteComment}
            onUpdate={onUpdateComment}
          />
        ))}
    </>
  );
};
