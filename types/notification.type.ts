export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  toggleReadStatus: (id: string) => void;
  markAllAsRead: (section: "today" | "older") => void;
}