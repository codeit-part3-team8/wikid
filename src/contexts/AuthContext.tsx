'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  getAccessToken,
  clearTokens,
  setAccessToken,
  setRefreshToken,
  refreshAccessToken,
  authenticatedFetch,
  UserProfile,
  getUserProfile,
  setUserProfile as saveUserProfile,
} from '@/utils/auth';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginUserData {
  user: {
    id: number;
    email: string;
    name: string;
    profile?: {
      id: number;
      code: string;
    };
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, userData?: LoginUserData) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // checkAuth : 비동기(로딩 관리까지 포함)
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getAccessToken();
      if (token) {
        try {
          // 토큰 갱신 시도
          await refreshAccessToken();
          setIsLoggedIn(true);

          // ✅ 로컬스토리지에서 userProfile 로드하고 User 상태도 복원
          const savedProfile = getUserProfile();
          if (savedProfile) {
            setUserProfile(savedProfile);

            // User 상태 복원
            const user: User = {
              id: savedProfile.userId.toString(),
              email: '', // 이메일은 로컬스토리지에 없으면 빈 문자열
              name: savedProfile.name ?? '',
            };
            setUser(user);
          }
        } catch (error) {
          console.error('토큰 검증 실패:', error);
          setIsLoggedIn(false);
          setUser(null);
          setUserProfile(null);
          clearTokens();
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUserProfile(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 로그인 처리
  const login = useCallback(
    (accessToken: string, refreshToken: string, userData?: LoginUserData) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIsLoggedIn(true);

      if (userData && userData.user) {
        // User 형태로 변환하여 설정
        const user: User = {
          id: userData.user.id.toString(),
          email: userData.user.email,
          name: userData.user.name,
        };
        setUser(user);

        // userId와 code 추출 및 저장
        const userProfile: UserProfile = {
          userId: userData.user.id,
          code: userData.user.profile?.code || '',
          name: userData.user.name,
        };

        setUserProfile(userProfile);
        saveUserProfile(userProfile);
      }
    },
    []
  );

  // 로그아웃 처리
  const logout = useCallback(() => {
    clearTokens();
    setIsLoggedIn(false);
    setUser(null);
    setUserProfile(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  const contextValue = {
    isLoggedIn,
    user,
    userProfile,
    isLoading,
    login,
    logout,
    checkAuth,
    authenticatedFetch,
  };

  if (isLoading) return null;

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다.');
  }
  return context;
}
