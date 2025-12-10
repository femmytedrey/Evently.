import { LocationData } from "@/constants/data";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface LocationSearchResultProps {
    searchQuery: string;
    filteredLocations: LocationData[];
    onHandleSelectLocation: (item: LocationData) => void;
}

const LocationSearchResult = ({ searchQuery, filteredLocations, onHandleSelectLocation}: LocationSearchResultProps) => {
  return (
    <ScrollView className="flex-1">
      {searchQuery.length > 0 && (
        <>
          {filteredLocations.length > 0 && (
            <Text
              className="px-5 pt-4 pb-2 text-gray-400"
              style={{ letterSpacing: 2 }}
            >
              SEARCH RESULT
            </Text>
          )}

          {filteredLocations.length > 0 ? (
            filteredLocations.map((item) => (
              <View key={item.id} className="px-5 py-2">
                <Pressable
                  onPress={() => onHandleSelectLocation(item)}
                  className="flex-row items-center"
                  style={{ gap: 12 }}
                >
                  <MapPin size={20} color="#6B7280" />
                  <View className="flex-1">
                    <Text className="text-lg font-semibold">{item.city}</Text>
                    <Text className="text-gray-500">
                      {item.region}, {item.country}
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))
          ) : (
            <Text className="mt-10 text-center text-gray-500">
              No locations found
            </Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default LocationSearchResult;
