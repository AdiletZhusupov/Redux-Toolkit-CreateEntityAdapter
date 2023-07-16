import { memo } from "react";
import { Comment } from "../../model/types/comment";

interface CommentCardProps {
  comment: Comment;
  onDelete: (commentId: string) => void;
  onUpdate: (updatedComment: Comment) => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { comment, onDelete, onUpdate } = props;

  const updatedComment = {
    ...comment,
    body: `Comment ${comment.id} NEW body text`
  };

  return (
    <div className="comment-card">
      <span>{comment.body}</span>
      <div className="button-group">
        <button onClick={() => onDelete(comment.id)}>Delete</button>
        <button onClick={() => onUpdate(updatedComment)}>Update</button>
      </div>
    </div>
  );
});
