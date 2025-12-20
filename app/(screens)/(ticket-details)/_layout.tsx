import { Stack } from "expo-router";
import React from "react";

const TicketLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ headerShown: true, title: "Detail Ticket" }}
      />
    </Stack>
  );
};

export default TicketLayout;
