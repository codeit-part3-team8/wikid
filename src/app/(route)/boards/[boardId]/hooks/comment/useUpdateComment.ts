'use client';

import { useState } from 'react';
import { Comment } from '@/types/Comment';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { API } from '@/constants/api';

interface UseUpdateCommentParams {
  commentId: number;
  onSuccess: () => void;
}

export function useUpdateComment({ commentId, onSuccess }: UseUpdateCommentParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateComment = async (content: string): Promise<Comment | null> => {
    if (!commentId) {
      setError('수정할 댓글 정보가 올바르지 않습니다.');
      return null;
    }

    if (!content) {
      setError('댓글 내용을 입력해주세요.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(`${API.COMMENT}${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
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
            throw new Error(serverMessage || '댓글 수정 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '해당 댓글을 찾을 수 없습니다.');
          case 500:
            throw new Error(
              serverMessage || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
          default:
            throw new Error(
              serverMessage || `댓글 수정 중 오류가 발생했습니다. (code: ${res.status})`
            );
        }
      }

      const data = await res.json();
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

  return { updateComment, loading, error };
}
