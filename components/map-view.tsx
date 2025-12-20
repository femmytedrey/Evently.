import { Colors } from "@/constants/colors";
import { Event } from "@/constants/data";
import { geocodeAddress } from "@/utils/location.helper";
import { MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapViewComponentProps {
  event: Event;
}

const MapViewComponent = ({ event }: MapViewComponentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const geocodeLocation = async () => {
      setIsLoading(true);
      if (!event?.location) return;

      try {
        const result = await geocodeAddress(event?.location);
        setCoordinates(result);
      } catch (error) {
        console.error("Geocoding failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    geocodeLocation();
  }, [event?.location]);

  if (!coordinates || isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <MapView
      style={{ height: 150, borderRadius: 12 }}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      scrollEnabled={false}
      zoomEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}
    >
      <Marker
        coordinate={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }}
      >
        <View className="items-center">
          <MapPin size={32} color={Colors.primary} fill={"white"} />
        </View>
      </Marker>
    </MapView>
  );
};

export default MapViewComponent;
