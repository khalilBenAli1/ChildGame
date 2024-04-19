import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";

const CompletedRound = ({ isVisible, onClose, title, targetName, onClick }) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      height={"60%"}
    >
      <View style={styles.container}>
        
        <Image
          source={require("../../assets/imgs/finished.png")}
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          The Player has completed its Questions we move now to team <Text style={styles.teamName}>{targetName}</Text>
        </Text>
      </View>
      <AppButton onClick={onClick} backgroundColor={"#389936"}>
        <Text style={styles.buttonText}>Move to the next round</Text>
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

export default CompletedRound;
