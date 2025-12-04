import Agreement from "@/components/agreement";
import Button from "@/components/button";
import CheckBox from "@/components/check-box";
import InputField from "@/components/input-field";
import OAuthButton from "@/components/oauth-button";
import { Colors } from "@/constants/colors";
import { authSchema } from "@/schema/auth.schema";
import { AuthType } from "@/types/auth.type";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
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

const SignUp = () => {
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
    },
    mode: "onChange",
  });

  const onSubmit = (data: AuthType) => {
    console.log(data);
    router.push("/(auth)/otp-verification");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-8">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              {/* auth page title */}
              <View className="gap-4 pb-4">
                <Text className="text-4xl font-medium">Create new account</Text>
                <View className="flex-row">
                  <Text className="text-lg">Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.push("/signin")}>
                    <Text className="text-lg text-primary">Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form */}
              <View className="gap-6">
                <View className="gap-4">
                  {/* Input field */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter your email"
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
                </View>

                <Button onPress={handleSubmit(onSubmit)} title="Sign Up" />
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
                  title="Sign up with Google"
                  onPress={() => console.log("first")}
                />
              </View>

              <Agreement agreementPurpose="Sign Up" />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
