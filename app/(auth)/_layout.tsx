import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <Stack initialRouteName="signup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="forgot-password"  />
      <Stack.Screen name="create-new-password"  />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
