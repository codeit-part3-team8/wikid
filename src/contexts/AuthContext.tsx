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
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

// 초기값을 null로 설정
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
        // 토큰이 있으면 유효성 검증 및 필요시 갱신
        try {
          // 토큰 갱신 시도 (만료되었다면 자동으로 갱신됨)
          await refreshAccessToken();
          setIsLoggedIn(true);

          // 로컬스토리지에서 userProfile 로드
          const savedProfile = getUserProfile();
          if (savedProfile) {
            setUserProfile(savedProfile);
          }

          // TODO: 사용자 정보 가져오기
          // const userInfo = await fetchUserInfo();
          // setUser(userInfo);
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
      // 리프레시 토큰은 서버에서 HttpOnly 쿠키로 설정되므로 여기서는 처리하지 않음
      // setRefreshToken(refreshToken);
      setIsLoggedIn(true);

      // userData에서 userId와 code 추출하여 저장
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
        // 로컬스토리지에 저장
        saveUserProfile(userProfile);
      }
    },
    []
  );

  // 로그아웃 처리
  const logout = useCallback(() => {
    clearTokens(); // 토큰 및 userProfile 모두 제거
    setIsLoggedIn(false);
    setUser(null);
    setUserProfile(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  // userProfile 업데이트 처리
  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return null;
      const updatedProfile = { ...prev, ...profile };
      saveUserProfile(updatedProfile);
      return updatedProfile;
    });
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
    updateUserProfile,
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
