/**
 * 사용자 정보를 쉽게 사용할 수 있는 커스텀 훅
 *
 * 사용 예시:
 * const { userId, code, isLoggedIn, userName, userEmail } = useUserInfo();
 *
 * if (isLoggedIn) {
 *   console.log(`사용자 ID: ${userId}, 위키 코드: ${code}`);
 * }
 */

import { useAuth } from '@/contexts/AuthContext';

export const useUserInfo = () => {
  const { isLoggedIn, userProfile, user } = useAuth();

  return {
    // 로그인 상태
    isLoggedIn,

    // 사용자 기본 정보
    userId: userProfile?.userId || null,
    code: userProfile?.code || '',
    userEmail: user?.email || '',
    userName: userProfile?.name || user?.name || '',

    // 전체 프로필 객체 (필요한 경우)
    userProfile,
    user,

    // 유틸리티 함수들
    getWikiUrl: () => (userProfile?.code ? `/wiki/${userProfile.code}` : null),
    hasProfile: () => !!(userProfile?.userId && userProfile?.code),
  };
};
