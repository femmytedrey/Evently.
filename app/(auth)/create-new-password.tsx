import AuthHeader from "@/components/auth-header";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import { Colors } from "@/constants/colors";
import { createPasswordSchema } from "@/schema/auth.schema";
import { CreatePasswordType } from "@/types/auth.type";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateNewPassword = () => {
  const { otp, email } = useLocalSearchParams<{ otp: string; email: string }>();
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountDown] = useState(3);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePasswordType>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: CreatePasswordType) => {
    const { password } = data;
    console.log({ password, email });
    setIsSuccess(true);
  };

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (isSuccess && countdown === 0) {
      router.replace("/(auth)/signin");
    }
  }, [isSuccess, countdown]);

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1">
        <View className="items-center justify-center flex-1 gap-5">
          <MaterialIcons name="verified" size={70} color="#7952FC" />
          <View className="items-center gap-2">
            <Text className="text-2xl font-medium text-gray">
              Reset Password Successfully
            </Text>

            <Text>Redirecting in {countdown} secs</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
            title="Check Your Mailbox"
            description={`Create new strong password for updating (${email})`}
            icon={<Ionicons name="mail-unread" size={26} color="white" />}
          />

          <View
            className="flex justify-between flex-1 pt-12"
            style={{ paddingBottom: 12 }}
          >
            <View className="gap-5">
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter your password"
                    icon={(focused) => (
                      <Ionicons
                        name="lock-closed"
                        size={20}
                        color={focused ? Colors.primary : Colors.black}
                      />
                    )}
                    secureTextEntry={isSecure}
                    onSecure={() => setIsSecure(!isSecure)}
                    isPasswordField={true}
                    error={errors?.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder="Confirm your password"
                    icon={(focused) => (
                      <Ionicons
                        name="lock-closed"
                        size={20}
                        color={focused ? Colors.primary : Colors.black}
                      />
                    )}
                    secureTextEntry={isConfirmSecure}
                    onSecure={() => setIsConfirmSecure(!isConfirmSecure)}
                    isPasswordField={true}
                    error={errors?.confirmPassword?.message}
                  />
                )}
              />
            </View>

            <Button
              title="Confirm Reset Password"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({});
