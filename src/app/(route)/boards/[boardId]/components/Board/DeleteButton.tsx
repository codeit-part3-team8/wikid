'use client';

import IconButton from '@/components/IconButton/IconButton';
import Button from '@/components/Button/Button';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useModal } from '@/hooks/useModal';

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div>
        <Button
          size="lg"
          className="hidden h-11 cursor-pointer items-center justify-center px-0! py-0! md:flex md:w-30! lg:w-35!"
          onClick={openModal}
        >
          삭제하기
        </Button>
        <IconButton icon="IC_Delete" onClick={openModal} className="md:hidden" />
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        title="정말 삭제하시겠습니까?"
        message="삭제된 게시글은 되돌릴 수 없습니다."
        onConfirm={onDelete}
      />
    </>
  );
};

DeleteButton.displayName = 'DeleteButton';
export default DeleteButton;
