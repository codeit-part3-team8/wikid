'use client';

import { useState, useEffect, useCallback } from 'react';
import { API } from '@/constants/api';

interface ArticleOptions {
  articleId: string;
  onSuccess?: () => void;
}

export function useDeleteArticle({ articleId, onSuccess }: ArticleOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteArticle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${articleId}`, {
        method: 'DELETE',
        // headers: { Authorization: `Bearer ${token}` },
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
  }, [articleId, onSuccess]);

  return { loading, error, deleteArticle };
}
