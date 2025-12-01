'use client';

import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { NotificationItemProps } from '@/types/Notification';

const getTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);

  if (isNaN(created.getTime())) {
    return '';
  }

  const diffInMs = now.getTime() - created.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    return created.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  }
};

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

  const timeDisplay = notification.createdAt
    ? getTimeAgo(notification.createdAt)
    : notification.timestamp || '';

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
          className={`h-[7px] w-[7px] shrink-0 rounded-full ${
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
          className="cursor-pointer rounded transition-colors hover:bg-black/10"
          aria-label={`${notification.content} 알림 삭제`}
          type="button"
        >
          <SVGIcon icon="IC_Close" size="xs" className="text-grayscale-400" />
        </button>
      </div>

      {/* 알림 내용 */}
      <div>
        <p className="text-md-regular mb-1 text-black">{notification.content}</p>
        <p className="text-xs-regular text-grayscale-300">{timeDisplay}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
