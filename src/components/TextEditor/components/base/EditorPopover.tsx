'use client';

import React, { useEffect, useRef } from 'react';

interface PopoverProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Popover = ({ open, onClose, children }: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`border-grayscale-400 absolute top-full left-0 z-20 mt-2 rounded border bg-white shadow`}
    >
      {children}
    </div>
  );
};

export default Popover;
