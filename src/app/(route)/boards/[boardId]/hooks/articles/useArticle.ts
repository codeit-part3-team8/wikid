'use client';

import { useState, useEffect, useCallback } from 'react';
import { API } from '@/constants/api';
import { Article as ArticleType } from '@/types/Article';
import { getAccessToken } from '@/utils/auth';

interface ArticleOptions {
  boardId: string;
}

export function useArticle({ boardId }: ArticleOptions) {
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleType>();

  const fetchArticle = useCallback(async () => {
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }
    if (!boardId) {
      setError('게시글을 불러오지 못했습니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}`, {
        cache: 'no-store',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        switch (res.status) {
          case 401:
            throw new Error('로그인이 필요합니다.');
          case 403:
            throw new Error('접근 권한이 없습니다.');
          case 404:
            throw new Error('게시글을 찾을 수 없습니다.');
          default:
            throw new Error(errorBody.message || '게시글을 불러오는데 실패했습니다.');
        }
      }

      const data = await res.json();
      setArticle(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [boardId, accessToken]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);
  return { loading, error, article, refetch: fetchArticle };
}
