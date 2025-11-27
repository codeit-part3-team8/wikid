'use client';

import NotificationItem from '@/components/Notification/NotificationItem';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { NotificationDropdownProps } from '@/types/Notification';

const NotificationDropdown = ({
  notifications,
  onClose,
  onDelete,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDropdownProps) => {
  return (
    <div className="border-grayscale-200 bg-grayscale-200 absolute top-full right-5 z-10 mt-2 w-80 rounded-lg border shadow-lg md:right-0 md:w-96">
      <div className="max-h-96 overflow-y-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl-bold text-black" id="notification-title">
            알림 {notifications.length}개
          </h3>
          <div className="flex items-center gap-2">
            {notifications.some((n) => !n.isRead) && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm-regular text-grayscale-400 hover:text-grayscale-600 transition-colors"
                type="button"
              >
                모두 읽음
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded p-1 transition-colors hover:bg-black/10"
              aria-label="알림 창 닫기"
              type="button"
            >
              <SVGIcon icon="IC_Close" size="md" className="text-black" />
            </button>
          </div>
        </div>

        <div className="space-y-4" role="list" aria-labelledby="notification-title">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} role="listitem">
                <NotificationItem
                  notification={notification}
                  onDelete={onDelete}
                  onMarkAsRead={onMarkAsRead}
                />
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-md-regular text-grayscale-500">알림이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
