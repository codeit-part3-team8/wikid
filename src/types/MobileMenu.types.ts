/**
 * MobileMenu 컴포넌트 Props
 */
export interface MobileMenuProps {
  /**
   * 로그인 상태 여부
   */
  isLoggedIn: boolean;

  /**
   * 메뉴 닫기 핸들러
   */
  onClose: () => void;
}
