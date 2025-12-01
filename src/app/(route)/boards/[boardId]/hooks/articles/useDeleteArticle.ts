'use client';

import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface ArticleOptions {
  boardId: string;
  onSuccess?: () => void;
}

export function useDeleteArticle({ boardId, onSuccess }: ArticleOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteArticle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!boardId) return;
      const token = getAccessToken();

      const res = await fetch(`${API.ARTICLES}${boardId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete article');

      if (res.status !== 204) {
        await res.json();
      }
      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }, [boardId, onSuccess]);

  return { loading, error, deleteArticle };
}
