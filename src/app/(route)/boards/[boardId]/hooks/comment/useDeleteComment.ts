'use client';

import { useState } from 'react';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { API } from '@/constants/api';

interface UseDeleteCommentParams {
  commentId: number;
  onSuccess: () => void;
}

export function useDeleteComment({ commentId, onSuccess }: UseDeleteCommentParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteComment = async () => {
    if (!commentId) {
      setError('삭제할 댓글 정보가 올바르지 않습니다.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(`${API.COMMENT}${commentId}`, {
        method: 'DELETE',
      });

      let serverMessage: string | undefined;

      if (!res.ok) {
        try {
          const errorBody = await res.json();
          serverMessage = errorBody?.message;
        } catch {}

        switch (res.status) {
          case 400:
            throw new Error(serverMessage || '잘못된 요청입니다.');
          case 401:
            throw new Error(serverMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(serverMessage || '댓글 삭제 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '해당 댓글을 찾을 수 없습니다.');
          case 500:
            throw new Error(
              serverMessage || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
          default:
            throw new Error(
              serverMessage || `댓글 삭제 중 오류가 발생했습니다. (code: ${res.status})`
            );
        }
      }

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      onSuccess?.();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch') {
          setError('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError(err.message);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteComment, loading, error };
}
