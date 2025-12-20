import { useNotificationStore } from "@/store/notification.store";
import { Bell } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dummy notification data

const Notification = () => {
  const { notifications, toggleReadStatus, markAllAsRead } = useNotificationStore();


  const formatDate = (date: Date) => {
    if (!date) return "Unknown date";
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays < 2) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const groupNotificationsByDate = () => {
    const now = new Date();
    const today: typeof notifications = [];
    const older: typeof notifications = [];

    notifications.forEach((notif) => {
      const diffInHours =
        (now.getTime() - notif.date.getTime()) / (1000 * 60 * 60);
      if (diffInHours < 24) {
        today.push(notif);
      } else {
        older.push(notif);
      }
    });

    return { today, older };
  };

  const { today, older } = groupNotificationsByDate();
  const hasUnreadToday = today.some((n) => !n.read);
  const hasUnreadOlder = older.some((n) => !n.read);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {today.length > 0 && (
          <>
            <View className="flex-row justify-between px-5 py-5 bg-gray-100">
              <Text className="text-lg font-light" style={{ letterSpacing: 2 }}>
                TODAY
              </Text>
              {hasUnreadToday && (
                <TouchableOpacity onPress={() => markAllAsRead("today")}>
                  <Text className="text-lg text-primary">Mark all as read</Text>
                </TouchableOpacity>
              )}
            </View>

            {today.map((notification) => (
              <Pressable
                key={notification.id}
                className={`flex-row items-center gap-4 p-5 ${
                  !notification.read ? "bg-primary/10" : ""
                }`}
                onPress={() => toggleReadStatus(notification.id)}
              >
                <View
                  className={`p-3 rounded-full w-fit ${
                    !notification.read ? "bg-white" : "bg-primary/10"
                  }`}
                >
                  <Bell color="#7952FC" />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-lg font-medium">
                    {notification.title}
                  </Text>
                  <Text className="text-gray-500" numberOfLines={2}>
                    {notification.message}
                  </Text>
                  <Text className="text-gray-500">
                    {formatDate(notification.date)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

        {older.length > 0 && (
          <>
            <View className="flex-row justify-between px-5 py-5 bg-gray-100">
              <Text className="text-lg font-light" style={{ letterSpacing: 2 }}>
                EARLIER
              </Text>
              {hasUnreadOlder && (
                <TouchableOpacity onPress={() => markAllAsRead("older")}>
                  <Text className="text-lg text-primary">Mark all as read</Text>
                </TouchableOpacity>
              )}
            </View>

            {older.map((notification) => (
              <Pressable
                key={notification.id}
                className={`flex-row items-center gap-4 p-5 ${
                  !notification.read ? "bg-primary/10" : ""
                }`}
                onPress={() => toggleReadStatus(notification.id)}
              >
                <View
                  className={`p-3 rounded-full w-fit ${
                    !notification.read ? "bg-white" : "bg-primary/10"
                  }`}
                >
                  <Bell color="#7952FC" />
                </View>
                <View className="flex-1 gap-1.5">
                  <Text className="text-lg font-medium">
                    {notification.title}
                  </Text>
                  <Text className="text-gray-500" numberOfLines={2}>
                    {notification.message}
                  </Text>
                  <Text className="text-gray-500">
                    {formatDate(notification.date)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;
