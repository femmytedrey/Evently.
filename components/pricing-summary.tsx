import { Booking } from "@/types/bookings.type";
import { formatCurrency } from "@/utils/helper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PricingSummary = ({ booking }: { booking: Booking }) => {
  return (
    <View className="gap-3 p-5 bg-white rounded-3xl">
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-600">Subtotal</Text>
        <Text className="text-lg font-medium text-secondary">
          {formatCurrency(booking.subtotal)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-600">Fees</Text>
        <Text className="text-lg font-medium text-secondary">
          {formatCurrency(booking.fees)}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-base text-gray-600">Tax (4%)</Text>
        <Text className="text-lg font-medium text-secondary">
          {formatCurrency(booking.tax)}
        </Text>
      </View>

      <View className="h-px my-1 bg-gray-200" />

      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-secondary">Total</Text>
        <Text className="text-2xl font-medium text-secondary">
          {formatCurrency(booking.total)}
        </Text>
      </View>
    </View>
  );
};

export default PricingSummary;

const styles = StyleSheet.create({});
