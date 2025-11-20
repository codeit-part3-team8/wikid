'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

// Modal 스타일 정의
const modalOverlayStyle = tv({
  base: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-grayscale-500/30 transition-opacity duration-300',
});

const modalContainerStyle = tv({
  base: 'relative animate-in fade-in-0 zoom-in-95 scale-100 transform rounded-lg bg-white p-5 shadow-xl transition-all duration-300',
  variants: {
    size: {
      sm: 'w-[395px] min-h-[215px]',
      md: 'max-w-md',
      lg: 'max-w-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const closeButtonStyle = tv({
  base: 'absolute top-4 right-4 z-10 text-grayscale-400 transition-colors hover:opacity-70',
});

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
}: BaseModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  const modalContent = (
    <div className={clsx(modalOverlayStyle())} onClick={handleBackdropClick}>
      {/* 모달 컨테이너 */}
      <div className={clsx(modalContainerStyle({ size }))} onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        {showCloseButton && (
          <button onClick={onClose} className={clsx(closeButtonStyle())} aria-label="모달 닫기">
            <SVGIcon icon="IC_Close" size="sm" />
          </button>
        )}

        {/* 모달 콘텐츠 */}
        {children}
      </div>
    </div>
  );

  // Portal을 사용하여 body에 렌더링
  return createPortal(modalContent, document.body);
}
