import { LatLng } from "@/infraestructure/interfaces/lat-lng";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

interface Props extends ViewProps {
  initialLocation: LatLng;
  showUserLocation?: boolean;
}

export const CustmomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  return (
    <View {...rest}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        showsUserLocation={showUserLocation}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
