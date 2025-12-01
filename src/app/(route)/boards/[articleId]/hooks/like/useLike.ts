'use client';
import { useState, useEffect, useCallback } from 'react';
import { API } from '@/constants/api';
import { Like as LikeType } from '@/types/Like';

interface LikeParams {
  articleId: string;
}

export function useLike({ articleId }: LikeParams) {
  const [error, setError] = useState<string | null>(null);
  const [like, setLike] = useState<LikeType>();

  const fetchLike = useCallback(async () => {
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${articleId}/like`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('좋아요 반영이 실패했습니다.');
      }
      const data = await res.json();
      setLike(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [articleId]);

  useEffect(() => {
    fetchLike();
  }, [fetchLike]);

  return { like, error, refetch: fetchLike };
}
