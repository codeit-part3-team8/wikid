'use client';
import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface CreateLikeParams {
  boardId: string;
  onSuccess?: () => void;
}

export function useCreateLike({ boardId, onSuccess }: CreateLikeParams) {
  const token = getAccessToken();
  const [error, setError] = useState<string | null>(null);

  const createLike = useCallback(async () => {
    if (!boardId) return;
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId: Number(boardId) }),
      });

      if (!res.ok) throw new Error('좋아요 처리 실패');

      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('알 수 없는 오류 발생');
    }
  }, [boardId, onSuccess, token]);

  return { createLike, error };
}
