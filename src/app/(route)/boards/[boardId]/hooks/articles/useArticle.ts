'use client';

import { useState, useEffect, useCallback } from 'react';
import { API } from '@/constants/api';
import { Article as ArticleType } from '@/types/Article';
import { getAccessToken } from '@/utils/auth';

interface ArticleOptions {
  boardId: string;
}

export function useArticle({ boardId }: ArticleOptions) {
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleType>();

  const fetchArticle = useCallback(async () => {
    if (!boardId) {
      setError('boardId가 존재하지 않습니다');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}`, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 404) throw new Error('게시글을 찾을 수 없습니다.');
        if (res.status === 404) throw new Error('접근 권한이 없습니다.');
        throw new Error('게시글을 불러오는데 실패했습니다.');
      }
      const data = await res.json();
      setArticle(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [boardId, token]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);
  return { loading, error, article, refetch: fetchArticle };
}
