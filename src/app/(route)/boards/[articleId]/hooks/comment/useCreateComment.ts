'use client';

import { useState } from 'react';
import { Comment } from '@/types/Comment';

export function useCreateComment(articleId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = async (content: string): Promise<Comment | null> => {
    try {
      setLoading(true);
      const res = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
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
