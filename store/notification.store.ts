import { DUMMY_NOTIFICATIONS } from "@/constants/data";
import { Notification } from "@/types/notification.type";
import { create } from "zustand";

interface NotificationStore {
  notifications: Notification[];
  toggleReadStatus: (id: string) => void;
  markAllAsRead: (section: "today" | "older") => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: DUMMY_NOTIFICATIONS,

  toggleReadStatus: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      ),
    }));
  },

  markAllAsRead: (section) => {
    set((state) => {
      const now = new Date();
      return {
        notifications: state.notifications.map((notif) => {
          const diffInHours =
            (now.getTime() - notif.date.getTime()) / (1000 * 60 * 60);
          const isToday = diffInHours < 24;

          if (
            (section === "today" && isToday) ||
            (section === "older" && !isToday)
          ) {
            return { ...notif, read: true };
          }
          return notif;
        }),
      };
    });
  },
}));

export const useUnreadCount = () =>
  useNotificationStore(
    (state) => state.notifications.filter((n) => !n.read).length
  );
