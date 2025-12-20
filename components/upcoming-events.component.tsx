import { Colors } from "@/constants/colors";
import { useFilteredEvents } from "@/hooks/use-filtered-event.hook";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import SectionTitle from "./section-title";

const UpcomingEvents = () => {
  const upcomingEvents = useFilteredEvents({
    section: "upcoming",
    limit: 4,
  });

  return (
    <View className="gap-5">
      <SectionTitle
        title="Upcoming Events"
        onPress={() => router.push("/(screens)/upcoming-events")}
      />

      <ScrollView
        horizontal
        className="pl-5"
        showsHorizontalScrollIndicator={false}
      >
        {upcomingEvents.map((event) => (
          <Pressable
            className="gap-5 mr-6"
            key={event.id}
            style={{
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 14,
            }}
            onPress={() =>
              router.push({
                pathname: "/(screens)/(booking-details)/[id]",
                params: { id: event.id },
              })
            }
          >
            <View className="relative h-[200px] w-[250px] bg-purple-200 rounded-xl overflow-hidden">
              <Image
                source={event.image}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
              <View className="absolute items-center justify-center bg-white rounded-lg w-14 h-14 left-3 top-3">
                <Text>{event.date.month}</Text>
                <Text className="text-xl font-semibold">{event.date.day}</Text>
              </View>
            </View>

            <View>
              <Text className="text-xl text-secondary">{event.title}</Text>
              <Text className="text-xl text-primary">
                {`$${event.price.min}.00`} - {`$${event.price.max}.00`}
              </Text>
              <Text className="text-lg text-gray-500">{event.location}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingEvents;
