import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import AppButton from "../../Components/AppButton";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const ExpeditionScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleButtonPress = (option) => {
    option === "board_game"
      ? navigation.navigate("GameType")
      : console.log(option, "button pressed");
  };

  return (
    <ImageBackground
      source={require("../../assets/newImgs/Welcome.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t("GATAYA_EXPEDITION")}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/newImgs/btata 4.png")} style={styles.image} resizeMode="contain"/>
        </View>
        {/* Spacer View to push the buttons to the bottom */}

        <View style={styles.spacer} />

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          <AppButton
            onClick={() => handleButtonPress("board_game")}
            backgroundColor="#389936"
            borderColor="#CD9777"
          >
            <Text style={styles.buttonText}>{t("board_game")}</Text>
          </AppButton>
          <AppButton
            onClick={() => handleButtonPress("AR_experience")}
            backgroundColor="#389936"
            borderColor="#CD9777"
          >
            <Text style={styles.buttonText}>{t("AR_experience")}</Text>
          </AppButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding:10,
    paddingTop:35
  },
  imageContainer:{
   alignItems:"center",
   justifyContent:"center",
   flex: 1,
  },
  image:{
    height:"100%",
    width:"70%",
  },
  titleContainer: {
    marginTop: 40,
    alignItems: "center",
    
  },
  title: {
    fontSize: 40,
    fontWeight: "black",
    color: "white",
    textAlign: "center",
    maxWidth:"83%"
  },
  buttonsContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  spacer: {
    
  },
});

export default ExpeditionScreen;
