import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AgreementProps {
  agreementPurpose: string;
}

const Agreement = ({ agreementPurpose }: AgreementProps) => {
  return (
    <View className="pt-10">
      <Text className="text-lg text-center">
        By clicking “{agreementPurpose}” you agree to Recognotes{" "}
        <Link href={"#" as any} className="font-bold text-primary">
          Term of Use
        </Link>{" "}
        and{" "}
        <Link href={"#" as any} className="font-bold text-primary">
          Privacy Policy
        </Link>
      </Text>
    </View>
  );
};

export default Agreement;

const styles = StyleSheet.create({});
