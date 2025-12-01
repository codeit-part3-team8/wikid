'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { getAccessToken, clearTokens, setAccessToken, setRefreshToken } from '@/utils/auth';
import { API } from '@/constants/api';
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, user?: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // checkAuth : 비동기(로딩 관리까지 포함)
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getAccessToken();
      setIsLoggedIn(!!token);

      if (token) {
        // 서버에서 유저 정보 가져오기
        const response = await fetch(`${API.USERS}me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const userData: User = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 로그인 처리
  const login = (accessToken: string, refreshToken: string, userData?: User) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsLoggedIn(true);
    if (userData) setUser(userData);
  };

  // 로그아웃 처리
  const logout = () => {
    clearTokens();
    setIsLoggedIn(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다.');
  }
  return context;
}
