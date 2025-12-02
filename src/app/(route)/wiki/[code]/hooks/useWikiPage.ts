import { useState, useCallback, useEffect } from 'react';
import { APIProfileData } from '@/types/Api';
import { API } from '@/constants/api';
import { useAuth } from '@/contexts/AuthContext';

interface UseWikiPageReturn {
  // States
  profileData: APIProfileData | null;
  isLoading: boolean;
  error: string | null;
  isBeingEdited: boolean;
  hasEditPermission: boolean;

  // Computed values
  isLoggedIn: boolean;
  isMyWiki: boolean;
  currentUserCode: string;
  currentUserID: number;

  // Actions
  fetchWikiData: () => Promise<void>;
  checkEditingStatus: () => Promise<boolean>;
  setProfileData: (data: APIProfileData | null) => void;
  setHasEditPermission: (permission: boolean) => void;
  setIsBeingEdited: (editing: boolean) => void;
}

export const useWikiPage = (code: string): UseWikiPageReturn => {
  // States
  const [profileData, setProfileData] = useState<APIProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);

  // 현재 로그인한 사용자 정보
  const { isLoggedIn, userProfile } = useAuth();
  const currentUserCode = userProfile?.code || '';
  const currentUserID = userProfile?.userId || 0;

  // Computed values
  const isMyWiki = code === currentUserCode;

  // 편집 상태 확인 함수
  const checkEditingStatus = useCallback(async (): Promise<boolean> => {
    // 로그인되지 않은 상태에서는 편집 상태 확인 불필요
    if (!isLoggedIn) {
      setIsBeingEdited(false);
      return false;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API.PROFILE}${code}/ping`, {
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      if (response.status === 204) {
        // 204: 편집권한이 아무에게도 없음 (편집 가능)
        setIsBeingEdited(false);
        return false;
      }

      if (response.status === 200) {
        // 200: 누군가가 편집 중
        const text = await response.text();
        if (!text.trim()) {
          // 200이지만 body가 비어있으면 편집 가능으로 처리
          setIsBeingEdited(false);
          return false;
        }

        let result;
        try {
          result = JSON.parse(text);
        } catch {
          console.error('편집 상태 확인 응답이 JSON 형식이 아님:', text);
          setIsBeingEdited(false);
          return false;
        }

        // userId 비교
        if (result.userId) {
          const editingByOther = result.userId !== currentUserID;
          setIsBeingEdited(editingByOther);
          return editingByOther;
        }

        // userId가 없으면 편집 가능
        setIsBeingEdited(false);
        return false;
      }

      // 기타 상태 코드는 오류로 처리
      if (!response.ok) {
        console.error('편집 상태 확인 API 오류:', response.status, response.statusText);
        setIsBeingEdited(false);
        return false;
      }
    } catch (error) {
      console.error('편집 상태 확인 실패:', error);
    }

    setIsBeingEdited(false);
    return false;
  }, [code, currentUserID, isLoggedIn]);

  // 위키 데이터 페치 함수
  const fetchWikiData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API.PROFILE}${code}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new Error('응답이 비어있음');
      }

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(`응답이 JSON 형식이 아님: ${text.substring(0, 100)}...`);
      }

      const apiProfileData = result.data || result;
      setProfileData(apiProfileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
      setProfileData(null); // 에러 시 profileData 초기화
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  // 초기 데이터 로드
  useEffect(() => {
    if (code) {
      fetchWikiData();
      checkEditingStatus();
    }
  }, [code, fetchWikiData, checkEditingStatus]);

  return {
    // States
    profileData,
    isLoading,
    error,
    isBeingEdited,
    hasEditPermission,

    // Computed values
    isLoggedIn,
    isMyWiki,
    currentUserCode,
    currentUserID,

    // Actions
    fetchWikiData,
    checkEditingStatus,
    setProfileData,
    setHasEditPermission,
    setIsBeingEdited,
  };
};
