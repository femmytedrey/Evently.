import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OtpSuccess = ({ countdown }: { countdown: number }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1 gap-5">
        <MaterialIcons name="verified" size={70} color="#7952FC" />
        <View className="items-center gap-2">
          <Text className="text-2xl font-medium text-gray">
            Verified Successfully
          </Text>

          <Text>Redirecting in {countdown} secs</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpSuccess;

const styles = StyleSheet.create({});
