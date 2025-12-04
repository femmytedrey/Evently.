import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
}

const AuthHeader = ({ title, icon, description }: AuthHeaderProps) => {
  return (
    <View className="items-center gap-6">
      <View className="items-center justify-center w-16 h-16 rounded-2xl bg-primary">
        {icon}
      </View>

      <View className="items-center gap-2">
        <Text className="text-3xl text-gray-600">{title}</Text>
        {description && (
          <Text className="text-lg text-center text-gray-400">{description}</Text>
        )}
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({});
