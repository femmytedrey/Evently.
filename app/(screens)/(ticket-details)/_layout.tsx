import Back from "@/components/back";
import { Stack } from "expo-router";
import React from "react";

const TicketLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Detail Ticket",
          headerLeft: () => <Back />,
        }}
      />
    </Stack>
  );
};

export default TicketLayout;
