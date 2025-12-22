import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("auth-token");
      await AsyncStorage.removeItem("auth-user");
      router.replace("/(auth)/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} className="mr-5 rounded-lg">
      <Text className="text-lg text-primary">
        {isLoading ? "Logging out" : "Logout"}
      </Text>
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({});
