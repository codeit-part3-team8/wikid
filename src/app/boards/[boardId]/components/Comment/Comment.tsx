'use client';

import Avatar from '@/components/Avatar/Avatar';
// import useAuthStore
import { useState } from 'react';
import { Comment as CommentType } from '@/types/Comment';
import { getFormatDate } from '@/utils/getFormatDate';
import IconButton from '@/components/IconButton/IconButton';
import TextArea from '../TextArea/TextArea';

interface CommentProps {
  comment: CommentType;
  currentUserId?: number | null;
}

const Comment = ({ comment, currentUserId }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const formattedCreated = getFormatDate(comment.createdAt);
  const formattedUpdated = getFormatDate(comment.updatedAt);
  const isWriter = currentUserId && comment.writer.id === currentUserId;

  const handleSubmit = () => {
    // 실제 서버 전송 로직 필요
    console.log('submit', content);
    setIsEditing(false);
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
                    onClick={handleSubmit}
                  />
                )}
                <IconButton
                  icon="IC_Delete"
                  className="h-5 w-5 md:h-6 md:w-6"
                  onClick={() => console.log('delete')}
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
              onSubmit={handleSubmit}
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
    </div>
  );
};

Comment.displayName = 'Comment';
export default Comment;
