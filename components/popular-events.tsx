import { popularEvents } from "@/constants/data";
import { Image } from "expo-image";
import { Heart } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SectionTitle from "./section-title";

const PopularEvents = () => {
  return (
    <View className="flex-1 gap-5">
      <SectionTitle
        title="Popular Events"
        onPress={() => console.log("Popular events clicked")}
      />

      <View className="gap-4 px-5">
        {popularEvents.map((event) => (
          <Pressable
            key={event.id}
            className="flex-row items-center gap-4 p-3 bg-white rounded-xl"
          >
            <View
              style={{ width: 82, height: 82 }}
              className="overflow-hidden rounded-xl"
            >
              <Image
                source={event.image}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
            <View className="flex-1 ">
              <Text className="text-xl text-secondary">{event.title}</Text>
              <Text className="text-xl text-primary">
                {`$${event.price.min}.00`} - {`$${event.price.max}.00`}
              </Text>
              <Text className="text-lg text-gray-500">{event.location}</Text>
            </View>
            <View>
              <Heart color="#6B7280" strokeWidth={1.5} size={24} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default PopularEvents;
