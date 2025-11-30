'use client';

import { useState } from 'react';

export function useDeleteComment(commentId: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteComment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
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
