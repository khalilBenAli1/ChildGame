import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";

const CompletedRound = ({ isVisible, onClose, title, targetName, onClick }) => {
  return (
    <CustomModal isVisible={isVisible} onClose={onClose} height={"70%"}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/newImgs/Group 6969.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          Le joueur a terminé ses questions, nous passons maintenant à l'équipe{" "}
          <Text style={styles.teamName}>{targetName}</Text>
        </Text>
      </View>
      <AppButton onClick={onClick} backgroundColor={"#389936"}>
        <Text style={styles.buttonText}>Passer au tour suivant</Text>
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
    color: "#389936",
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
    fontWeight: "bold",
  },
});

export default CompletedRound;
