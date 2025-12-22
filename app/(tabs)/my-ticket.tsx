import { Colors } from "@/constants/colors";
import { useBookingStore } from "@/store/booking.store";
import { Booking } from "@/types/bookings.type";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Calendar, ChevronRight, TicketX } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, ListRenderItem, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTicket = () => {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const getActiveBookings = useBookingStore((state) => state.getActiveBookings);
  const getPastBookings = useBookingStore((state) => state.getPastBookings);

  const activeBookings = useMemo(
    () => getActiveBookings(),
    [getActiveBookings]
  );
  const pastBookings = useMemo(() => getPastBookings(), [getPastBookings]);

  const displayedBookings =
    activeTab === "active" ? activeBookings : pastBookings;

  const renderTicketCard: ListRenderItem<Booking> = ({ item }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(screens)/(ticket-details)/[id]",
          params: { id: item.id },
        })
      }
      className="gap-5 p-5 bg-white rounded-2xl"
    >
      <View
        style={{
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View
          style={{ height: 180 }}
          className="relative overflow-hidden rounded-xl"
        >
          <Image
            source={item.event.image}
            style={{ height: "100%", width: "100%" }}
            contentFit="cover"
          />

          <View className="absolute items-center p-2 bg-white rounded-lg top-3 left-3">
            <Text className="text-gray-500">{item.event.date.month}</Text>
            <Text className="font-medium">{item.event.date.day}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-1 gap-1.5">
          <Text className="text-xl font-semibold text-secondary">
            {item.event.title}
          </Text>
          <Text className="text-base text-gray-500">Ticket ID: {item.id}</Text>
        </View>

        <View className="items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <ChevronRight color={Colors.primary} size={20} />
        </View>
      </View>
    </Pressable>
  );

  const EmptyState = () => (
    <View className="items-center justify-center flex-1 px-8">
      <View className="items-center justify-center w-24 h-24 mb-6 bg-gray-100 rounded-full">
        {activeTab === "active" ? (
          <TicketX size={48} color={Colors.primary} strokeWidth={1.5} />
        ) : (
          <Calendar size={48} color={Colors.primary} strokeWidth={1.5} />
        )}
      </View>

      <Text className="mb-2 text-2xl font-semibold text-center text-secondary">
        {activeTab === "active" ? "No Active Tickets" : "No Past Tickets"}
      </Text>

      <Text className="text-lg leading-6 text-center text-gray-500">
        {activeTab === "active"
          ? "You don't have any active tickets yet. Browse events and book your first ticket!"
          : "Your past tickets will appear here once they expire."}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" edges={[]}>
      <View className="px-5 pt-5 pb-4 bg-gray-50">
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setActiveTab("active")}
            className={`items-center py-4 rounded-2xl ${
              activeTab === "active" ? "bg-primary" : "bg-gray-200"
            }`}
            style={{ flex: 1, flexBasis: 0 }}
          >
            <Text
              className={`text-lg font-semibold ${
                activeTab === "active" ? "text-white" : "text-secondary"
              }`}
            >
              Active Ticket
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("past")}
            className={`items-center py-4 rounded-2xl ${
              activeTab === "past" ? "bg-primary" : "bg-gray-200"
            }`}
            style={{ flex: 1, flexBasis: 0 }}
          >
            <Text
              className={`text-lg font-semibold ${
                activeTab === "past" ? "text-white" : "text-secondary"
              }`}
            >
              Past Ticket
            </Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={displayedBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderTicketCard}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </SafeAreaView>
  );
};

export default MyTicket;
