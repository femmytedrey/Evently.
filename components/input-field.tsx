import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProp extends TextInputProps {
  icon?: (focused: boolean) => React.ReactNode;
  onSecure?: () => void;
  secureTextEntry?: boolean;
  isPasswordField?: boolean;
  error?: string;
}

const InputField = ({
  icon,
  onSecure,
  isPasswordField,
  secureTextEntry,
  error,
  ...props
}: InputFieldProp) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };
  return (
    <Pressable onPress={handlePress}>
      <>
        <View
          className={`border p-4 rounded-xl flex-row gap-2 items-center ${
            isFocused ? "border-primary" : "border-primary_outline"
          }`}
        >
          {icon && icon(isFocused)}
          <TextInput
            ref={inputRef}
            className="flex-1"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            {...props}
          />
          {isPasswordField && (
            <Pressable
              onPress={onSecure}
              accessibilityLabel={
                secureTextEntry ? "Show password" : "Hide password"
              }
            >
              <AntDesign
                name={secureTextEntry ? "eye-invisible" : "eye"}
                size={20}
                color="grey"
              />
            </Pressable>
          )}
        </View>

        {error && <Text className="pt-2 text-red-600">{error}</Text>}
      </>
    </Pressable>
  );
};

export default InputField;
