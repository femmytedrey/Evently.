import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface OAuthProps {
  title: string;
  onPress: () => void;
}

const OAuthButton = ({ title, onPress }: OAuthProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-center gap-2 p-4 border border-primary_outline rounded-xl "
    >
      <View className="w-5 h-5">
        <Image
          source={require("../assets/icons/google.png")}
          contentFit="cover"
          style={{ height: "100%" }}
        />
      </View>
      <Text className="text-lg">Sign up with Google</Text>
    </TouchableOpacity>
  );
};

export default OAuthButton;
