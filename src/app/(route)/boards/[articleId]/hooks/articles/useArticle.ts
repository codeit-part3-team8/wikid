'use client';

import { useState, useEffect, useCallback } from 'react';
import { API } from '@/constants/api';
import { Article as ArticleType } from '@/types/Article';

interface ArticleOptions {
  articleId: string;
}

export function useArticle({ articleId }: ArticleOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleType>();

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${articleId}`, { cache: 'no-store' });
      if (!res.ok) {
        if (res.status === 404) throw new Error('게시글을 찾을 수 없습니다.');
        if (res.status === 404) throw new Error('접근 권한이 없습니다.');
        throw new Error('게시글을 불러오는데 실패했습니다.');
      }
      const data = await res.json();
      setArticle(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);
  return { loading, error, article, refetch: fetchArticle };
}
