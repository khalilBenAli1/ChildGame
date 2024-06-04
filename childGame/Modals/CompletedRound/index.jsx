import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";
import { useTranslation } from "react-i18next";
const CompletedRound = ({ isVisible, onClose, title, targetName, onClick }) => {
  const {t}=useTranslation()
  return (
    <CustomModal isVisible={isVisible} onClose={onClose} height={"70%"}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/newImgs/Group 6969.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{t("round_completed")}</Text>
        <Text style={styles.sub}>{t("team_turn")} {targetName}</Text>
        <Text style={styles.description}>
        {t("player_completed_questions")}
        <Text style={styles.teamName}>{targetName}</Text>
        </Text>
      </View>
      <AppButton onClick={onClick} backgroundColor={"#389936"}>
        <Text style={styles.buttonText}>{t("move_to_next_turn")}</Text>
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
  sub:{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf:"center",
    textAlign:"center",
    color: "#FF2F2F",
  },
});

export default CompletedRound;
