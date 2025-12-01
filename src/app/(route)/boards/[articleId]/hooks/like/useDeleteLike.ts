'use client';
import { useState, useCallback } from 'react';
import { API } from '@/constants/api';

interface LikeParams {
  articleId: string;
  onSuccess?: () => void;
}

export function useDeleteLike({ articleId, onSuccess }: LikeParams) {
  const [error, setError] = useState<string | null>(null);

  const deleteLike = useCallback(async () => {
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${articleId}/like`, {
        method: 'DELETE',
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
  }, [articleId, onSuccess]);

  return { error, deleteLike };
}
