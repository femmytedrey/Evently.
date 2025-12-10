import { router } from "expo-router";
import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Back = () => {
  return (
    <Pressable
      onPress={() => router.back()}
      className="flex-row items-center gap-1"
    >
      <ArrowLeft size={24} color="#000" />
      {/* <Text className="text-lg">Back</Text> */}
    </Pressable>
  );
};

export default Back;

const styles = StyleSheet.create({});
