import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import BaseModal from './BaseModal';

// Confirm 버튼 스타일 정의
const confirmButtonStyle = tv({
  base: 'rounded-md px-4 py-2 transition-colors',
  variants: {
    variant: {
      primary: 'bg-primary-200 hover:bg-primary-300 text-white',
      secondary: 'bg-secondary-red-200 hover:bg-secondary-red-300 text-white',
      warning: 'bg-secondary-yellow-100 hover:bg-secondary-yellow-200 text-grayscale-600',
      info: 'bg-grayscale-500 hover:bg-grayscale-600 text-white',
      outline: 'border border-grayscale-300 bg-white hover:bg-grayscale-100 text-grayscale-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  // 취소 버튼 설정
  cancelText?: string;
  cancelVariant?: 'primary' | 'secondary' | 'warning' | 'info' | 'outline';
  // 확인 버튼 설정
  confirmText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'warning' | 'info' | 'outline';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelText = '취소',
  cancelVariant = 'outline',
  confirmText = '확인',
  confirmVariant = 'primary',
  showCloseButton = true,
  closeOnBackdropClick = true,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={showCloseButton}
      closeOnBackdropClick={closeOnBackdropClick}
    >
      <div className="flex h-full flex-col pt-4 pl-2">
        {/* 모달 제목 */}
        <h3 className="text-2lg-semibold text-grayscale-500 mb-2.5 pt-5">{title}</h3>

        {/* 모달 메시지 */}
        <p className="text-lg-regular text-grayscale-400 flex-1">{message}</p>

        {/* 버튼 영역 */}
        <div className="mt-4 flex justify-end gap-3 pt-5">
          {/* 취소 버튼 */}
          <button
            onClick={onClose}
            className={clsx(confirmButtonStyle({ variant: cancelVariant }))}
          >
            {cancelText}
          </button>

          {/* 확인 버튼 */}
          <button
            onClick={handleConfirm}
            className={clsx(confirmButtonStyle({ variant: confirmVariant }))}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
