import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";

const Turn = ({ isVisible, onClose, title, onClick }) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      height={"70%"}
    >
      <View style={styles.container}>
        
        <Image
          source={require("../../assets/newImgs/Group 6969.png")}
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
        Its player turn to play this round get ready and click on the start button to start playing
        </Text>
      </View>
      <AppButton onClick={onClick} backgroundColor={"#389936"}>
        <Text style={styles.buttonText}>Start The Round</Text>
      </AppButton>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#389936"
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 30,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  teamName: {
    color: "#DEAE48",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default Turn;

//modal usage
{/* <Turn
isVisible={true}
onClose={() => console.log("Close modal")}
title="Player khalil turn"
onClick={() => console.log("Moving to next round")}
/> */}