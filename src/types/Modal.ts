// 기본 Modal Props (모든 Modal의 공통 동작)
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

// Modal 콘텐츠 Props (title, message가 있는 Modal용)
export interface ModalContentProps {
  title: string;
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  confirmVariant?: ButtonVariant;
  cancelText?: string;
  cancelVariant?: ButtonVariant;
}

// 버튼 변형 타입
export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'info' | 'outline';

// ConfirmModal Props
export interface ConfirmModalProps extends BaseModalProps, ModalContentProps {
  onConfirm: () => void;
}

// AlertModal Props
export interface AlertModalProps extends BaseModalProps, ModalContentProps {
  onConfirm?: () => void;
}
