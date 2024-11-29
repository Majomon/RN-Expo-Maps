import { CustmomMap } from "@/presentation/components/maps/CustomMap";
import React from "react";
import { View } from "react-native";

const MapsScreen = () => {
  return (
    <View>
      <CustmomMap
        initialLocation={{
          latitude: -34.688772,
          longitude: -58.566762,
        }}
      />
      {/*       <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -34.688772,
          longitude: -58.566762,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </View>
  );
};

export default MapsScreen;
