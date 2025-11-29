import Button from '@/components/Button/Button';
import BaseModal from '@/components/Modal/BaseModal';

interface ToLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ToLoginModal = ({ isOpen, onClose }: ToLoginModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="mt-3 flex h-40 flex-col justify-between">
        <span className="text-xl-semibold">로그인 후 이용 가능합니다</span>
        <Button href="/login" size="lg">
          로그인 페이지로 이동
        </Button>
      </div>
    </BaseModal>
  );
};

ToLoginModal.displayName = 'ToLoginModal';
export default ToLoginModal;
