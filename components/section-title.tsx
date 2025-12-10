import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SectionTitleProps {
  title: string;
  onPress: () => void;
}
const SectionTitle = ({ title, onPress }: SectionTitleProps) => {
  return (
    <View className="flex-row items-center justify-between px-5 pt-5">
      <Text className="text-xl font-semibold text-secondary">{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-lg text-primary">See all events</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({});
