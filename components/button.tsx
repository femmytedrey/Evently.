import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline";
}

const Button = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const getButtonStyles = () => {
    if (disabled) {
      return variant === "outline"
        ? "bg-transparent border-2 border-gray-300"
        : "bg-gray-300";
    }

    return variant === "outline"
      ? "bg-transparent border-2 border-gray-400"
      : "bg-primary";
  };

  const getTextStyles = () => {
    if (disabled) {
      return "text-gray-400";
    }

    return variant === "outline" ? "text-gray-600" : "text-white";
  };

  return (
    <TouchableOpacity
      className={`p-4 rounded-xl ${getButtonStyles()}`}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text className={`text-xl text-center ${getTextStyles()}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
