import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/colors";
import { Tabs } from "expo-router";
import { Heart, House, Ticket, User } from "lucide-react-native";
import React from "react";

const MainLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
          tabBarIcon: ({ focused, color, size }) => (
            <Heart size={size} color={color} fill={focused ? color : "none"} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-ticket"
        options={{
          title: "My Ticket",
          tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <User size={size} color={color} fill={focused ? color : "none"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
