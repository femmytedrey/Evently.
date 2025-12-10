import InputField from "@/components/input-field";
import Location from "@/components/location";
import PopularEvents from "@/components/popular-events";
import UpcomingEvents from "@/components/upcoming-events";
import { Colors } from "@/constants/colors";
import { categories } from "@/constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Bell, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
  id: string;
  email: string;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("auth-token");
      await AsyncStorage.removeItem("auth-user");
      router.replace("/(auth)/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 gap-5">
        <View className="flex-row justify-between px-5 pt-4">
          <Location />

          <Pressable
            onPress={() => router.push("/(screens)/notification")}
            className="p-3 rounded-full bg-primary/10 w-fit"
          >
            <View className="relative">
              <Bell fill="#13123A" />
              <View className="absolute items-center justify-center w-5 h-5 border border-white rounded-full -right-1.5 bg-primary -top-1.5">
                <Text className="text-sm text-white">5</Text>
              </View>
            </View>
          </Pressable>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-6 ">
            <View className="px-5 pt-5">
              <InputField
                placeholder="Search"
                icon={(focused) => (
                  <Search color={focused ? Colors.primary : Colors.black} />
                )}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-5"
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveFilter(index)}
                  className={`flex-row items-center gap-2 px-4 py-3 mr-2  rounded-3xl ${
                    activeFilter === index
                      ? "bg-primary"
                      : "bg-transparent border border-primary_outline"
                  }`}
                >
                  <category.icon
                    color={activeFilter === index ? "white" : "#13123A"}
                    size={18}
                  />
                  <Text
                    className={`text-xl ${
                      activeFilter === index ? "text-white" : "text-secondary"
                    } capitalize`}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <UpcomingEvents />

          <PopularEvents />
        </ScrollView>
        {/* {loadingUser ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text className="text-2xl">Hello - {user?.email || "Guest"}</Text>
        )}
        <Button
          title={isLoading ? "Signing Out..." : "Sign Out"}
          disabled={isLoading}
          onPress={handleLogout}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;
