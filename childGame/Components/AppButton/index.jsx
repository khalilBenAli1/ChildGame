import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";

const AppButton = ({
  children,
  onClick,
  backgroundColor = "blue",
  borderColor,
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={onClick}
    style={[
      styles.button,
      { backgroundColor, borderColor, borderWidth: borderColor ? 3 : 0 },
    ]}
    disabled={disabled}
  >
    <Image
      source={require("../../assets/imgs/buttonImage.png")}
      style={styles.image}
      resizeMode="contain"
    />
    <View accessible accessibilityRole="button">
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "90%",
    padding: 10,
    margin: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 60,
    marginBottom: 20,
  },
  image: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 20,
    height: 20,
  },
});

export default AppButton;
