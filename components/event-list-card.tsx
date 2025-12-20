import { Colors } from "@/constants/colors";
import { Event } from "@/constants/data";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface EventListCardProps {
  events: Event[];
  onToggleFavorite: (eventId: string) => void;
}

const EventListCard = ({ events, onToggleFavorite }: EventListCardProps) => {
  return (
    <View className="gap-4 px-5">
      {events.map((event) => (
        <Pressable
          key={event.id}
          onPress={() =>
            router.push({
              pathname: "/(screens)/(booking-details)/[id]",
              params: { id: event.id },
            })
          }
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
          <Pressable onPress={() => onToggleFavorite(event.id)}>
            <Heart
              color={event.favorite ? Colors.red : "#6B7280"}
              fill={event.favorite ? Colors.red : "transparent"}
              strokeWidth={1.5}
              size={24}
            />
          </Pressable>
        </Pressable>
      ))}
    </View>
  );
};

export default EventListCard;
