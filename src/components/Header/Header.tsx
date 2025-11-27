'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderProps } from '@/types/Header';
import NotificationContainer from '@/components/Notification/NotificationContainer';
import NotificationDropdown from '@/components/Notification/NotificationDropdown';
import { Notification } from '@/types/Notification';
import WikiedLogo from '@/assets/logo/wikied-logo.svg';
import ProfileIcon from '@/assets/icons/profile-icon.svg';
import MenuIcon from '@/assets/icons/menu-icon.svg';

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNotificationOpen, setIsMobileNotificationOpen] = useState(false);

  // 임시 알림 데이터 (실제로는 API에서 가져올 데이터)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      content: '내 위키가 수정되었습니다',
      timestamp: '1분 전',
      isRead: false,
    },
    {
      id: '2',
      content: '내 위키가 수정되었습니다..',
      timestamp: '25분 전',
      isRead: false,
    },
  ]);

  // 알림 삭제 처리 함수 (실제로는 API 호출)
  const handleDeleteNotification = async (id: string) => {
    try {
      // TODO: 실제 API 호출
      // await deleteNotificationAPI(id);

      // 임시로 로컬 상태에서 제거
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    } catch (error) {
      console.error('알림 삭제 실패:', error);
    }
  };

  // 미읽은 알림이 있는지 확인
  const hasUnreadNotifications = notifications.some((notification) => !notification.isRead);

  return (
    <header className="border-grayscale-200 sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:mx-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <WikiedLogo className="h-10 w-24" />
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden items-center gap-10 md:flex">
              <Link
                href="/wiki"
                className="text-md-regular text-grayscale-500 hover:text-primary-200 transition-colors"
              >
                위키목록
              </Link>
              <Link
                href="/board"
                className="text-md-regular text-grayscale-500 hover:text-primary-200 transition-colors"
              >
                자유게시판
              </Link>
            </nav>
          </div>

          {/* 데스크톱 우측 영역 */}
          <div className="relative hidden items-center gap-4 md:flex">
            {isLoggedIn ? (
              <>
                {/* 알림 컴포넌트 */}
                <NotificationContainer
                  notifications={notifications}
                  onDeleteNotification={handleDeleteNotification}
                  hasUnread={hasUnreadNotifications}
                />

                {/* 프로필 아이콘 */}
                <button
                  className="hover:bg-grayscale-100 rounded-lg p-2 transition-colors"
                  aria-label="프로필"
                >
                  <ProfileIcon className="text-grayscale-400 h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-md-regular text-grayscale-400 hover:text-primary-200 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 우측 영역 */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn ? (
              /* 로그인 상태 - 햄버거 메뉴만 */
              <button
                className="hover:bg-grayscale-100 rounded-lg p-2 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsMobileNotificationOpen(false); // 알림이 열려있으면 닫기
                }}
                aria-label="메뉴"
              >
                <MenuIcon className="text-grayscale-500 h-6 w-6" />
              </button>
            ) : (
              /* 비로그인 상태 - 로그인 버튼만 */
              <Link
                href="/login"
                className="text-md-regular text-grayscale-400 hover:text-primary-200 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 (로그인 상태일 때만) */}
        {isMobileMenuOpen && isLoggedIn && (
          <div className="border-grayscale-200 absolute top-16 right-4 z-50 w-[120px] rounded-2xl border bg-white px-2 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col">
              <Link
                href="/wiki"
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                위키목록
              </Link>
              <Link
                href="/board"
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                자유게시판
              </Link>
              <button
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 text-left transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileNotificationOpen(true);
                }}
              >
                알림{' '}
                {hasUnreadNotifications && (
                  <span className="ml-1 inline-block h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>
              <Link
                href="/profile"
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                마이페이지
              </Link>
            </nav>
          </div>
        )}

        {/* 모바일 알림 드롭다운 */}
        {isMobileNotificationOpen && isLoggedIn && (
          <div className="md:hidden">
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setIsMobileNotificationOpen(false)}
              onDelete={handleDeleteNotification}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
