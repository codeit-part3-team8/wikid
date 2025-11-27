'use client';

import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { NotificationItemProps } from '@/types/Notification';

const NotificationItem = ({ notification, onDelete, onMarkAsRead }: NotificationItemProps) => {
  const handleDelete = () => {
    onDelete(notification.id);
  };

  const handleClick = () => {
    // 읽지 않은 알림을 클릭했을 때 읽음 처리
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={`cursor-pointer rounded-lg border p-4 transition-colors ${
        notification.isRead ? 'border-gray-200 bg-white' : 'border-gray-200 bg-white'
      }`}
      onClick={handleClick}
    >
      {/* 상단 영역: 상태 점과 삭제 버튼 */}
      <div className="mb-2.5 flex items-start justify-between">
        {/* 상태 표시 점 */}
        <div
          className={`h-[5px] w-[5px] shrink-0 rounded-full ${
            notification.isRead ? 'bg-primary-200' : 'bg-gray-400'
          }`}
          aria-hidden="true"
        />

        {/* 삭제 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 부모의 onClick 이벤트 방지
            handleDelete();
          }}
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
