import Back from "@/components/back";
import { router, Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";

const ScreensLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="notification"
        options={{
          title: "Notifications",
          headerLeft: () => (
            <Back />
          ),
          //   headerStyle: {
          //     backgroundColor: "red"
          //   }
        }}
      />
    </Stack>
  );
};

export default ScreensLayout;
