import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OnboardingLayout;

const styles = StyleSheet.create({});
