import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Permission denied");
    }

    // Gets the device's current GPS coordinates
    const position = await Location.getCurrentPositionAsync({});

    const address = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    if (!address[0]) {
      throw new Error("Could not get address");
    }

    const locationString = `${address[0].city || address[0].name}, ${
      address[0].region
    }`;

    return {
      address: locationString,
      coords: {
        latitude: position.coords.latitude,
        longtitude: position.coords.longitude,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const geocodeAddress = async (address: string) => {
  try {
    const result = await Location.geocodeAsync(address);
    if (result.length > 0) {
      return {
        latitude: result[0].latitude,
        longitude: result[0].longitude,
      };
    }
    throw new Error("Location not found");
  } catch (error) {
    throw error;
  }
};
