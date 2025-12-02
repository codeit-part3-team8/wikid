'use client';

import Avatar from '@/components/Avatar/Avatar';
import { useState } from 'react';
import { Comment as CommentType } from '@/types/Comment';
import { getFormatDate } from '@/utils/getFormatDate';
import { useUpdateComment } from '../../hooks/comment/useUpdateComment';
import { useDeleteComment } from '../../hooks/comment/useDeleteComment';
import IconButton from '@/components/IconButton/IconButton';
import TextArea from '../TextArea/TextArea';
import { useAuth } from '@/contexts/AuthContext';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useModal } from '@/hooks/useModal';

interface CommentProps {
  comment: CommentType;
  refetch: () => void;
}

const Comment = ({ comment, refetch }: CommentProps) => {
  const { user, userProfile } = useAuth();
  const currentUserId = user?.id?.toString() || userProfile?.userId?.toString();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const { isOpen, openModal, closeModal } = useModal();

  const formattedCreated = getFormatDate(comment.createdAt);
  const formattedUpdated = getFormatDate(comment.updatedAt);

  const isWriter =
    currentUserId !== null &&
    currentUserId !== undefined &&
    comment.writer.id.toString() === currentUserId;

  const { updateComment } = useUpdateComment({ commentId: comment.id, onSuccess: refetch });
  const { deleteComment } = useDeleteComment({ commentId: comment.id, onSuccess: refetch });

  const handleUpdate = async () => {
    const updated = await updateComment(content);
    if (updated) {
      setIsEditing(false);
    }
  };

  const handleDeleteClick = () => {
    openModal();
  };

  const handleConfirmDelete = async () => {
    const deleted = await deleteComment();
    if (deleted) {
      closeModal();
    }
  };

  return (
    <div className="flex w-84 rounded-xl px-7 py-5 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] md:w-156 lg:w-265">
      <div className="flex w-full gap-5">
        <div>
          <Avatar imgUrl={comment.writer.image} variant="comment" name={comment.writer.name} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full justify-between">
            <span className="text-2lg-semibold text-grayscale-500">{comment.writer.name}</span>
            {isWriter && (
              <div className="flex h-fit gap-2 md:gap-5">
                {!isEditing && (
                  <IconButton
                    icon="IC_Edit"
                    className="h-5 w-5 md:h-6 md:w-6"
                    onClick={() => setIsEditing(true)}
                  />
                )}
                {isEditing && (
                  <IconButton
                    icon="IC_Check"
                    className="text-primary-200 hover:text-primary-300 h-5 w-5 md:h-6 md:w-6"
                    onClick={handleUpdate}
                  />
                )}
                <IconButton
                  icon="IC_Delete"
                  className="h-5 w-5 md:h-6 md:w-6"
                  onClick={handleDeleteClick}
                />
              </div>
            )}
          </div>
          {isEditing ? (
            <TextArea
              heightLines={4}
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onSubmit={handleUpdate}
            />
          ) : (
            <span className="text-lg-regular text-grayscale-500">{comment.content}</span>
          )}

          <span className="text-md-regular text-grayscale-400">작성일: {formattedCreated}</span>
          {formattedUpdated !== formattedCreated && (
            <span className="text-md-regular text-grayscale-400">수정일: {formattedUpdated}</span>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="정말 삭제하시겠습니까?"
        message="삭제된 댓글은 복구할 수 없습니다."
        confirmText="삭제"
        confirmVariant="secondary"
        cancelText="취소"
      />
    </div>
  );
};

Comment.displayName = 'Comment';
export default Comment;
