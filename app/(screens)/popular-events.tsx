import CategoryFilter from "@/components/category-filter";
import EventListCard from "@/components/event-list-card";
import InputField from "@/components/input-field";
import { Colors } from "@/constants/colors";
import { useFilteredEvents } from "@/hooks/use-filtered-event.hook";
import { useEventStore } from "@/store/event.store";
import { Search } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const PopularEvents = () => {
  const searchQuery = useEventStore((state) => state.searchQuery);
  const setSearchQuery = useEventStore((state) => state.setSearchQuery);
  const activeCategory = useEventStore((state) => state.activeCategory);
  const setActiveCategory = useEventStore((state) => state.setActiveCategory);
  const toggleFavorite = useEventStore((state) => state.toggleFavorite);
  const categories = useEventStore((state) => state.categories);

  const popularEvents = useFilteredEvents({
    section: "popular",
    includeSearch: true,
  });

  return (
    <View className="flex-1">
      <View className="py-5">
        <View className="px-5" style={{ marginBottom: 18 }}>
          <InputField
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={(focused) => (
              <Search color={focused ? Colors.primary : Colors.black} />
            )}
          />
        </View>
        <CategoryFilter
          activeFilter={activeCategory}
          onFilterChange={setActiveCategory}
        />
      </View>

      <ScrollView className="flex-1">
        {popularEvents.length ? (
          <EventListCard
            events={popularEvents}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <View className="p-5 ">
            <Text className="text-xl text-center">
              Result for{" "}
              <Text className="font-semibold">
                "{searchQuery || categories[activeCategory].name}"
              </Text>{" "}
              not found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PopularEvents;
