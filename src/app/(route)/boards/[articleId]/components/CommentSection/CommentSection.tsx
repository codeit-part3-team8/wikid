'use client';

import { useState } from 'react';
import { useComments } from '../../hooks/comment/useComments';
import { useCreateComment } from '../../hooks/comment/useCreateComment';
import CommentCount from './CommentCount/CommentCount';
import CommentList from './CommentList/CommentList';
import CommentUploadBox from './CommentUploadBox/CommentUploadBox';
import SnackBar from '@/components/SnackBar/SnackBar';

interface CommentSectionProps {
  articleId: string;
}
export default function CommentSection({ articleId }: CommentSectionProps) {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [currentUserId] = useState<number | null>(null);

  const { comments, loading: cloading, error: cerror, refetch } = useComments({ articleId });
  const { createComment } = useCreateComment(articleId);

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
        <CommentList comments={comments} currentUserId={currentUserId} refetch={refetch} />
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
