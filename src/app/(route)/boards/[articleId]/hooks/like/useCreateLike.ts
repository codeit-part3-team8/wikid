'use client';
import { useState, useCallback } from 'react';
import { API } from '@/constants/api';

interface CreateLikeParams {
  articleId: string;
  onSuccess?: () => void;
}

export function useCreateLike({ articleId, onSuccess }: CreateLikeParams) {
  const [error, setError] = useState<string | null>(null);

  const createLike = useCallback(async () => {
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${articleId}/like`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('좋아요 처리 실패');

      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('알 수 없는 오류 발생');
    }
  }, [articleId, onSuccess]);

  return { createLike, error };
}
