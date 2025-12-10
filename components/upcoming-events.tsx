import { Colors } from "@/constants/colors";
import { upcomingEvents } from "@/constants/data";
import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import SectionTitle from "./section-title";

const UpcomingEvents = () => {
  return (
    <View className="gap-5">
      <SectionTitle
        title="Upcoming Events"
        onPress={() => console.log("Upcoming events clicked")}
      />

      <ScrollView
        horizontal
        className="pl-5"
        showsHorizontalScrollIndicator={false}
      >
        {upcomingEvents.map((event, index) => (
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
            onPress={() => console.log(event.title)}
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
              <Text className="text-lg text-gray-500">Yogyakarta</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingEvents;
