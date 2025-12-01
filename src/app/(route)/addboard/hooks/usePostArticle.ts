import { useState, useRef, useEffect } from 'react';

interface ArticlePayload {
  image?: string;
  title: string;
  content: string;
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
      // 컴포넌트 언마운트 시 진행 중인 요청 취소
      abortControllerRef.current?.abort();
    };
  }, []);

  const postArticle = async (payload: ArticlePayload, onSuccess?: (data: PostResponse) => void) => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || `HTTP error! status: ${res.status}`);
      }

      const resData: PostResponse = await res.json();
      setData(resData);

      if (onSuccess) {
        onSuccess(resData);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // 취소된 요청은 에러로 처리하지 않음
      }
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred during posting.');
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  return { postArticle, loading, error, data };
};
