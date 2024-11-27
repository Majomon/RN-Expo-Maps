import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const MapsScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // provider="google"
        initialRegion={{
          latitude: -34.688772,
          longitude: -58.566762,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default MapsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
