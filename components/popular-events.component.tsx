import { useFilteredEvents } from "@/hooks/use-filtered-event.hook";
import { useEventStore } from "@/store/event.store";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import EventListCard from "./event-list-card";
import SectionTitle from "./section-title";

const PopularEvents = () => {
  const toggleFavorite = useEventStore((state) => state.toggleFavorite);

  const popularEvents = useFilteredEvents({
    section: "popular",
    limit: 3,
  });

  return (
    <View className="flex-1 gap-5 ">
      <SectionTitle
        title="Popular Events"
        onPress={() => router.push("/(screens)/popular-events")}
      />

      <EventListCard events={popularEvents} onToggleFavorite={toggleFavorite} />
    </View>
  );
};

export default PopularEvents;
