export interface Notification {
  id: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type?: 'info' | 'warning' | 'error';
}

export interface NotificationContainerProps {
  notifications: Notification[];
  onDeleteNotification: (id: string) => void;
  hasUnread?: boolean;
}

export interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
  onDelete: (id: string) => void;
}

export interface NotificationItemProps {
  notification: Notification;
  onDelete: (id: string) => void;
}
