import { PAYMENT_METHODS, PaymentMethodType } from "@/constants/data";
import { useBookingStore } from "@/store/booking.store";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const PaymentMethod = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("2");
  const [loading, setLoading] = useState(false);
  const clearBooking = useBookingStore((state) => state.clearBooking);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(balance);
  };

  const renderPaymentCard = ({ item }: { item: PaymentMethodType }) => {
    const isSelected = selectedPaymentId === item.id;

    return (
      <TouchableOpacity
        onPress={() => setSelectedPaymentId(item.id)}
        className={`flex-row items-center gap-5 p-5 bg-white rounded-2xl ${
          isSelected ? "border-2 border-primary" : "border-2 border-transparent"
        }`}
      >
        <View className="items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Image
            source={item.icon}
            style={{ width: 40, height: 40 }}
            contentFit="contain"
          />
        </View>

        <View className="flex-1 gap-1.5">
          <Text className="text-xl font-medium">{item.name}</Text>
          <Text className="text-base text-gray-500">
            {item.email || item.cardNumber}
          </Text>
          <View>
            <Text className="text-sm text-gray-500">
              Balance:{" "}
              <Text className="text-base font-medium text-primary">
                {formatBalance(item.balance)}
              </Text>
            </Text>
          </View>
        </View>

        <View
          className={`w-8 h-8 p-1 border-2 rounded-full ${
            isSelected ? "border-primary" : "border-gray-300"
          }`}
        >
          <View
            style={{ width: "100%", height: "100%" }}
            className={`rounded-full ${isSelected ? "bg-primary" : ""}`}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleCheckout = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.dismissTo("/(tabs)/my-ticket");

      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Payment Successful!",
          text2: "Your ticket is ready. Check it below.",
          position: "top",
          visibilityTime: 5000,
          topOffset: 60,
        });
      }, 300);

      clearBooking();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: "Please try again",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5" edges={["bottom"]}>
      <View className="flex-1 gap-4 mt-4">
        <Text className="text-xl font-semibold">Select Payment Method</Text>

        <FlatList
          data={PAYMENT_METHODS}
          keyExtractor={(item) => item.id}
          renderItem={renderPaymentCard}
          contentContainerStyle={{ gap: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View className="py-5">
        <TouchableOpacity
          onPress={handleCheckout}
          disabled={loading}
          className="items-center justify-center py-5 rounded-2xl bg-primary"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          <Text className="text-lg font-semibold text-white">
            {loading ? "Processing..." : "Confirm Payment"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethod;
