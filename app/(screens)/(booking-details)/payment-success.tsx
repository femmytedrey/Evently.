import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { DollarSign } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentSuccess = () => {
  return (
    <SafeAreaView className="flex-1 px-5" edges={["bottom"]}>
      <View className="items-center justify-center flex-1 gap-5">
        <View className="p-5 bg-primary/10 rounded-2xl">
          <DollarSign color={Colors.primary} size={32} />
        </View>
        <View className="gap-2">
          <Text className="text-2xl font-semibold text-center text-medium">
            Payment Successful!
          </Text>
          <Text className="text-lg text-center text-gray-500">
            Please check your ticket in the My Ticket menu
          </Text>
        </View>
      </View>
      <View className="mt-5 ">
        <TouchableOpacity
          onPress={() => router.dismissTo("/(tabs)/my-ticket")}
          className="items-center justify-center py-5 rounded-2xl bg-primary"
        >
          <Text className="text-lg text-white ">Check Ticket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
