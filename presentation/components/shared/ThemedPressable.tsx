import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props extends PressableProps {
  children: string;
}

export const ThemedPressable = ({ children, ...rest }: Props) => {
  return (
    <Pressable style={styles.btnPrimary} {...rest}>
      <Text style={{ color: "white" }}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    margin: 10,
  },
});
