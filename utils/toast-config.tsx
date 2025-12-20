import { Colors } from "@/constants/colors";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.primary,
        borderLeftWidth: 5,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 14,
        color: "#666",
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#FF4444",
        borderLeftWidth: 5,
      }}
      text1Style={{
        fontSize: 17,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};
