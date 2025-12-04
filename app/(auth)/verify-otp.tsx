import AuthHeader from "@/components/auth-header";
import Button from "@/components/button";
import OtpSuccess from "@/components/otp-success";
import { useOTPVerification } from "@/hooks/use-otp-verification";
import { otpStyles } from "@/styling/otp-styling";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyOtp = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
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
      router.replace({
        pathname: "/create-new-password",
        params: { otp: otpValue, email },
      });
    }
  }, [isSuccess, countdown]);

  if (isSuccess) {
    return <OtpSuccess countdown={countdown} />;
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-5 pt-5">
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={{ paddingVertical: 12 }}
        />

        <View className="flex-1 pt-5">
          <AuthHeader
            title="Check Your Mailbox"
            description={`Please enter the 4 digit OTP code that we sent to your email (${email})`}
            icon={<Ionicons name="mail-unread" size={26} color="white" />}
          />

          <View
            className="flex justify-between flex-1 pt-12"
            style={{ paddingBottom: 12 }}
          >
            <OtpInput
              numberOfDigits={4}
              onTextChange={(text) => setOtpValue(text)}
              theme={{
                containerStyle: otpStyles.otpContainer,
                pinCodeContainerStyle: otpStyles.otpBox,
                pinCodeTextStyle: otpStyles.otpText,
                focusedPinCodeContainerStyle: otpStyles.otpBoxFocused,
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              onFilled={() => Keyboard.dismiss()}
            />

            <View className="gap-5">
              {error && (
                <Text className="text-lg text-center text-red-600">
                  {error}
                </Text>
              )}
              <Button
                disabled={otpValue.length !== 4 || isLoading}
                title={isLoading ? "Verifying" : "Verify OTP"}
                onPress={handleVerify}
              />
              <Button variant="outline" title="Resend OTP" onPress={() => {}} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({});
