import Checkbox, { CheckboxProps } from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CheckBoxProps extends CheckboxProps {
  value: boolean;
  label: string;
  error?: string;
}

const CheckBox = ({
  label = "Remember me",
  value,
  error,
  ...props
}: CheckBoxProps) => {
  return (
    <>
      <View className="flex-row items-center">
        <Checkbox
          style={{
            marginRight: 7,
            borderColor: `${value ? "#7952fc" : "#D5D5DD"}`,
            borderRadius: 5,
          }}
          color={value ? "#7952fc" : undefined}
          value={value}
          {...props}
        />
        <Text className="text-lg">{label}</Text>
      </View>
      {error && <Text className="text-red-600">{error}</Text>}
    </>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
