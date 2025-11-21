'use client';

import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

// SnackBar 설정 상수
const SNACKBAR_CONFIG = {
  DESKTOP_BASE_OFFSET: 16,
  MOBILE_BASE_OFFSET: 75,
  STACK_GAP: 60,
  MOBILE_BREAKPOINT: 680,
  DEFAULT_DURATION: 3000,
  DEFAULT_Z_INDEX: 50,
} as const;

// SnackBar 타입 정의
export type SnackBarType = 'success' | 'error';

const SNACKBAR_ICONS = {
  success: 'IC_Check' as const,
  error: 'IC_Error' as const,
} as const;

// SnackBar 스타일 정의
const snackBarStyle = tv({
  base: 'flex items-center rounded-lg shadow-lg transition-all duration-300 transform px-5 py-[15px] gap-[15px] max-[680px]:px-[15px] max-[680px]:py-3 max-[680px]:gap-[15px] max-w-[90vw] min-w-0 translate-y-0 opacity-100',
  variants: {
    type: {
      success: 'bg-primary-100 border border-primary-200 text-primary-300',
      error: 'bg-secondary-red-100 border border-secondary-red-200 text-secondary-red-200',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

const iconStyle = tv({
  base: 'flex-shrink-0 w-5 h-5 max-[680px]:w-[18px] max-[680px]:h-[18px]',
  variants: {
    type: {
      success: 'text-primary-200',
      error: 'text-secondary-red-200',
    },
  },
});

const messageStyle = tv({
  base: 'text-lg-semibold flex-1 max-[680px]:text-xs whitespace-nowrap overflow-hidden text-ellipsis',
  variants: {
    type: {
      success: 'text-primary-300',
      error: 'text-secondary-red-200',
    },
  },
});

interface SnackBarProps {
  isOpen: boolean;
  message: string;
  type?: SnackBarType;
  duration?: number;
  onClose: () => void;
  stackIndex?: number;
  zIndex?: number;
}

export default function SnackBar({
  isOpen,
  message,
  type = 'success',
  duration = SNACKBAR_CONFIG.DEFAULT_DURATION,
  onClose,
  stackIndex = 0,
  zIndex = SNACKBAR_CONFIG.DEFAULT_Z_INDEX,
}: SnackBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= SNACKBAR_CONFIG.MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 자동 닫기 타이머 관리
  useEffect(() => {
    if (!isOpen || duration === 0) return;

    // 자동 닫기 타이머 설정
    closeTimerRef.current = setTimeout(() => {
      onClose();
    }, duration);

    // cleanup
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    return SNACKBAR_ICONS[type] || SNACKBAR_ICONS.success;
  };

  const desktopOffset =
    SNACKBAR_CONFIG.DESKTOP_BASE_OFFSET + stackIndex * SNACKBAR_CONFIG.STACK_GAP;
  const mobileOffset = SNACKBAR_CONFIG.MOBILE_BASE_OFFSET + stackIndex * SNACKBAR_CONFIG.STACK_GAP;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2"
      style={{
        top: !isMobile ? `${desktopOffset}px` : 'auto',
        bottom: isMobile ? `${mobileOffset}px` : 'auto',
        zIndex: zIndex + stackIndex,
      }}
    >
      <div
        className={clsx(snackBarStyle({ type }))}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${type === 'success' ? '성공' : '오류'} 알림: ${message}`}
      >
        {/* 아이콘 */}
        <div className={clsx(iconStyle({ type }))} aria-hidden="true">
          <SVGIcon icon={getIcon()} size="sm" />
        </div>

        {/* 메시지 */}
        <div className={clsx(messageStyle({ type }))}>{message}</div>
      </div>
    </div>
  );
}
