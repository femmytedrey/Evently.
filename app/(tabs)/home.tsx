import CategoryFilter from "@/components/category-filter";
import EventListCard from "@/components/event-list-card";
import InputField from "@/components/input-field";
import Location from "@/components/location";
import PopularEvents from "@/components/popular-events.component";
import UpcomingEvents from "@/components/upcoming-events.component";
import { Colors } from "@/constants/colors";
import { useFilteredEvents } from "@/hooks/use-filtered-event.hook";
import { useEventStore } from "@/store/event.store";
import { useUnreadCount } from "@/store/notification.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Bell, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
  id: string;
  email: string;
};

const Home = () => {
  const unreadCount = useUnreadCount();

  const {
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
    toggleFavorite,
  } = useEventStore();

  const events = useFilteredEvents({ includeSearch: true });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
        <View className="flex-row justify-between px-5 py-5">
          <Location />

          <Pressable
            onPress={() => router.push("/(screens)/notification")}
            className="p-3 rounded-full bg-primary/10 w-fit"
          >
            <View className="relative">
              <Bell fill="#13123A" />
              {unreadCount > 0 ? (
                <View className="absolute items-center justify-center w-5 h-5 border border-white rounded-full -right-1.5 bg-primary -top-1.5">
                  <Text className="text-sm text-white">{unreadCount}</Text>
                </View>
              ) : null}
            </View>
          </Pressable>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-6 ">
            <View className="px-5 ">
              <InputField
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search"
                icon={(focused) => (
                  <Search color={focused ? Colors.primary : Colors.black} />
                )}
              />
            </View>

            {searchQuery && (
              <CategoryFilter
                activeFilter={activeCategory}
                onFilterChange={setActiveCategory}
              />
            )}
          </View>

          {searchQuery.trim() !== "" ? (
            <View className="pt-5">
              {events.length > 0 ? (
                <EventListCard
                  events={events}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <View className="items-center justify-center pt-8">
                  <Text className="text-xl font-semibold">
                    No events found matching "{searchQuery}"
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <>
              <UpcomingEvents />
              <PopularEvents />
            </>
          )}
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
