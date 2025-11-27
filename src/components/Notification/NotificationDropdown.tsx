'use client';

import NotificationItem from '@/components/Notification/NotificationItem';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { NotificationDropdownProps } from '@/types/Notification';

const NotificationDropdown = ({ notifications, onClose, onDelete }: NotificationDropdownProps) => {
  return (
    <div className="notification-dropdown notification-dropdown-mobile md:notification-dropdown-desktop">
      <div className="notification-content notification-content-mobile md:notification-content-desktop">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl-bold text-black" id="notification-title">
            알림 {notifications.length}개
          </h3>
          <button
            onClick={onClose}
            className="rounded p-1 transition-colors hover:bg-black/10"
            aria-label="알림 창 닫기"
            type="button"
          >
            <SVGIcon icon="IC_Close" size="md" className="text-black" />
          </button>
        </div>

        <div className="space-y-4" role="list" aria-labelledby="notification-title">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} role="listitem">
                <NotificationItem notification={notification} onDelete={onDelete} />
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-md-regular text-grayscale-200">알림이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
