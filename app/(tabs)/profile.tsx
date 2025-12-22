import { Colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  Settings,
  Shield,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
  id: string;
  email: string;
};

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  route?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const getUser = async () => {
    try {
      setLoadingUser(true);
      const userString = await AsyncStorage.getItem("auth-user");
      if (userString) {
        const userData = JSON.parse(userString);
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to get user", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "1",
      title: "Edit Profile",
      icon: <User size={20} color={Colors.primary} />,
      // route: "/(screens)/edit-profile",
    },
    {
      id: "2",
      title: "Account Security",
      icon: <Shield size={20} color={Colors.primary} />,
      route: "/(screens)/account-security",
    },
    {
      id: "3",
      title: "Payment Settings",
      icon: <CreditCard size={20} color={Colors.primary} />,
      // No route - just UI
    },
    {
      id: "4",
      title: "General Settings",
      icon: <Settings size={20} color={Colors.primary} />,
      // No route - just UI
    },
    {
      id: "5",
      title: "Help Centre",
      icon: <HelpCircle size={20} color={Colors.primary} />,
      // No route - just UI
    },
  ];

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      console.log(`${item.title} pressed`);
    }
  };

  return (
    <SafeAreaView className="flex-1 pt-7" edges={[]}>
      <View className="flex-1">
        <View className="px-5">
          <View className="items-center gap-3 p-6 mb-6">
            <View className="items-center justify-center w-24 h-24 rounded-full bg-primary">
              <User size={48} color="white" strokeWidth={2} />
            </View>

            <View className="items-center gap-1">
              <Text className="text-2xl font-semibold text-secondary">
                Franklin Clinton
              </Text>
              <Text className="text-base text-gray-500">
                {user?.email || "franklinclinton@gmail.com"}
              </Text>
            </View>
          </View>

          <View className="gap-3">
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleMenuPress(item)}
                className="flex-row items-center justify-between p-4 bg-white rounded-2xl active:bg-gray-50"
              >
                <View className="flex-row items-center gap-4">
                  <View className="items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {item.icon}
                  </View>
                  <Text className="text-lg font-medium text-secondary">
                    {item.title}
                  </Text>
                </View>

                <ChevronRight size={20} color={"gray"} />
              </Pressable>
            ))}
          </View>

          <Text className="mt-6 text-sm text-center text-gray-400">
            App version 1.0.0.1
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
