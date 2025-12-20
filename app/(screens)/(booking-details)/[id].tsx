import EventDetailsHeader from "@/components/event-details.header";
import MapViewComponent from "@/components/map-view";
import { Colors } from "@/constants/colors";
import { useCollapsibleHeader } from "@/hooks/use-collapsible-header";
import { useBookingStore } from "@/store/booking.store";
import { useEventById, useEventStore } from "@/store/event.store";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Calendar,
  DollarSign,
  Heart,
  MapPin,
  Music,
  User2,
} from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = useEventById(id);
  const toggleFavorite = useEventStore((state) => state.toggleFavorite);
  const setSelectedEvent = useBookingStore((state) => state.setSelectedEvent);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 150;

  const descriptionText = isExpanded
    ? event?.description
    : event?.description?.slice(0, maxDescriptionLength);

  const {
    scrollHandler,
    headerAnimatedStyle,
    imageAnimatedStyle,
    HEADER_MAX_HEIGHT,
  } = useCollapsibleHeader({
    maxHeight: 350,
    minHeight: 150,
  });

  const shouldTruncate =
    (event?.description?.length || 0) > maxDescriptionLength;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const capitalize = (str?: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!event) {
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Text>No Event found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <StatusBar style="light" />
      <EventDetailsHeader
        headerAnimatedStyle={headerAnimatedStyle}
        imageAnimatedStyle={imageAnimatedStyle}
        image={event?.image as string}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + 20 }}
      >
        <View className="flex-1 gap-6 px-5">
          <View
            className="flex-row items-center p-3 px-4 rounded-full bg-primary"
            style={{ alignSelf: "flex-start" }}
          >
            <Music size={20} color={"white"} style={{ marginRight: 4 }} />
            <Text className="text-xl text-white">
              {capitalize(event?.category)}
            </Text>
          </View>

          <Text className="text-2xl font-medium ">{event?.title}</Text>

          <View className="flex-row justify-between p-5 bg-white divide-x py-7 rounded-xl">
            <View
              className="items-center px-3"
              style={{ flex: 1, minWidth: 0 }}
            >
              <View className="flex-row items-center mb-3" style={{ gap: 5 }}>
                <DollarSign size={15} color={Colors.primary} />
                <Text className="text-xl text-gray-500">Price</Text>
              </View>

              <View>
                <Text
                  className="text-lg font-medium text-primary"
                  numberOfLines={1}
                >
                  ${event?.price.min}.00
                </Text>
              </View>
            </View>

            <View className="mx-2 bg-gray-300" style={{ width: 1 }} />

            <View
              className="items-center px-3"
              style={{ flex: 1, minWidth: 0 }}
            >
              <View className="flex-row items-center mb-3" style={{ gap: 5 }}>
                <Calendar size={15} color={Colors.primary} />
                <Text className="text-xl text-gray-500">Date</Text>
              </View>

              <View>
                <Text
                  className="text-lg font-medium text-primary"
                  numberOfLines={1}
                >
                  {`${event?.date?.month} ${event?.date?.day}`}
                </Text>
              </View>
            </View>

            <View className="mx-2 bg-gray-300" style={{ width: 1 }} />

            <View
              className="items-center px-3"
              style={{ flex: 1, minWidth: 0 }}
            >
              <View className="flex-row items-center mb-3" style={{ gap: 5 }}>
                <MapPin size={15} color={Colors.primary} />
                <Text className="text-xl text-gray-500">Location</Text>
              </View>

              <View>
                <Text
                  className="text-lg font-medium text-primary"
                  numberOfLines={1}
                >
                  {event?.location}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="items-center justify-center w-12 h-12 rounded-full bg-primary">
              <User2 color={"white"} />
            </View>
            <View className="flex-1 gap-1">
              <Text className="text-xl">Michael De Santa</Text>
              <Text className="text-gray-500">Organizer</Text>
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-lg font-medium">About this event:</Text>
            <Text className="leading-6 text-gray-500">
              {descriptionText}
              {!isExpanded && shouldTruncate && "..."}
            </Text>
            {shouldTruncate && (
              <TouchableOpacity onPress={toggleReadMore}>
                <Text className="underline text-primary">
                  {isExpanded ? "Read less" : "Read More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-lg font-medium">Location:</Text>
              <Text className="text-gray-500">{event?.location}</Text>
            </View>
            <View>{event && <MapViewComponent event={event} />}</View>
          </View>
        </View>
      </Animated.ScrollView>

      <View className="flex-row gap-3 px-5" style={{ paddingTop: 10 }}>
        <TouchableOpacity
          onPress={() => toggleFavorite(event?.id as string)}
          className="items-center justify-center bg-primary/10 rounded-xl"
          style={{ width: 56, height: 56, borderColor: Colors.primary }}
        >
          <Heart
            color={event?.favorite ? Colors.primary : "#6B7280"}
            fill={event?.favorite ? Colors.primary : "transparent"}
            strokeWidth={1.5}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedEvent(event);
            router.push("/(screens)/(booking-details)/booking-ticket");
          }}
          className="items-center justify-center flex-1 rounded-2xl"
          style={{ backgroundColor: Colors.primary }}
        >
          <Text className="text-lg font-semibold text-white">
            Booking Ticket
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingDetails;

// import { Colors } from "@/constants/colors";
// import React, { useEffect, useRef } from "react";
// import { Animated, StyleSheet, View } from "react-native";

// const BookingDetails = () => {
//   const progress = useRef(new Animated.Value(0.5)).current;
//   const scale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.parallel([
//         Animated.sequence([
//           Animated.timing(progress, {
//             toValue: 1,
//             useNativeDriver: true,
//             duration: 900,
//           }),
//           Animated.timing(progress, {
//             toValue: 0.5,
//             useNativeDriver: true,
//             duration: 900,
//           }),
//         ]),

//         Animated.sequence([
//           Animated.timing(scale, {
//             toValue: 2,
//             useNativeDriver: true,
//             duration: 900,
//           }),
//           Animated.timing(scale, {
//             toValue: 1,
//             useNativeDriver: true,
//             duration: 900,
//           }),
//         ]),
//       ]),
//       { iterations: 5 }
//     ).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.square,
//           {
//             borderRadius: progress.interpolate({
//               inputRange: [0.5, 1],
//               outputRange: [SIZE / 4, SIZE / 2],
//             }),
//             opacity: progress,
//             transform: [
//               { scale },
//               {
//                 rotate: progress.interpolate({
//                   inputRange: [0.5, 1],
//                   outputRange: ["180deg", "360deg"],
//                 }),
//               },
//             ],
//           },
//         ]}
//       />
//     </View>
//   );
// };

// const SIZE = 100.0;

// export default BookingDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   square: {
//     width: SIZE,
//     height: SIZE,
//     backgroundColor: Colors.primary,
//     opacity: 0.8,
//   },
// });
