'use client';

import { useState } from 'react';
import { useComments } from '../../hooks/comment/useComments';
import { useCreateComment } from '../../hooks/comment/useCreateComment';
import CommentCount from './CommentCount';
import CommentList from './CommentList';
import CommentUploadBox from './CommentUploadBox';
import SnackBar from '@/components/SnackBar/SnackBar';
import LoadingDots from '@/components/LoadingDots/LoadingDots';

interface CommentSectionProps {
  boardId: string;
}

export default function CommentSection({ boardId }: CommentSectionProps) {
  const [showSnackBar, setShowSnackBar] = useState(false);

  // comments 기본값을 빈 배열로 설정
  const { comments = [], loading: cloading, error: cerror, refetch } = useComments({ boardId });
  const { createComment } = useCreateComment(boardId);

  const handleUpload = async (content: string) => {
    try {
      const newComment = await createComment(content);
      if (newComment) {
        await refetch(); // 서버에서 새 댓글 받아오기
      } else if (cerror) {
        setShowSnackBar(true);
      }
    } catch (err) {
      setShowSnackBar(true);
      console.error('댓글 작성 오류:', err);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <CommentCount count={comments.length} />
          <CommentUploadBox onSubmit={handleUpload} />
          {cloading && <LoadingDots />}
          {cerror && (
            <div>
              <span>댓글을 불러오던 중 에러가 발생했습니다.</span>
            </div>
          )}
        </div>
        <CommentList comments={comments} refetch={refetch} />
      </div>
      <SnackBar
        isOpen={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        type="error"
        message="댓글 목록을 새로고침하는데 실패했습니다."
      />
    </div>
  );
}
