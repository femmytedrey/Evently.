import { Event } from "@/constants/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isEvent = (event: Event) => {
  const eventDate = new Date(
    event.date.year,
    parseInt(event.date.month),
    event.date.day
  );

  return eventDate < new Date();
};

export const clearAllStores = async () => {
  try {
    await AsyncStorage.removeItem("booking-storage");
    console.log("All stores cleared");
  } catch (error) {
    console.error("Failed to clear stores:", error);
  }
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };