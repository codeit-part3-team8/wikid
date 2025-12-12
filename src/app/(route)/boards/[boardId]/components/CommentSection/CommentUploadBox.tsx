'use client';
import React from 'react';

import { useState } from 'react';
import TextArea from '../TextArea/TextArea';
import UploadButton from './UploadButton';
import { useAuth } from '@/contexts/AuthContext';

const COMMENT_PLACEHOLDER = '허위사실, 비방, 욕설 등은 삼가해주세요.';

interface CommentUploadBoxProps {
  onSubmit: (v: string) => void;
}

const CommentUploadBox = ({ onSubmit }: CommentUploadBoxProps) => {
  const [comment, setComment] = useState('');
  const { isLoggedIn } = useAuth();

  // Enter 제출 구현을 위해 작성 (TextArea의 onSubmit과 handleSubmit의 타입이 다름)
  const submitComment = () => {
    if (!comment.trim()) return; // 입력값이 없을 시, 제출 불가
    onSubmit(comment);
    setComment('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitComment();
  };

  const isDisabled = !isLoggedIn || !comment.trim();
  return (
    <>
      <form className="relative w-fit" onSubmit={handleSubmit}>
        <div className="w-84 md:w-156 lg:w-264">
          <TextArea
            placeholder={isLoggedIn ? COMMENT_PLACEHOLDER : '로그인 후 댓글을 작성할 수 있습니다.'}
            value={comment}
            heightLines={4}
            maxLength={500}
            className="pr-28"
            onChange={(e) => setComment(e.target.value)}
            onSubmit={() => {
              if (isDisabled) return;
              submitComment();
            }}
            disabled={!isLoggedIn}
          />

          <UploadButton disabled={isDisabled} />
        </div>
      </form>
    </>
  );
};

CommentUploadBox.displayName = 'CommentUploadBox';
export default CommentUploadBox;
