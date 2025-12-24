import { Colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
  const handleDone = async () => {
    await AsyncStorage.setItem("onboarding-complete", "true");
    router.replace("/");
  };

  const DotComponent = ({ selected }: { selected: boolean }) => (
    <View
      style={{
        width: selected ? 24 : 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: selected ? Colors.primary : "#D5D5DD",
        marginHorizontal: 4,
      }}
    />
  );

  const DoneButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      style={{
        marginRight: 20,
      }}
      accessibilityLabel="Complete onboarding"
    >
      <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: "600" }}>
        Get Started
      </Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      style={{
        marginLeft: 20,
      }}
      accessibilityLabel="Skip button"
    >
      <Text style={{ color: Colors.primary, fontSize: 16 }}>Skip</Text>
    </TouchableOpacity>
  );

  const NextButton = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      style={{
        marginRight: 20,
      }}
      accessibilityLabel="Next button"
    >
      <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: "600" }}>
        Next
      </Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      DotComponent={DotComponent}
      DoneButtonComponent={DoneButton}
      SkipButtonComponent={SkipButton}
      NextButtonComponent={NextButton}
      // bottomBarColor="#FFFFFF"
      containerStyles={{
        paddingHorizontal: 20,
      }}
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={{ width: 300, height: 300 }}>
              <LottieView
                source={require("@/assets/animations/Dance Party.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          ),
          title: "Discover Amazing Events In Your City",
          titleStyles: {
            color: Colors.secondary,
            fontSize: 28,
            fontWeight: "600",
            paddingHorizontal: 20,
          },
          subtitle: "The best events we have prepared for you",
          subTitleStyles: {
            color: "#64748B",
            fontSize: 16,
            paddingHorizontal: 40,
          },
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={{ width: 300, height: 300 }}>
              <LottieView
                source={require("@/assets/animations/Marking a Calendar.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          ),
          title: "Experience The Ultimate Local Event Right",
          titleStyles: {
            color: Colors.secondary,
            fontSize: 28,
            fontWeight: "600",
            paddingHorizontal: 20,
          },
          subtitle: "Book tickets easily and enjoy unforgettable moments",
          subTitleStyles: {
            color: "#64748B",
            fontSize: 16,
            paddingHorizontal: 40,
          },
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={{ width: 300, height: 300 }}>
              <LottieView
                source={require("@/assets/animations/Globe.json")}
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          ),
          title: "Find Events Near You",
          titleStyles: {
            color: Colors.secondary,
            fontSize: 28,
            fontWeight: "600",
            paddingHorizontal: 20,
          },
          subtitle: "Explore local events happening around you",
          subTitleStyles: {
            color: "#64748B",
            fontSize: 16,
            paddingHorizontal: 40,
          },
        },
      ]}
    />
  );
};

export default OnboardingScreen;
