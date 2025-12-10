import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}
const ModalHeader = ({ title, onClose}: ModalHeaderProps) => {
  return (
    <View className="relative flex-row items-center px-5 py-4 bg-white border-b border-gray-200">
      <Pressable
        onPress={onClose}
        className="absolute z-10 p-2 left-5"
      >
        <ArrowLeft size={24} color="#000" />
      </Pressable>

      <View className="flex-1">
        <Text className="text-xl font-semibold text-center">{title}</Text>
      </View>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({});
