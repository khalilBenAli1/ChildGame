import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, ImageBackground } from "react-native";
import CenteredBox from "../CenteredBox";

const CustomModal = ({
  isVisible,
  onClose,
  children,
  height,
  hasBanner = false,
  bannerText
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <CenteredBox height={height}>
          {hasBanner && (
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require("../../assets/imgs/top.png")}
                style={styles.image}
                resizeMode="contain"
              >
              {bannerText}
              </ImageBackground>
            </View>
          )}
          {children}
        </CenteredBox>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  outerBorder: {
    width: "90%",
    minHeight: 300,
    borderRadius: 40,
    backgroundColor: "#774936",
    padding: 2,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 350,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    top: -100,
    justifyContent: "center",
    alignItems: "center",
  },
  middleBorder: {
    height: "98%",
    justifyContent: "center",
    backgroundColor: "#CD9777",
    borderRadius: 40,
  },
  innerContent: {
    height: "96%",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default CustomModal;
