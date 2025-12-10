import Back from "@/components/back";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="location"
        options={{
          presentation: "modal",
          title: "Location",
          headerLeft: Platform.OS === "ios" ? () => <Back /> : undefined,
          // gestureEnabled: false,
          // fullScreenGestureEnabled: false,
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
