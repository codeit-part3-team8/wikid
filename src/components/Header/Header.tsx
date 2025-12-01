'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderProps } from '@/types/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useUserInfo } from '@/hooks/useUserInfo';
import NotificationContainer from '@/components/Notification/NotificationContainer';
import NotificationDropdown from '@/components/Notification/NotificationDropdown';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { Notification } from '@/types/Notification';
import { API } from '@/constants/api';
import WikiedLogo from '@/assets/logo/wikied-logo.svg';
import ProfileIcon from '@/assets/icons/profile-icon.svg';
import MenuIcon from '@/assets/icons/menu-icon.svg';

const Header: React.FC<HeaderProps> = ({ isLoggedIn: propIsLoggedIn = false }) => {
  const { isLoggedIn, logout } = useAuth();
  const { code } = useUserInfo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNotificationOpen, setIsMobileNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // AuthContext의 값을 우선적으로 사용
  const actualIsLoggedIn = isLoggedIn || propIsLoggedIn;

  // 프로필 이미지 가져오기
  useEffect(() => {
    let isMounted = true;

    const fetchProfileImage = async () => {
      if (!actualIsLoggedIn || !code) {
        if (isMounted) setProfileImage(null);
        return;
      }

      try {
        const response = await fetch(`${API.PROFILE}${code}`);

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.data?.image || data.image;

          // 이미지가 있고, 유효한 URL인 경우에만 설정
          if (isMounted) {
            if (imageUrl && imageUrl.startsWith('http')) {
              setProfileImage(imageUrl);
            } else {
              setProfileImage(null);
            }
          }
        } else {
          if (isMounted) setProfileImage(null);
        }
      } catch (error) {
        console.error('프로필 이미지 로드 실패:', error);
        if (isMounted) setProfileImage(null);
      }
    };

    // wiki 프로필 업데이트 이벤트 리스너
    const handleProfileUpdate = () => {
      fetchProfileImage();
    };

    fetchProfileImage();
    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [actualIsLoggedIn, code]);

  // 프로필 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileDropdownOpen]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // 알림 목록 가져오기
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!actualIsLoggedIn) {
        setNotifications([]);
        return;
      }

      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(`${API.NOTIFICATION}?page=1&pageSize=20`, {
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
        });

        if (response.ok) {
          const data = await response.json();
          const notificationList = data.list || [];
          setNotifications(notificationList);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error('알림 목록 로드 실패:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [actualIsLoggedIn]);

  // 알림 삭제 처리 함수
  const handleDeleteNotification = async (id: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API.NOTIFICATION}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      }
    } catch (error) {
      console.error('알림 삭제 실패:', error);
    }
  };

  // 알림 읽음 처리 함수
  const handleMarkAsRead = async (id: string) => {
    try {
      // 로컬 상태 먼저 업데이트
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );

      // TODO: API 엔드포인트가 제공되면 추가
      // const accessToken = localStorage.getItem('accessToken');
      // await fetch(`${API.NOTIFICATION}${id}/read`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      //   },
      // });
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    }
  };

  // 모든 알림 읽음 처리 함수
  const handleMarkAllAsRead = async () => {
    try {
      // 로컬 상태 먼저 업데이트
      setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));

      // TODO: API 엔드포인트가 제공되면 추가
      // const accessToken = localStorage.getItem('accessToken');
      // await fetch(`${API.NOTIFICATION}read-all`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      //   },
      // });
    } catch (error) {
      console.error('모든 알림 읽음 처리 실패:', error);
    }
  };

  // 미읽은 알림이 있는지 확인
  const hasUnreadNotifications = notifications.some((notification) => !notification.isRead);

  return (
    <header className="border-grayscale-200 sticky top-0 z-50 w-full border-b bg-white">
      <div className="px-5 lg:px-20">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-10">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <WikiedLogo className="h-10 w-24" />
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden items-center gap-10 md:flex">
              <Link
                href="/wikilist"
                className="text-md-regular text-grayscale-500 hover:text-primary-200 transition-colors"
              >
                위키목록
              </Link>
              <Link
                href="/boards"
                className="text-md-regular text-grayscale-500 hover:text-primary-200 transition-colors"
              >
                자유게시판
              </Link>
            </nav>
          </div>

          {/* 데스크톱 우측 영역 */}
          <div className="flex flex-1 justify-end">
            <div className="relative hidden items-center gap-4 md:flex">
              {actualIsLoggedIn ? (
                <>
                  {/* 알림 컴포넌트 */}
                  <NotificationContainer
                    notifications={notifications}
                    onDeleteNotification={handleDeleteNotification}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    hasUnread={hasUnreadNotifications}
                  />

                  {/* 프로필 아이콘 */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      className="hover:bg-grayscale-100 rounded-lg p-2 transition-colors"
                      aria-label="프로필"
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                      {profileImage ? (
                        <div className="relative h-6 w-6 overflow-hidden rounded-full">
                          <Image
                            src={profileImage}
                            alt="프로필"
                            fill
                            className="object-cover"
                            sizes="24px"
                          />
                        </div>
                      ) : (
                        <ProfileIcon className="text-grayscale-400 h-6 w-6" />
                      )}
                    </button>

                    {/* 프로필 드롭다운 메뉴 */}
                    {isProfileDropdownOpen && (
                      <div className="border-grayscale-200 absolute right-0 z-50 mt-2 w-32 rounded-lg border bg-white py-2 shadow-lg">
                        <Link
                          href="/mypage"
                          className="text-grayscale-700 hover:bg-grayscale-100 block cursor-pointer px-4 py-2 text-sm"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          계정설정
                        </Link>
                        <div
                          className="text-grayscale-700 hover:bg-grayscale-100 block cursor-pointer px-4 py-2 text-sm"
                          onClick={(e) => {
                            if (code) {
                              window.location.href = `/wiki/${code}`;
                            } else {
                              e.preventDefault();
                            }
                            setIsProfileDropdownOpen(false);
                          }}
                        >
                          내 위키
                        </div>
                        <button
                          className="text-grayscale-700 hover:bg-grayscale-100 w-full cursor-pointer px-4 py-2 text-left text-sm"
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            setIsLogoutModalOpen(true);
                          }}
                        >
                          로그아웃
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-md-regular text-grayscale-400 hover:text-primary-200 cursor-pointer transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>

          {/* 모바일 우측 영역 */}
          <div className="flex items-center gap-2 md:hidden">
            {actualIsLoggedIn ? (
              /* 로그인 상태 - 햄버거 메뉴만 */
              <button
                className="hover:bg-grayscale-100 cursor-pointer rounded-lg p-2 transition-colors"
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
                className="text-md-regular text-grayscale-400 hover:text-primary-200 cursor-pointer transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 (로그인 상태일 때만) */}
        {isMobileMenuOpen && actualIsLoggedIn && (
          <div className="border-grayscale-200 absolute top-12 right-4 z-50 w-[140px] rounded-2xl border bg-white px-2 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col">
              <Link
                href="/wikilist"
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 cursor-pointer rounded-lg px-4 py-3 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                위키목록
              </Link>
              <Link
                href="/boards"
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 cursor-pointer rounded-lg px-4 py-3 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                자유게시판
              </Link>
              <button
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 cursor-pointer rounded-lg px-4 py-3 text-left transition-colors"
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
                href="/mypage"
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 cursor-pointer rounded-lg px-4 py-3 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                계정설정
              </Link>
              <div
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 cursor-pointer rounded-lg px-4 py-3 transition-colors"
                onClick={(e) => {
                  if (code) {
                    window.location.href = `/wiki/${code}`;
                  } else {
                    e.preventDefault();
                  }
                  setIsMobileMenuOpen(false);
                }}
              >
                내 위키
              </div>
              <button
                className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 w-full cursor-pointer rounded-lg px-4 py-3 text-left transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoutModalOpen(true);
                }}
              >
                로그아웃
              </button>
            </nav>
          </div>
        )}

        {/* 모바일 알림 드롭다운 - 외부 클릭 시 닫기 */}
        {isMobileNotificationOpen && actualIsLoggedIn && (
          <>
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsMobileNotificationOpen(false)}
              aria-hidden="true"
            />
            <div className="relative z-50 md:hidden">
              <NotificationDropdown
                notifications={notifications}
                onClose={() => setIsMobileNotificationOpen(false)}
                onDelete={handleDeleteNotification}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </div>
          </>
        )}

        {/* 로그아웃 확인 모달 */}
        <ConfirmModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          title="로그아웃"
          message="정말 로그아웃 하시겠습니까?"
          confirmText="로그아웃"
          cancelText="취소"
          onConfirm={() => {
            setIsLogoutModalOpen(false);
            logout();
          }}
        />
      </div>
    </header>
  );
};

export default Header;
