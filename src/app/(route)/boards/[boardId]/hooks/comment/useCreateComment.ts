'use client';

import { useState } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

export function useCreateComment(boardId: string) {
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = async (content: string) => {
    try {
      setLoading(true);

      const res = await fetch(`${API.ARTICLES}${boardId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error(`댓글 생성 실패: HTTP ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(`댓글 생성 중 에러 발생: ${err.message}`);
      } else {
        setError('댓글 생성 중 알 수 없는 에러 발생');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createComment, loading, error };
}
