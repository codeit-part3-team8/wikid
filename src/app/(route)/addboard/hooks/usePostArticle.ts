// usePostArticle.ts
'use client';

import { useState, useRef, useEffect } from 'react';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { API } from '@/constants/api';

interface ArticlePayload {
  title: string;
  content: string;
  image?: string;
}

interface PostResponse {
  message: string;
  data: unknown;
}

export const usePostArticle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponse | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const postArticle = async (payload: ArticlePayload, onSuccess?: (data: PostResponse) => void) => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setLoading(true);
    setError(null);

    try {
      const bodyPayload: ArticlePayload = {
        title: payload.title,
        content: payload.content,
        ...(payload.image ? { image: payload.image } : {}),
      };

      const res = await fetchWithAuth(`${API.ARTICLES}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
        signal: abortController.signal,
      });

      if (!res.ok) {
        let errorMessage = `HTTP error! status: ${res.status}`;
        try {
          const errorBody = await res.json();
          errorMessage = errorBody.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const resData: PostResponse = await res.json();
      setData(resData);

      if (onSuccess) {
        onSuccess(resData);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (err instanceof Error) setError(err.message);
      else setError('An unknown error occurred during posting.');
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  return { postArticle, loading, error, data };
};
