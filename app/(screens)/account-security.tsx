import { Colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as Notifications from "expo-notifications";
import { ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";

const AccountSecurity = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkBiometricSupport();
    loadBiometricPreference();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission not granted!");
    }
  };

  const schedulePushNotification = async () => {
    console.log("scheduled");
    registerForPushNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Event Reminder 🎉",
        body: "Your event starts in 1 hour!",
        data: { eventId: "123" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  };

  const checkBiometricSupport = async () => {
    try {
      console.log("button is pressed");
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      setIsBiometricSupported(hasHardware && isEnrolled);

      if (hasHardware && !isEnrolled) {
        console.log(
          "Device has biometric hardware but user hasn't set up Face ID/Fingerprint"
        );
      }
    } catch (error) {
      console.error("Error checking biometric support:", error);
      setIsBiometricSupported(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBiometricPreference = async () => {
    try {
      const saved = await AsyncStorage.getItem("biometric-enabled");
      setIsBiometricEnabled(saved === "true");
    } catch (error) {
      console.error("Error loading biometric preference:", error);
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    if (!isBiometricSupported) {
      Alert.alert(
        "Not Available",
        "Biometric authentication is not available on this device. Please set up Face ID or Fingerprint in your device settings."
      );
      return;
    }

    if (value) {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate to enable biometric login",
          cancelLabel: "Cancel",
          disableDeviceFallback: false,
        });

        if (result.success) {
          setIsBiometricEnabled(true);
          await AsyncStorage.setItem("biometric-enabled", "true");
          Alert.alert(
            "Success",
            "Biometric login has been enabled. You can now use Face ID/Fingerprint to log in."
          );
        } else {
          console.log("Authentication failed:", result.error);
          Alert.alert(
            "Authentication Failed",
            "Could not verify your identity. Biometric login was not enabled."
          );
        }
      } catch (error) {
        console.error("Biometric authentication error:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } else {
      setIsBiometricEnabled(false);
      await AsyncStorage.setItem("biometric-enabled", "false");

      Alert.alert("Disabled", "Biometric login has been disabled.");
    }
  };

  return (
    <View className="px-5 pt-5">
      <Pressable
        onPress={() => console.log("Update password pressed")}
        className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-2xl active:bg-gray-50"
      >
        <View className="flex-row items-center gap-4">
          <Text className="text-lg font-medium text-secondary">
            Update Password
          </Text>
        </View>

        <ChevronRight size={20} color={"gray"} />
      </Pressable>

      <Pressable
        onPress={() => schedulePushNotification()}
        className="flex-row items-center justify-between p-4 mb-4 bg-white rounded-2xl active:bg-gray-50"
      >
        <View className="flex-row items-center gap-4">
          <Text className="text-lg font-medium text-secondary">
            Test Push Notification
          </Text>
        </View>
        <ChevronRight size={20} color={"gray"} />
      </Pressable>

      <View className="p-5 bg-white rounded-2xl">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-medium text-secondary">
            Fingerprint Log In
          </Text>
          <Switch
            value={isBiometricEnabled}
            onValueChange={handleBiometricToggle}
            trackColor={{ false: "#E5E7EB", true: Colors.primary }}
            thumbColor="#FFFFFF"
            disabled={isLoading || !isBiometricSupported}
            style={{ opacity: !isBiometricSupported ? 0.5 : 1 }}
          />
        </View>

        <Text className="text-sm leading-5 text-gray-500">
          {!isBiometricSupported
            ? "Biometric authentication is not available on this device"
            : isBiometricEnabled
            ? "Activation will allow anyone with Fingerprint access to this device, to login to your account"
            : "Enable fingerprint authentication for quick and secure login"}
        </Text>
      </View>
    </View>
  );
};

export default AccountSecurity;

const styles = StyleSheet.create({});
