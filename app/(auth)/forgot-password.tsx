import AuthHeader from "@/components/auth-header";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import { Colors } from "@/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("first women");
    router.push({
      pathname: "/(auth)/verify-otp",
      params: { email },
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 pt-5">
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={{ paddingVertical: 12 }}
        />

        <View className="flex-1 pt-5">
          <AuthHeader
            title="Forgot Your Password?"
            description="Please enter your email address account to send the OTP verification to reset your password"
            icon={<MaterialIcons name="password" size={26} color="white" />}
          />

          <View
            className="flex justify-between flex-1 pt-12"
            style={{ paddingBottom: 12 }}
          >
            <InputField
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              icon={(focused) => (
                <Ionicons
                  name="mail"
                  size={20}
                  color={focused ? Colors.primary : Colors.black}
                />
              )}
            />

            <Button title="Confirm" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
