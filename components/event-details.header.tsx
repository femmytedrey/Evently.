import { Colors } from "@/constants/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronLeft, Share2 } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface EventDetailsHeaderProps {
  headerAnimatedStyle: HeaderAnimatedStyleType;
  imageAnimatedStyle: ImageAnimatedStyleType;
  image: string;
}

type ImageAnimatedStyleType = {
  opacity: number;
};

type HeaderAnimatedStyleType = {
  height: number;
};

const EventDetailsHeader = ({
  headerAnimatedStyle,
  imageAnimatedStyle,
  image,
}: EventDetailsHeaderProps) => {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          overflow: "hidden",
        },
        headerAnimatedStyle,
      ]}
    >
      <Animated.View style={[{ flex: 1 }, imageAnimatedStyle]}>
        <Image
          source={image}
          style={{ height: "100%", width: "100%" }}
          contentFit="cover"
        />
      </Animated.View>

      <LinearGradient
        colors={["rgba(0, 0, 0, 0.6)", "transparent"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <SafeAreaView
          edges={["top"]}
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          <View className="flex-row justify-between p-5">
            <Pressable
              onPress={() => router.back()}
              className="p-3 bg-white rounded-full"
            >
              <ChevronLeft />
            </Pressable>
            <Pressable className="p-3 bg-white rounded-full">
              <Share2 color={Colors.primary} />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
};

export default EventDetailsHeader;
