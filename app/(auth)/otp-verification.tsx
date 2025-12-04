import AuthHeader from "@/components/auth-header";
import Button from "@/components/button";
import OtpSuccess from "@/components/otp-success";
import { useOTPVerification } from "@/hooks/use-otp-verification";
import { otpStyles } from "@/styling/otp-styling";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

export const verifyOtp = async (otp: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "1234") {
        resolve({ success: true });
      } else {
        reject(new Error("Invalid OTP"));
      }
    }, 1500);
  });
};

const OtpVerification = () => {
  const {
    otpValue,
    isSuccess,
    countdown,
    isLoading,
    error,
    setCountDown,
    setOtpValue,
    handleVerify,
  } = useOTPVerification();

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (isSuccess && countdown === 0) {
      router.replace("/signin");
    }
  }, [isSuccess, countdown]);

  if (isSuccess) {
    return <OtpSuccess countdown={countdown} />;
  }

  return (
    <SafeAreaView className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-5 pt-20">
          {/* header */}
          <AuthHeader
            title="OTP Verification"
            description="We need to verify your email"
            icon={<MaterialIcons name="security" size={26} color="white" />}
          />

          <View className="pt-10">
            <Text className="text-lg text-center text-gray-400">
              To verify your account, enter the 4 digit OTP code that we sent to
              your email.
            </Text>

            <View className="items-center pt-8">
              <OtpInput
                numberOfDigits={4}
                onTextChange={(text) => {
                  setOtpValue(text);
                }}
                theme={{
                  containerStyle: otpStyles.otpContainer,
                  pinCodeContainerStyle: otpStyles.otpBox,
                  pinCodeTextStyle: otpStyles.otpText,
                  focusedPinCodeContainerStyle: otpStyles.otpBoxFocused,
                }}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                onFilled={(text) => {
                  Keyboard.dismiss();
                }}
              />
            </View>
          </View>

          <View className="gap-5 pt-8">
            {error && (
              <Text className="text-lg text-center text-red-600">{error}</Text>
            )}
            <Button
              disabled={otpValue.length !== 4 || isLoading}
              onPress={handleVerify}
              title={isLoading ? "Verifying..." : "Verify"}
            />
            <Button onPress={() => {}} title="Resend OTP" variant="outline" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default OtpVerification;
