import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;

  onPress: () => void;
}

export const FAB = ({ onPress, style, iconName }: Props) => {
  return (
    <View style={[styles.btn, style]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={iconName} color="white" size={35} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    zIndex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    elevation: 5,
  },
});
