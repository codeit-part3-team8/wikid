'use client';

import { useState } from 'react';
import { Comment } from '@/types/Comment';
import { getAccessToken } from '@/utils/auth';
import { API } from '@/constants/api';

interface UseDeleteCommentParams {
  commentId: number;
  onSuccess: () => void;
}

export function useUpdateComment({ commentId, onSuccess }: UseDeleteCommentParams) {
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateComment = async (content: string): Promise<Comment | null> => {
    if (!commentId) return null;
    try {
      setLoading(true);
      const res = await fetch(`${API.COMMENT}${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        throw new Error(`댓글 수정 실패: ${res.status}`);
      }

      const data = await res.json();
      setError(null);
      onSuccess();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(`댓글 수정 중 에러 발생: ${err.message}`);
      } else {
        setError('댓글 수정 중 알 수 없는 에러 발생');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateComment, loading, error };
}
