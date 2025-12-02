/**
 * WikiPage 컴포넌트
 *
 * 위키 페이지의 메인 컴포넌트로, 사용자가 위키를 조회하고 편집할 수 있는 기능을 제공합니다.
 *
 * 주요 기능:
 * - 위키 데이터 조회 및 표시
 * - 위키 편집 권한 관리
 * - 실시간 편집 상태 확인
 * - 위키 내용 저장 및 취소
 * - 다양한 모달 및 알림 관리
 *
 * 사용된 커스텀 훅:
 * - useWikiPage: 핵심 데이터 및 상태 관리
 * - useWikiEditor: 편집 로직 및 저장/취소 관리
 * - useWikiModals: 모든 모달 상태 관리
 *
 * 컴포넌트 구조:
 * - WikiHeader: 페이지 헤더 및 위키 참여 버튼
 * - WikiContent: 위키 내용 표시 및 편집
 * - Profile: 사용자 프로필 정보
 * - EditActionButtons: 편집 시 저장/취소 버튼
 * - WikiModals: 모든 모달 및 스낵바
 * - EditTimer: 편집 시간 표시
 */

// WikiPage는 현재 props가 필요하지 않음 (URL 파라미터 사용)
// export interface WikiPageProps {}

/**
 * 이미지 URL 검증 유틸리티
 * @param imageUrl 검증할 이미지 URL
 * @returns 유효한 이미지 URL 또는 빈 문자열
 */
export function getValidImageUrl(imageUrl: string | null): string {
  if (!imageUrl) return '';

  // Data URL (base64)인 경우 그대로 반환 (미리보기용)
  if (imageUrl.startsWith('data:image/')) return imageUrl;

  // 예시 URL 필터링
  const INVALID_PATTERNS = ['example.com', 'placeholder', 'mock', 'test.com'];
  if (INVALID_PATTERNS.some((pattern) => imageUrl.includes(pattern))) return '';

  try {
    const url = new URL(imageUrl);
    // HTTPS만 허용
    return url.protocol === 'https:' ? imageUrl : '';
  } catch {
    return '';
  }
}
