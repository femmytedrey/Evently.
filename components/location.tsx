import { Colors } from "@/constants/colors";
import { popularLocations } from "@/constants/data";
import { getCurrentLocation } from "@/utils/location.helper";
import { ChevronDown, LocateFixed, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "./input-field";
import LocationSearchResult from "./location-search-result";
import ModalHeader from "./modal-header";

const Location = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Lagos, Nigeria");
  const [locationTriggerText, setLocationTriggerText] =
    useState("Current Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredLocations = popularLocations.filter(
    (loc) =>
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get GPS location
  const handleGetCurrentLocation = async () => {
    try {
      setLoading(true);

      const result = await getCurrentLocation();
      setCurrentLocation(result.address);
      setLocationTriggerText("Current Location");
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not get your location");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (
    selectedLocation: (typeof popularLocations)[0]
  ) => {
    setCurrentLocation(selectedLocation.full);
    setLocationTriggerText("Selected Location");
    setIsModalVisible(false);
    setSearchQuery("");
  };

  return (
    <>
      <View className="gap-1">
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className="flex-row items-center gap-1"
        >
          <Text className="text-xl text-gray-500">{locationTriggerText}</Text>
          <ChevronDown />
        </Pressable>
        <Text className="text-xl text-secondary">{currentLocation}</Text>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <ModalHeader
            onClose={() => setIsModalVisible(false)}
            title="Location"
          />

          {/* Search & Current Location Button */}
          <View className="gap-4 px-5 pt-5">
            <InputField
              placeholder="Search"
              icon={(focused) => (
                <Search color={focused ? Colors.primary : Colors.black} />
              )}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <Pressable
              onPress={handleGetCurrentLocation}
              className="flex-row items-center gap-2 border-b"
              style={{ paddingBottom: 15, borderColor: "#D5D5DD" }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <LocateFixed color={Colors.primary} />
              )}
              <Text className="text-lg">Use my current location</Text>
            </Pressable>
          </View>

          <LocationSearchResult
            searchQuery={searchQuery}
            onHandleSelectLocation={handleSelectLocation}
            filteredLocations={filteredLocations}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Location;
