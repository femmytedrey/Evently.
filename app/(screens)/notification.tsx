import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const Notification = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     console.log("=== NOTIFICATION SCREEN ===");
//     console.log("canGoBack():", navigation.canGoBack());
//     console.log("current navigator state:", navigation.getState?.());
//   }, [navigation]);

  return (
    <View className="items-center justify-center flex-1 bg-purple-500">
      <Text className="text-2xl text-white">Notification</Text>
    </View>
  );
};

export default Notification;
