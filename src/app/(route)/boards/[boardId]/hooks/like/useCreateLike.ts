'use client';
import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface CreateLikeParams {
  boardId: string;
  onSuccess?: () => void;
}

export function useCreateLike({ boardId, onSuccess }: CreateLikeParams) {
  const accessToken = getAccessToken();
  const [error, setError] = useState<string | null>(null);

  const createLike = useCallback(async () => {
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }
    if (!boardId) return;

    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));

        switch (res.status) {
          case 400:
            throw new Error(errorBody.message || '잘못된 요청입니다.');
          case 401:
            throw new Error('로그인이 필요합니다.');
          case 403:
            throw new Error('접근 권한이 없습니다.');
          case 404:
            throw new Error('게시글을 찾을 수 없습니다.');
          case 500:
            throw new Error(
              errorBody.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
          default:
            throw new Error(errorBody.message || '좋아요 요청 처리 중 오류가 발생했습니다.');
        }
      }

      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) setError(`좋아요 처리 중 에러 발생: ${err.message}`);
      else setError('알 수 없는 오류가 발생했습니다.');
    }
  }, [boardId, onSuccess, accessToken]);

  return { createLike, error };
}
