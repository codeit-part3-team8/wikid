'use client';

import React from 'react';
import Link from 'next/link';
import { MobileMenuProps } from '@/types/MobileMenu.types';

const MobileMenu: React.FC<MobileMenuProps> = ({ isLoggedIn, onClose }) => {
  return (
    <div className="border-grayscale-200 absolute top-16 right-5 z-50 w-[176px] rounded-2xl border bg-white px-2 py-4 shadow-lg md:hidden">
      <nav className="flex flex-col">
        {/* 공통 메뉴 */}
        <Link
          href="/wiki"
          className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
          onClick={onClose}
        >
          위키목록
        </Link>
        <Link
          href="/board"
          className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
          onClick={onClose}
        >
          자유게시판
        </Link>

        {/* 로그인 시에만 보이는 메뉴 */}
        {isLoggedIn && (
          <>
            <Link
              href="/notifications"
              className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
              onClick={onClose}
            >
              알림
            </Link>
            <Link
              href="/mypage"
              className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
              onClick={onClose}
            >
              계정설정
            </Link>
            <Link
              href="/wiki/page"
              className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 transition-colors"
              onClick={onClose}
            >
              내 위키
            </Link>
            <button
              className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 text-left transition-colors"
              onClick={() => {
                // 로그아웃 로직
                onClose();
              }}
            >
              로그아웃
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
