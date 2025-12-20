import Back from "@/components/back";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const BookingDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="booking-ticket"
        options={{
          headerShown: true,
          title: "Booking Ticket",
          headerLeft: () => <Back />,
        }}
      />
      <Stack.Screen
        name="details-booking"
        options={{
          headerShown: true,
          title: "Detail Booking",
          headerLeft: () => <Back />,
        }}
      />
      <Stack.Screen
        name="payment-method"
        options={{
          headerShown: true,
          title: "Payment Method",
          headerLeft: () => <Back />,
        }}
      />
      <Stack.Screen
        name="payment-success"
        options={{
          headerShown: false,
          gestureEnabled: false,
          // headerLeft: () => <Back />,
        }}
      />
    </Stack>
  );
};

export default BookingDetailsLayout;

const styles = StyleSheet.create({});
