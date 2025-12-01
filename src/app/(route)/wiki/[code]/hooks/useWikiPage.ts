import { useState, useCallback, useEffect } from 'react';
import { APIProfileData } from '@/types/Api';

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

  // 현재 사용자 정보
  const currentUserCode = process.env.NEXT_PUBLIC_WIKID_CURRENT_USER_CODE || '';
  const currentUserID = parseInt(process.env.NEXT_PUBLIC_WIKID_CURRENT_USER_ID || '0');

  // Computed values
  const isLoggedIn = Boolean(currentUserCode);
  const isMyWiki = code === currentUserCode;

  // 편집 상태 확인 함수
  const checkEditingStatus = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(`/api/profiles/${code}/ping`);
      const result = await response.json();

      if (response.ok && result.data) {
        const { isEditing, userId } = result.data;
        const editingByOther = !isMyWiki && isEditing && userId && userId !== currentUserID;

        setIsBeingEdited(editingByOther);
        return editingByOther;
      }
    } catch (error) {
      console.error('편집 상태 확인 실패:', error);
    }

    setIsBeingEdited(false);
    return false;
  }, [code, currentUserID, isMyWiki]);

  // 위키 데이터 페치 함수
  const fetchWikiData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/profiles/${code}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch wiki data');
      }

      const apiProfileData = result.data;
      setProfileData(apiProfileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
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
