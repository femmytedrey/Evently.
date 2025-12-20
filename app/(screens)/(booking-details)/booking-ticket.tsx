import { Colors } from "@/constants/colors";
import { TicketType } from "@/constants/data";
import { TicketTypeId, useBookingStore } from "@/store/booking.store";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Minus, Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingTicket = () => {
  const event = useBookingStore((state) => state.selectedEvent);
  const createBooking = useBookingStore((state) => state.createBooking);

  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] =
    useState<TicketTypeId | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTicketSelect = (ticket: TicketType) => {
    if (ticket.status === "available") {
      setSelectedTicketType(ticket.id);
      setPrice(ticket.price);
      setFee(ticket.fee);
    }
  };

  const handleCreateBooking = async () => {
    if (loading || !selectedTicketType || !price || !fee) return;

    try {
      setLoading(true);
      await createBooking({
        type: selectedTicketType,
        price: price,
        quantity: quantity,
        fee: fee,
      });

      router.push("/(screens)/(booking-details)/details-booking");
    } catch (error) {
      console.error("Booking creation failed:", error);
      Alert.alert("Error", "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !selectedTicketType || !price || !fee || loading;

  if (!event) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 gap-6 px-5 pt-4" edges={["bottom"]}>
        <View
          className="gap-4 p-4 bg-white rounded-xl"
          style={{ width: "100%" }}
        >
          <View className="flex-row items-center gap-3">
            <View
              style={{ width: 82, height: 82 }}
              className="overflow-hidden rounded-xl"
            >
              <Image
                source={event.image}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
            <View className="flex-1 ">
              <Text className="text-xl text-secondary">{event.title}</Text>
              <Text className="text-xl text-primary">
                {`${event.date.month} ${event.date.day}`}
              </Text>
              <Text className="text-lg text-gray-500">{event.location}</Text>
            </View>
          </View>

          <View style={{ height: 1 }} className="bg-gray-300" />

          <View className="gap-2">
            <Text className="text-base text-gray-600">Number of tickets</Text>

            <View
              className="flex-row items-center justify-between p-2 border rounded-xl"
              style={{ borderColor: Colors.primary }}
            >
              <Pressable
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg"
                style={{ backgroundColor: Colors.primary + "10" }}
                disabled={quantity <= 1}
              >
                <Minus
                  size={20}
                  color={quantity <= 1 ? "#ccc" : Colors.primary}
                />
              </Pressable>

              <TextInput
                className="flex-1 text-xl font-medium text-center"
                value={String(quantity)}
                onChangeText={(text: string) => {
                  const num = parseInt(text);
                  if (!isNaN(num) && num > 0) {
                    setQuantity(num);
                  } else if (text === "") {
                    setQuantity(1);
                  }
                }}
                keyboardType="number-pad"
                maxLength={3}
                selectTextOnFocus
              />

              <Pressable
                onPress={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg"
                style={{ backgroundColor: Colors.primary + "10" }}
              >
                <Plus size={20} color={Colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>

        <View className="flex-1 gap-3">
          <Text>Ticket Type</Text>

          {event.ticketTypes.map((ticket) => (
            <Pressable
              key={ticket.id}
              onPress={() => handleTicketSelect(ticket)}
              disabled={ticket.status === "sold-out"}
              className="flex-row items-center justify-between p-4 border rounded-xl"
              style={{
                borderColor:
                  selectedTicketType === ticket.id ? Colors.primary : "#E5E5E5",
                backgroundColor:
                  ticket.status === "sold-out" ? "#F5F5F5" : "white",
                opacity: ticket.status === "sold-out" ? 0.6 : 1,
              }}
            >
              <View className="flex-row items-center flex-1 gap-3">
                {/* Radio button */}
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    width: 24,
                    height: 24,
                    borderWidth: 2,
                    borderColor:
                      selectedTicketType === ticket.id
                        ? Colors.primary
                        : "#D1D5DB",
                  }}
                >
                  {selectedTicketType === ticket.id && (
                    <View
                      className="rounded-full"
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: Colors.primary,
                      }}
                    />
                  )}
                </View>

                {/* Ticket info */}
                <View className="flex-1">
                  <Text className="text-lg font-medium text-secondary">
                    {ticket.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {ticket.status === "sold-out"
                      ? "Sold Out"
                      : `${ticket.available} Ticket Available`}
                  </Text>
                </View>
              </View>

              {/* Price */}
              <View className="items-end">
                <Text className="text-lg font-semibold text-primary">
                  ${ticket.price.toFixed(2)}
                </Text>
                <Text className="text-sm text-gray-500">
                  +${ticket.fee.toFixed(2)} Fee
                </Text>
              </View>
            </Pressable>
          ))}

          {/* <Text>
            {quantity} {selectedTicketType} {price} {fee}
          </Text> */}
        </View>

        <TouchableOpacity
          onPress={handleCreateBooking}
          className="items-center justify-center py-5 rounded-2xl"
          style={{
            backgroundColor: isButtonDisabled ? "gray" : Colors.primary,
            opacity: isButtonDisabled ? 0.6 : 1,
          }}
          disabled={isButtonDisabled}
        >
          <Text className="text-lg text-white">
            {loading ? "Creating..." : "Create Ticket"}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity className="overflow-hidden rounded-2xl">
          <LinearGradient
            colors={[Colors.primary, "#6366F1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: "100%",
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-lg font-semibold text-white">
              Create Booking
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BookingTicket;
