'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderProps } from '@/types/Header.types';
import WikiedLogo from '@/assets/logo/wikied-logo.svg';
import AlarmIcon from '@/assets/icons/alarm-icon.svg';
import ProfileIcon from '@/assets/icons/profile-icon.svg';
import MenuIcon from '@/assets/icons/menu-icon.svg';
import MobileMenu from '@/components/MobileMenu/MobileMenu';
import DesktopMenu from '@/components/DesktopMenu/DesktopMenu';

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  return (
    <header className="border-grayscale-200 relative sticky top-0 z-50 border-b bg-white">
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
          <div className="hidden items-center gap-4 md:flex">
            {isLoggedIn ? (
              <>
                {/* 알림 아이콘 */}
                <button
                  className="hover:bg-grayscale-100 relative rounded-lg p-2 transition-colors"
                  aria-label="알림"
                >
                  <AlarmIcon className="text-grayscale-400 h-6 w-6" />
                </button>

                {/* 프로필 아이콘 */}
                <div className="relative">
                  <button
                    className="hover:bg-grayscale-100 rounded-lg p-2 transition-colors"
                    aria-label="프로필"
                    onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
                  >
                    <ProfileIcon className="text-grayscale-400 h-6 w-6" />
                  </button>

                  {/* 프로필 드롭다운 */}
                  {isDesktopMenuOpen && <DesktopMenu onClose={() => setIsDesktopMenuOpen(false)} />}
                </div>
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
            {/* 햄버거 메뉴 - 항상 표시 */}
            <button
              className="hover:bg-grayscale-100 rounded-lg p-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴"
            >
              <MenuIcon className="text-grayscale-500 h-6 w-6" />
            </button>

            {/* 비로그인 상태 - 로그인 버튼 추가 표시 */}
            {!isLoggedIn && (
              <Link
                href="/login"
                className="text-md-regular text-grayscale-400 hover:text-primary-200 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <MobileMenu isLoggedIn={isLoggedIn} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;
