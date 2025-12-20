import { useBookingStore } from "@/store/booking.store";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTicket = () => {
  const bookings = useBookingStore((state) => state.bookings);
  console.log(bookings);
  return (
    <SafeAreaView>
      <View>
        {bookings.map((booking) => (
          <Text>{booking.event.title}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MyTicket;
