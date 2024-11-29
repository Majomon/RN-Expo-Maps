import { LatLng } from "@/infraestructure/interfaces/lat-lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { FAB } from "../shared/FAB";

interface Props extends ViewProps {
  initialLocation: LatLng;
  showUserLocation?: boolean;
}

export const CustmomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const mapRef = useRef<MapView>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const { watchLocation, clearWatchLocation, lastKnownLocation, getLocation } =
    useLocationStore();

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  const moveCameraToLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({
      center: latLng,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    } else {
      moveCameraToLocation(lastKnownLocation);
    }

    const location = await getLocation();
    if (!location) return;

    moveCameraToLocation(location);
  };

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        onTouchStart={() => setIsFollowingUser(false)}
        showsUserLocation={showUserLocation}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{ bottom: 80, right: 20 }}
      />

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{ bottom: 20, right: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
