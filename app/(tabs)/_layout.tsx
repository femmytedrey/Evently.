import { HapticTab } from "@/components/haptic-tab";
import Logout from "@/components/logout";
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
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
            <Heart size={size} color={color} fill={focused ? color : "none"} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-ticket"
        options={{
          title: "My Ticket",
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Ticket color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({ color, size, focused }) => (
            <User size={size} color={color} fill={focused ? color : "none"} />
          ),
          headerRight: () => <Logout />,
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
