'use client';

import { useState } from 'react';

interface UseDeleteCommentParams {
  commentId: number;
  onSuccess: () => void;
}

export function useDeleteComment({ commentId, onSuccess }: UseDeleteCommentParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteComment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`댓글 삭제 실패: ${res.status}`);
      }

      const data = await res.json();

      onSuccess?.(); // 삭제 성공 시 콜백 실행
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(`댓글 삭제 중 에러 발생: ${err.message}`);
      } else {
        setError('댓글 삭제 중 알 수 없는 에러 발생');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteComment, loading, error };
}
