import { useBookingStore } from "@/store/booking.store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DetailsBooking = () => {
  const currentBooking = useBookingStore((state) => state.currentBooking);
  return (
    <View>
      <Text>Booked - {currentBooking?.event.title}</Text>
    </View>
  );
};

export default DetailsBooking;

const styles = StyleSheet.create({});
