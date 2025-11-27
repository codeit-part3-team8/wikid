'use client';
import React from 'react';

import { useState } from 'react';
import TextArea from '../TextArea/TextArea';
import UploadButton from './UploadButton';
import Button from '@/components/Button/Button';
// import { useAuthStore } from '@/stores/useAuthStore';

const COMMENT_PLACEHOLDER = '허위사실, 비방, 욕설 등은 삼가해주세요.';

interface CommentUploadBoxProps {
  isLogin: boolean;
}

const CommentUploadBox = ({ isLogin }: CommentUploadBoxProps) => {
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

  if (!isLogin) {
    return (
      <div className="bg-grayscale-100 flex h-40 w-84 flex-col items-center justify-center gap-5 rounded-lg md:w-156 lg:w-264">
        <span>댓글 달기는 로그인 후 이용 가능합니다.</span>
        <Button href="/login" size="sm" className="flex h-10 justify-center py-0!">
          로그인 페이지로 이동
        </Button>
      </div>
    );
  }

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

          <UploadButton disabled={isDisabled} />
        </div>
      </form>
    </>
  );
};

CommentUploadBox.displayName = 'CommentUploadBox';
export default CommentUploadBox;
