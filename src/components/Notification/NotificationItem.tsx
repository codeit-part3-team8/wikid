'use client';

import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { NotificationItemProps } from '@/types/Notification';

const NotificationItem = ({ notification, onDelete }: NotificationItemProps) => {
  const handleDelete = () => {
    onDelete(notification.id);
  };

  // CSS 미디어 쿼리로 반응형 처리
  const getStatusColor = () => {
    if (notification.isRead) return 'bg-gray-300';
    return notification.type === 'error'
      ? 'bg-red-500'
      : notification.type === 'warning'
        ? 'bg-yellow-500'
        : 'bg-blue-500';
  };

  return (
    <div className="notification-item notification-item-mobile md:notification-item-desktop">
      {/* 상단 영역: 상태 점과 삭제 버튼 */}
      <div className="mb-2.5 flex items-start justify-between">
        {/* 상태 표시 점 */}
        <div
          className={`h-[5px] w-[5px] shrink-0 rounded-full ${getStatusColor()}`}
          aria-hidden="true"
        />

        {/* 삭제 버튼 */}
        <button
          onClick={handleDelete}
          className="rounded transition-colors hover:bg-black/10"
          aria-label={`${notification.content} 알림 삭제`}
          type="button"
        >
          <SVGIcon icon="IC_Close" size="xs" className="text-grayscale-400" />
        </button>
      </div>

      {/* 알림 내용 */}
      <div>
        <p className="text-md-regular mb-1 text-black">{notification.content}</p>
        <p className="text-xs-regular text-grayscale-300">{notification.timestamp}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
