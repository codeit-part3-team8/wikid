'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { BaseModalProps } from '@/types/Modal';

// Modal 스타일 정의
const modalOverlayStyle = tv({
  base: 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-grayscale-500/30 transition-opacity duration-300',
});

const modalContainerStyle = tv({
  base: 'relative animate-in fade-in-0 zoom-in-95 scale-100 transform rounded-lg bg-white p-5 shadow-xl transition-all duration-300',
  variants: {
    size: {
      sm: 'w-[395px] min-h-[215px] max-[641px]:w-[335px] max-[641px]:h-[211px]',
      md: 'max-w-md max-[641px]:w-[335px] max-[641px]:h-[211px]',
      lg: 'max-w-lg max-[641px]:w-[335px] max-[641px]:h-[211px]',
      quiz: 'w-[395px] min-h-[435px] max-[641px]:w-[335px] max-[641px]:h-[435px]',
      image: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const closeButtonStyle = tv({
  base: 'absolute top-4 right-4 z-10 text-grayscale-400 transition-colors hover:opacity-70 cursor-pointer',
});

interface BaseModalComponentProps extends BaseModalProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'quiz' | 'image';
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: BaseModalComponentProps) {
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

  // 이벤트 핸들러
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget && closeOnBackdropClick) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  const handleStopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // modalContent 메모이제이션
  const modalContent = useMemo(() => {
    const overlayClassName = clsx(modalOverlayStyle());
    const containerClassName = clsx(modalContainerStyle({ size }));
    const closeButtonClassName = clsx(closeButtonStyle());

    return (
      <div
        className={overlayClassName}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {/* 모달 컨테이너 */}
        <div className={containerClassName} onClick={handleStopPropagation}>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className={closeButtonClassName}
              aria-label="모달 닫기"
            >
              <SVGIcon icon="IC_Close" size="sm" />
            </button>
          )}

          {/* 모달 컴테이너 - 컴포넌트 내용 */}
          {children}
        </div>
      </div>
    );
  }, [
    size,
    showCloseButton,
    onClose,
    children,
    ariaLabelledBy,
    ariaDescribedBy,
    handleBackdropClick,
    handleStopPropagation,
  ]);

  if (!isOpen) return null;

  return createPortal(modalContent, document.body);
}
