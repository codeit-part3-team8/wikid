'use client';

import { useState, useRef, useEffect } from 'react';
import NotificationDropdown from './NotificationDropdown';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { NotificationContainerProps } from '@/types/Notification';

const NotificationContainer = ({
  notifications,
  onDeleteNotification,
  onMarkAsRead,
  onMarkAllAsRead,
  hasUnread = false,
}: NotificationContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className="relative rounded-lg p-2 transition-colors hover:bg-gray-100"
        aria-label={`알림 ${hasUnread ? '미읽은 알림 있음' : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <SVGIcon icon="IC_Alarm" size="md" className="text-gray-700" />
        {hasUnread && (
          <div
            className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          onClose={handleClose}
          onDelete={onDeleteNotification}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
        />
      )}
    </div>
  );
};

export default NotificationContainer;
