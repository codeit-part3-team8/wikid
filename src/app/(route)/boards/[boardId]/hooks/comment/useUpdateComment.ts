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
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateComment = async (content: string): Promise<Comment | null> => {
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return null;
    }

    if (!commentId) {
      setError('수정할 댓글 ID가 존재하지 않습니다.');
      return null;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API.COMMENT}${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        switch (res.status) {
          case 401:
            throw new Error('로그인이 필요합니다.');
          case 403:
            throw new Error('접근 권한이 없습니다.');
          case 404:
            throw new Error('댓글을 찾을 수 없습니다.');
          default:
            throw new Error(errorBody.message || '댓글을 수정하는데 실패했습니다.');
        }
      }

      const data = await res.json();
      setError(null);
      onSuccess();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(`댓글 수정 중 에러 발생: ${err.message}`);
      } else {
        setError('알 수 없는 에러가 발생했습니다.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateComment, loading, error };
}
