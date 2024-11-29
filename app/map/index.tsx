import { CustmomMap } from "@/presentation/components/maps/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const MapsScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <CustmomMap initialLocation={lastKnownLocation} />
      {/*       <CustmomMap
        initialLocation={{
          latitude: -34.688772,
          longitude: -58.566762,
        }}
      /> */}
    </View>
  );
};

export default MapsScreen;
