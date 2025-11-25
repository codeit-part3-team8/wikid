'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderProps } from '../../types/Header.types';
import WikiedLogo from '@/assets/logo/wikied-logo.svg';
import AlarmIcon from '@/assets/icons/alarm-icon.svg';
import ProfileIcon from '@/assets/icons/profile-icon.svg';
import MenuIcon from '@/assets/icons/menu-icon.svg';

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-50 border-b border-[var(--grayscale-200)] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                className="text-md-regular text-[var(--grayscale-500)] transition-colors hover:text-[var(--primary-200)]"
              >
                위키목록
              </Link>
              <Link
                href="/board"
                className="text-md-regular text-[var(--grayscale-500)] transition-colors hover:text-[var(--primary-200)]"
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
                  className="relative rounded-lg p-2 transition-colors hover:bg-[var(--grayscale-100)]"
                  aria-label="알림"
                >
                  <AlarmIcon className="h-6 w-6 text-[var(--grayscale-400)]" />
                </button>

                {/* 프로필 아이콘 */}
                <button
                  className="rounded-lg p-2 transition-colors hover:bg-[var(--grayscale-100)]"
                  aria-label="프로필"
                >
                  <ProfileIcon className="h-6 w-6 text-[var(--grayscale-400)]" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-md-regular text-[var(--grayscale-400)] transition-colors hover:text-[var(--primary-200)]"
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
                className="rounded-lg p-2 transition-colors hover:bg-[var(--grayscale-100)]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="메뉴"
              >
                <MenuIcon className="h-6 w-6 text-[var(--grayscale-500)]" />
              </button>
            ) : (
              /* 비로그인 상태 - 로그인 버튼만 */
              <Link
                href="/login"
                className="text-md-regular text-[var(--grayscale-400)] transition-colors hover:text-[var(--primary-200)]"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 (로그인 상태일 때만) */}
        {isMobileMenuOpen && isLoggedIn && (
          <div className="absolute top-16 right-4 z-50 w-[120px] rounded-2xl border border-[var(--grayscale-200)] bg-white px-2 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col">
              <Link
                href="/wiki"
                className="text-md-regular rounded-lg px-4 py-3 text-[var(--grayscale-500)] transition-colors hover:bg-[var(--grayscale-100)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                위키목록
              </Link>
              <Link
                href="/board"
                className="text-md-regular rounded-lg px-4 py-3 text-[var(--grayscale-500)] transition-colors hover:bg-[var(--grayscale-100)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                자유게시판
              </Link>
              <Link
                href="/notifications"
                className="text-md-regular rounded-lg px-4 py-3 text-[var(--grayscale-500)] transition-colors hover:bg-[var(--grayscale-100)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                알림
              </Link>
              <Link
                href="/profile"
                className="text-md-regular rounded-lg px-4 py-3 text-[var(--grayscale-500)] transition-colors hover:bg-[var(--grayscale-100)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                마이페이지
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
