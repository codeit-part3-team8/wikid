'use client';
import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface LikeParams {
  boardId: string;
  onSuccess?: () => void;
}

export function useDeleteLike({ boardId, onSuccess }: LikeParams) {
  const token = getAccessToken();
  const [error, setError] = useState<string | null>(null);

  const deleteLike = useCallback(async () => {
    if (!boardId) return;
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}/like`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId: Number(boardId) }),
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('좋아요 반영이 실패했습니다.');
      }
      if (res.status !== 204) {
        await res.json();
      }
      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [boardId, onSuccess, token]);

  return { error, deleteLike };
}
