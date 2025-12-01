'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { API } from '@/constants/api';

interface UseLoginReturn {
  isLoading: boolean;
  loginHandler: (email: string, password: string) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API.AUTH}signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(errorBody?.message || '로그인 실패');
        }

        const data = await res.json();
        login(data.accessToken, data.refreshToken);

        window.location.href = '/';
      } catch (err) {
        console.error(err);
        if (err instanceof Error) alert(err.message || '로그인 중 오류 발생');
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  return { isLoading, loginHandler };
}
