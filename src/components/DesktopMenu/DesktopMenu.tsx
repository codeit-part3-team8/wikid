'use client';

import React from 'react';
import Link from 'next/link';
import { DesktopMenuProps } from '@/types/DesktopMenu.types';

const DesktopMenu: React.FC<DesktopMenuProps> = ({ onClose }) => {
  return (
    <div className="border-grayscale-200 absolute top-12 right-0 z-50 w-[176px] rounded-2xl border bg-white px-2 py-4 shadow-lg">
      <nav className="flex flex-col">
        <Link
          href="/mypage"
          className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 text-center transition-colors"
          onClick={onClose}
        >
          계정설정
        </Link>
        <Link
          href="/my-wiki"
          className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 rounded-lg px-4 py-3 text-center transition-colors"
          onClick={onClose}
        >
          내 위키
        </Link>
        <button
          className="text-md-regular text-grayscale-500 hover:bg-grayscale-100 w-full rounded-lg px-4 py-3 text-center transition-colors"
          onClick={() => {
            // 로그아웃 로직
            console.log('로그아웃');
            onClose();
          }}
        >
          로그아웃
        </button>
      </nav>
    </div>
  );
};

export default DesktopMenu;
