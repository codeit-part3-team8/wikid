'use client';
import React from 'react';

import { useState } from 'react';
import TextArea from '../TextArea/TextArea';
// import { useAuthStore } from '@/stores/useAuthStore';

const COMMENT_PLACEHOLDER = '허위사실, 비방, 욕설 등은 삼가해주세요.';

const CommentUploadBox = () => {
  const [comment, setComment] = useState('');
  // const { isLogin } = useAuthStore();

  // Enter 제출 구현을 위해 작성 (TextArea의 onSubmit과 handleSubmit의 타입이 다름)
  // Enter 제출을 지원하지 않는다면 handleSubmit에 합치면 됨
  const submitComment = () => {
    if (!comment.trim()) return; // 입력값이 없을 시, 제출 불가
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitComment();
  };

  const isDisabled = !comment.trim();

  return (
    <>
      <form className="relative w-fit" onSubmit={handleSubmit}>
        <div className="w-84 md:w-156 lg:w-264">
          <TextArea
            placeholder={COMMENT_PLACEHOLDER}
            value={comment}
            heightLines={4}
            maxLength={500}
            className="pr-28"
            onChange={(e) => setComment(e.target.value)}
            onSubmit={() => {
              if (isDisabled) return;
              submitComment();
            }}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className={`absolute right-2 bottom-4 h-11 w-30 rounded-lg bg-[#4CBFA4] text-white ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} `}
          >
            댓글 등록
          </button>
        </div>
      </form>
    </>
  );
};

CommentUploadBox.displayName = 'CommentUploadBox';
export default CommentUploadBox;
