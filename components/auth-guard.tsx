import { useAuthStore } from "@/store/auth.tstore";
import { Redirect, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const { isAuthenticated, hasSeenOnboarding, isLoading, checkAuth } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator />;
      </View>
    );
  }

  const inAuthGroup = segments[0] === "(auth)";
  const inTabsGroup = segments[0] === "(tabs)";
  const inOnboarding = segments[0] === "(onboarding)";

  // Redirect logic
  if (!hasSeenOnboarding && !inOnboarding) {
    return <Redirect href="/(onboarding)/onboarding" />;
  }

  if (!isAuthenticated && !inAuthGroup && hasSeenOnboarding) {
    return <Redirect href="/(auth)/signup" />;
  }

  if (isAuthenticated && inAuthGroup) {
    return <Redirect href="/(tabs)/home" />;
  }

  if (isAuthenticated && inOnboarding) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <>{children}</>;
}
