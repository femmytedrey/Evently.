import { Colors } from "@/constants/colors";
import { useBookingStore } from "@/store/booking.store";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailsBooking = () => {
  const currentBooking = useBookingStore((state) => state.currentBooking);
  console.log(currentBooking);

  if (!currentBooking) {
    return;
  }

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <ScrollView
        className="flex-1 px-5 "
        style={{ gap: 27 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 " style={{ gap: 27 }}>
          <View className="gap-6 p-5 mt-4 bg-white rounded-2xl">
            <View
              style={{
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 14,
              }}
            >
              <View
                style={{
                  height: 200,
                  backgroundColor: "red",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={currentBooking.event.image}
                  style={{ height: "100%", width: "100%" }}
                  contentFit="cover"
                />
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-2xl font-semibold text-secondary">
                {currentBooking?.event.title}
              </Text>
              <Text className="text-gray-500">
                Ticket ID: {currentBooking.id}
              </Text>
            </View>
          </View>

          <View className="gap-6 p-5 bg-white rounded-2xl">
            <View className="gap-2">
              <Text className="text-gray-500">Name</Text>
              <Text className="text-xl font-medium text-secondary">
                Adeyemo Oluwafemi
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-gray-500">Detail Location</Text>
              <Text className="text-xl font-medium text-secondary">
                {currentBooking.event.location}
              </Text>
            </View>

            <View className="flex-row gap-3">
              <View className="gap-2" style={{ flex: 1, flexBasis: 0 }}>
                <Text className="text-gray-500">Number of Ticket</Text>
                <Text className="text-xl font-medium text-secondary">
                  x{currentBooking.ticketSelection.quantity}
                </Text>
              </View>
              <View className="gap-2" style={{ flex: 1, flexBasis: 0 }}>
                <Text className="text-gray-500">Date</Text>
                <Text className="text-xl font-medium text-secondary">
                  {`${currentBooking.event.date.month} ${currentBooking.event.date.day}, 2026`}
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-6 p-5 bg-white rounded-2xl">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg text-gray-500">Subtotal</Text>
              <Text className="text-lg text-secondary">{`$${currentBooking.subtotal}`}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg text-gray-500">Fees</Text>
              <Text className="text-lg text-secondary">{`$${currentBooking.fees}`}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg text-gray-500">Tax (4%)</Text>
              <Text className="text-lg text-secondary">{`$${currentBooking.tax}`}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg text-gray-500">Total</Text>
              <Text className="text-lg text-secondary">{`$${currentBooking.total}`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="px-5 mt-5">
        <TouchableOpacity
          onPress={() =>
            router.push("/(screens)/(booking-details)/payment-method")
          }
          className="items-center justify-center py-5 rounded-2xl bg-primary"
        >
          <Text className="text-lg text-white ">Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailsBooking;
