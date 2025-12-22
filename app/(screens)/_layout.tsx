import Back from "@/components/back";
import { useUnreadCount } from "@/store/notification.store";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ScreensLayout = () => {
  const unreadCount = useUnreadCount();
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <Back />,
      }}
    >
      <Stack.Screen
        name="notification"
        options={{
          title: "Notifications",
          // headerLeft: () => <Back />,
          headerRight: () =>
            unreadCount > 0 ? (
              <View className="p-2 px-3 rounded-lg bg-primary">
                <Text className="text-white">{unreadCount} NEW</Text>
              </View>
            ) : null,
          //   headerStyle: {
          //     backgroundColor: "red"
          //   }
        }}
      />

      <Stack.Screen
        name="upcoming-events"
        options={{
          title: "Upcoming Event",
          // headerLeft: () => <Back />,
        }}
      />

      <Stack.Screen
        name="popular-events"
        options={{
          title: "Popular Event",
        }}
      />

      <Stack.Screen name="(booking-details)" options={{ headerShown: false }} />
      <Stack.Screen name="(ticket-details)" options={{ headerShown: false }} />
      <Stack.Screen
        name="account-security"
        options={{ title: "Account Security" }}
      />
    </Stack>
  );
};

export default ScreensLayout;
