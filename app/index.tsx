import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("auth-token");
      setIsAuth(!!token);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#7952FC]">
        <Text className="text-3xl font-bold text-white">
          Loading application...
        </Text>
      </View>
    );
  }

  if (!isAuth) {
    return <Redirect href={"/(auth)/signup"} />;
  }

  return (
    <Redirect href={"/(tabs)/home"} />
    // <View className="flex-1 items-center justify-center bg-[#7952FC]">
    //   <Text className="text-3xl font-bold text-white">Evently</Text>
    // </View>
  );
}

const styles = StyleSheet.create({});
