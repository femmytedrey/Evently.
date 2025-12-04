import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <Redirect href={"/(auth)/signup"} />
    // <View className="flex-1 items-center justify-center bg-[#7952FC]">
    //   <Text className="text-3xl font-bold text-white">Evently</Text>
    // </View>
  );
}

const styles = StyleSheet.create({});