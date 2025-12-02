'use client';
import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface LikeParams {
  boardId: string;
  onSuccess?: () => void;
}

export function useDeleteLike({ boardId, onSuccess }: LikeParams) {
  const accessToken = getAccessToken();
  const [error, setError] = useState<string | null>(null);

  const deleteLike = useCallback(async () => {
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }
    if (!boardId) return;

    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}/like`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const serverMessage = errorBody?.message;

        switch (res.status) {
          case 400:
            throw new Error(serverMessage || '잘못된 요청입니다.');
          case 401:
            throw new Error(serverMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(serverMessage || '좋아요를 취소할 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '게시글을 찾을 수 없습니다.');
          case 500:
            throw new Error(serverMessage || '서버 내부 오류가 발생했습니다.');
          default:
            throw new Error(
              serverMessage || `좋아요 취소 중 오류가 발생했습니다. (code: ${res.status})`
            );
        }
      }

      onSuccess?.();
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
    }
  }, [boardId, onSuccess, accessToken]);

  return { error, deleteLike };
}
