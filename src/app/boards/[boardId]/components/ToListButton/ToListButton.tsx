'use client';

import Button from '@/components/Button/Button';

const ToListButton = () => {
  return (
    <Button
      href="/boards"
      size="lg"
      variant="secondary"
      className="flex h-12 min-w-35! items-center justify-center px-0!"
    >
      목록으로
    </Button>
  );
};

ToListButton.displayName = 'ToListButton';
export default ToListButton;
