import AuthHeader from "@/components/auth-header";
import Button from "@/components/button";
import OtpSuccess from "@/components/otp-success";
import { useOTPVerification } from "@/hooks/use-otp-verification";
import { authService } from "@/service/auth.service";
import { otpStyles } from "@/styling/otp-styling";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

const OtpVerification = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  
  const {
    otpValue,
    isSuccess,
    countdown,
    isLoading,
    error,
    setCountDown,
    setOtpValue,
    setError,
    setIsLoading,
    setIsSuccess
  } = useOTPVerification();

  const handleVerify = async () => {
    try {
      if (otpValue.length !== 4) return;
      setError("");
      setIsLoading(true);
      const response = await authService.verifyOtp(otpValue, email);

      await AsyncStorage.setItem("auth-token", response.token);
      await AsyncStorage.setItem("auth-user", JSON.stringify(response.user));

      setIsSuccess(response.success);
    } catch (error) {
      setIsLoading(false);
      setError("Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

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
