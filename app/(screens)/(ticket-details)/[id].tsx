import PricingSummary from "@/components/pricing-summary";
import { Colors } from "@/constants/colors";
import { PAYMENT_METHODS } from "@/constants/data";
import { useBookingStore } from "@/store/booking.store";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Download } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TicketDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = useBookingStore((state) => state.getBookingById(id));

  if (!booking) {
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Text className="text-xl text-gray-500">Ticket not found</Text>
      </SafeAreaView>
    );
  }

  // Hardcoded for now - will connect to actual payment method later
  const paymentMethod = PAYMENT_METHODS.find((pm) => pm.id === "2"); // Apple Pay

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 30,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Image Card */}
          <View className="p-5 bg-white rounded-3xl">
            <View
              style={{
                shadowColor: Colors.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 10,
              }}
            >
              <View
                style={{ height: 200 }}
                className="overflow-hidden rounded-2xl"
              >
                <Image
                  source={booking.event.image}
                  style={{ height: "100%", width: "100%" }}
                  contentFit="cover"
                />
              </View>
            </View>

            {/* Event Title & Ticket ID - Inside image card */}
            <View className="gap-2 mt-5">
              <Text className="text-2xl font-semibold text-secondary">
                {booking.event.title}
              </Text>
              <Text className="text-base text-gray-500">
                Ticket ID: #{booking.id}
              </Text>
            </View>
          </View>

          {/* Details Card */}
          <View className="gap-4 p-5 bg-white rounded-3xl">
            {/* Name & Detail Location */}
            <View className="flex-row gap-4">
              <View className="gap-2" style={{ flex: 1, flexBasis: 0 }}>
                <Text className="text-sm text-gray-500">Name</Text>
                <Text className="text-lg font-medium text-secondary">
                  Franklin Clinton
                </Text>
              </View>
              <View className="gap-2" style={{ flex: 1, flexBasis: 0 }}>
                <Text className="text-sm text-gray-500">Detail Location</Text>
                <Text className="text-lg font-medium text-secondary">
                  {booking.event.location}
                </Text>
              </View>
            </View>

            {/* Number of Ticket & Date */}
            <View className="flex-row gap-4">
              <View className="gap-2" style={{ flex: 1, flexBasis: 0 }}>
                <Text className="text-sm text-gray-500">Number of Ticket</Text>
                <Text className="text-lg font-medium text-secondary">
                  x{booking.ticketSelection.quantity}
                </Text>
              </View>
              <View className="gap-2" style={{ flex: 1, flexBasis: 0 }}>
                <Text className="text-sm text-gray-500">Date</Text>
                <Text className="text-lg font-medium text-secondary">
                  {`${booking.event.date.month} ${booking.event.date.day}, ${booking.event.date.year}`}
                </Text>
              </View>
            </View>
          </View>

          {/* Barcode Card - We'll implement this together */}
          <View className="p-5 bg-white rounded-3xl">
            <View className="items-center justify-center">
              <Barcode
                value={booking.id}
                format="CODE128"
                width={2.3}
                height={100}
                // text={booking.id}
                textStyle={{ fontSize: 12, marginTop: 10 }}
                background="#FFFFFF"
                lineColor="#000000"
              />
            </View>
          </View>
        </View>

        {/* Pricing Card */}
        <PricingSummary booking={booking} />

        {paymentMethod && (
          <View className="flex-row items-center justify-between gap-3 p-5 bg-white rounded-3xl">
            <Text className="text-lg text-gray-500">Payment Method</Text>
            <View className="flex-row items-center gap-3">
              <View className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <Image
                  source={paymentMethod.icon}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain"
                />
              </View>
              <Text className="text-lg font-medium text-secondary">
                {paymentMethod.name}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="px-5 py-5 ">
        <TouchableOpacity
          onPress={() => console.log("Download ticket")}
          className="flex-row items-center justify-center gap-3 py-5 rounded-2xl bg-primary"
        >
          <Download color="white" size={20} />
          <Text className="text-lg font-semibold text-white">
            Download Ticket
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TicketDetails;
