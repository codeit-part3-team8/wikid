'use client';

import Button from '@/components/Button/Button';
import IconButton from '@/components/IconButton/IconButton';

interface EditButtonProps {
  boardId: string;
}

const EditButton = ({ boardId }: EditButtonProps) => {
  return (
    <div>
      <Button
        href="/addboard"
        size="lg"
        className="hidden h-11 cursor-pointer items-center justify-center px-0! py-0! md:flex md:w-30! lg:w-35!"
      >
        수정하기
      </Button>
      <IconButton href={`/addboard/${boardId}`} icon="IC_Edit" className="md:hidden" />
    </div>
  );
};

EditButton.displayName = 'EditButton';
export default EditButton;
