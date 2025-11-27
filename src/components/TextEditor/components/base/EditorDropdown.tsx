'use client';

import { IconMapTypes } from '@/components/SVGIcon/icon';
import React, { useEffect, useRef, useState } from 'react';
import ToolbarButton from './ToolbarButton';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

interface EditorDropdownProps {
  icon: IconMapTypes;
  ariaLabel: string;
  children: React.ReactNode;
}
interface EditorDropdownMenuProps {
  icon: IconMapTypes;
  ariaLabel: string;
  onClick: () => void;
}

export const EditorDropdown = ({ icon, ariaLabel, children }: EditorDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconMapTypes>(icon);
  const ref = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setOpen(!open);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div className="text-grayscale-400 hover:text-grayscale-500 flex items-center hover:cursor-pointer">
        <ToolbarButton icon={selectedIcon} onClick={toggleDropdown} ariaLabel={ariaLabel} />
        <SVGIcon icon="TTIC_ArrowDown" onClick={toggleDropdown} className="mb-1 h-2 w-2" />
      </div>
      {open && (
        <div className="border-grayscale-400 absolute top-full left-0 z-10 mt-1 w-fit rounded bg-white shadow-md">
          {React.Children.map(children, (child) => {
            if (React.isValidElement<EditorDropdownMenuProps>(child)) {
              return React.cloneElement(child, {
                onClick: () => {
                  child.props.onClick?.(); // 원래 onClick 실행
                  setSelectedIcon(child.props.icon); // 헤더 아이콘 변경
                  setOpen(false); // 클릭 후 닫기
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

export const EditorDropdownMenu = ({ ariaLabel, icon, onClick }: EditorDropdownMenuProps) => {
  return (
    <button
      className="hover:bg-grayscale-100 flex w-full items-center px-3 py-1 text-left"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <SVGIcon icon={icon} />
    </button>
  );
};

EditorDropdown.displayName = 'EditorDropdown';
