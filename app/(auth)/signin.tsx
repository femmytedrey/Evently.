import Button from "@/components/button";
import CheckBox from "@/components/check-box";
import InputField from "@/components/input-field";
import OAuthButton from "@/components/oauth-button";
import { Colors } from "@/constants/colors";
import { authSchema } from "@/schema/auth.schema";
import { AuthType } from "@/types/auth.type";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [isSecure, setIsSecure] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AuthType) => {
    await AsyncStorage.setItem("auth-user", "true");
    console.log(data);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-8">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
              {/* auth page title */}
              <View className="gap-4 pb-4">
                <Text className="text-4xl font-medium">
                  Sign in to your account
                </Text>
                <View className="flex-row">
                  <Text className="text-lg">Don't have an account? </Text>
                  <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text className="text-lg text-primary">Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form */}
              <View className="gap-6">
                <View className="gap-4">
                  {/* Email Input */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon={(focused) => (
                          <Ionicons
                            name="mail"
                            size={20}
                            color={focused ? Colors.primary : Colors.black}
                          />
                        )}
                        error={errors?.email?.message}
                      />
                    )}
                  />

                  {/* Password Input */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter your password"
                        secureTextEntry={isSecure}
                        onSecure={() => setIsSecure(!isSecure)}
                        isPasswordField={true}
                        icon={(focused) => (
                          <Ionicons
                            name="lock-closed"
                            size={20}
                            color={focused ? Colors.primary : Colors.black}
                          />
                        )}
                        error={errors?.password?.message}
                      />
                    )}
                  />

                  {/* Remember Me Checkbox */}
                  <View className="flex-row items-center justify-between">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <CheckBox
                          label="Remember me"
                          value={value}
                          onValueChange={onChange}
                        />
                      )}
                    />

                    <Link asChild href={"/forgot-password" as any}>
                      <Text className="text-end text-primary">
                        Forgot Password?
                      </Text>
                    </Link>
                  </View>
                </View>

                <Button onPress={handleSubmit(onSubmit)} title="Sign In" />
              </View>

              {/* alternate auth */}
              <View>
                <View className="flex-row items-center py-8">
                  <View className="h-[1px] flex-1 bg-gray-300" />
                  <View className="px-3 py-1">
                    <Text className="text-lg">Or continue with</Text>
                  </View>
                  <View className="h-[1px] flex-1 bg-gray-300" />
                </View>

                <OAuthButton
                  title="Sign in with Google"
                  onPress={() => console.log("Google sign in")}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
