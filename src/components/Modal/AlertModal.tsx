import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import BaseModal from './BaseModal';
import { BaseModalProps, ModalContentProps, ButtonVariant } from '@/types/Modal';

// Alert 버튼 스타일 정의
const alertButtonStyle = tv({
  base: 'rounded-md px-4 py-2 transition-colors hover:opacity-90',
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

interface AlertModalProps extends BaseModalProps, ModalContentProps {
  buttonText?: string;
  buttonVariant?: ButtonVariant;
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
      aria-labelledby="alert-modal-title"
    >
      <div className="flex h-full flex-col pt-4 pl-2">
        {/* 모달 제목 */}
        <h3
          id="alert-modal-title"
          className="responsive-text text-2lg-to-lg text-weight-semibold text-grayscale-500 mb-2.5 pt-5"
        >
          {title}
        </h3>

        {/* 모달 메시지 */}
        <p className="responsive-text text-lg-to-md text-grayscale-400 flex-1">{message}</p>

        {/* 버튼 영역 */}
        <div className="mt-4 flex justify-end pt-5">
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              alertButtonStyle({ variant: buttonVariant }),
              'responsive-text text-lg-to-md text-weight-semibold'
            )}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
