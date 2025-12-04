import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const otpStyles = StyleSheet.create({
  otpContainer: {
    width: "100%",
    justifyContent: "center",
    gap: 16,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E6",
    backgroundColor: "#f9fafb",
  },
  otpBoxFocused: {
    borderColor: Colors.primary,
    backgroundColor: "#ffffff",
  },
  otpText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#13123A",
  },
});