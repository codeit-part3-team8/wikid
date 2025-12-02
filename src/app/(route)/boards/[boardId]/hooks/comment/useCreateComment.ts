'use client';

import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';
import { useState } from 'react';

export function useCreateComment(boardId: string) {
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = async (content: string) => {
    if (!accessToken) {
      setError('로그인 후 다시 시도해주세요.');
      return null;
    }

    if (!content) {
      setError('댓글 내용을 입력해주세요.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content }),
      });

      let serverMessage: string | undefined;

      if (!res.ok) {
        try {
          const errorBody = await res.json();
          serverMessage = errorBody?.message;
        } catch {}

        switch (res.status) {
          case 400:
            throw new Error(serverMessage || '잘못된 요청입니다.');
          case 401:
            throw new Error(serverMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(serverMessage || '댓글 작성 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '게시글을 찾을 수 없습니다.');
          case 500:
            throw new Error(
              serverMessage || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
          default:
            throw new Error(
              serverMessage || `댓글 생성 중 오류가 발생했습니다. (code: ${res.status})`
            );
        }
      }

      const data = await res.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch') {
          setError('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError(err.message);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createComment, loading, error };
}
