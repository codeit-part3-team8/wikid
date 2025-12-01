'use client';

import { useState } from 'react';
import { useComments } from '../../hooks/comment/useComments';
import { useCreateComment } from '../../hooks/comment/useCreateComment';
import CommentCount from './CommentCount';
import CommentList from './CommentList';
import CommentUploadBox from './CommentUploadBox';
import SnackBar from '@/components/SnackBar/SnackBar';

interface CommentSectionProps {
  boardId: string;
}
export default function CommentSection({ boardId }: CommentSectionProps) {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const { comments, loading: cloading, error: cerror, refetch } = useComments({ boardId });
  const { createComment } = useCreateComment(boardId);

  const handleUpload = async (content: string) => {
    const newComment = await createComment(content);
    if (newComment) {
      await refetch(); // 댓글 목록 새로고침
    } else if (cerror) {
      setShowSnackBar(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <CommentCount count={comments.length} />
          <CommentUploadBox onSubmit={handleUpload} />
          {cloading && <p>댓글 불러오는중...</p>}
          {cerror && <p className="bg-secondary-red-200">{cerror}</p>}
        </div>
        <CommentList comments={comments} refetch={refetch} />
      </div>
      <SnackBar
        isOpen={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        type="error"
        message="댓글 목록을 새로고침하는데에 실패했습니다."
      />
    </>
  );
}
