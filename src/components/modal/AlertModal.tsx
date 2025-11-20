import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import { BaseModal } from '@/components/Modal';

// Alert 버튼 스타일 정의
const alertButtonStyle = tv({
  base: 'rounded-md px-4 py-2 text-white transition-colors hover:opacity-90',
  variants: {
    variant: {
      primary: 'bg-primary-200 hover:bg-primary-300',
      secondary: 'bg-secondary-red-200 hover:bg-secondary-red-300',
      warning: 'bg-secondary-yellow-100 hover:bg-secondary-yellow-200 text-grayscale-600',
      info: 'bg-grayscale-500 hover:bg-grayscale-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'warning' | 'info';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText = '확인',
  buttonVariant = 'primary',
  showCloseButton = true,
  closeOnBackdropClick = true,
}: AlertModalProps) {
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
        <div className="mt-4 flex justify-end pt-5">
          <button onClick={onClose} className={clsx(alertButtonStyle({ variant: buttonVariant }))}>
            {buttonText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
