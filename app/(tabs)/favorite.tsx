import CategoryFilter from "@/components/category-filter";
import EventListCard from "@/components/event-list-card";
import InputField from "@/components/input-field";
import { Colors } from "@/constants/colors";
import { useFilteredEvents } from "@/hooks/use-filtered-event.hook";
import { useEventStore } from "@/store/event.store";
import { Search } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorite = () => {
  const searchQuery = useEventStore((state) => state.searchQuery);
  const setSearchQuery = useEventStore((state) => state.setSearchQuery);
  const activeCategory = useEventStore((state) => state.activeCategory);
  const setActiveCategory = useEventStore((state) => state.setActiveCategory);
  const toggleFavorite = useEventStore((state) => state.toggleFavorite);

  const favoriteEvents = useFilteredEvents({
    favoritesOnly: true,
    includeSearch: true,
  });

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <View className="flex-1">
        <View className="py-5">
          <View className="px-5" style={{ marginBottom: 18 }}>
            <InputField
              placeholder="Search Event"
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
          {favoriteEvents.length > 0 ? (
            <EventListCard
              events={favoriteEvents}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <View className="items-center justify-center flex-1 p-5">
              <View className="items-center justify-center w-32 h-32 mb-6 bg-gray-100 rounded-full">
                <Text className="text-6xl">!</Text>
              </View>
              <Text className="mb-2 text-2xl font-medium text-center text-secondary">
                Oops!
              </Text>
              <Text className="text-base text-center text-gray-500">
                There are no events you saved
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favorite;