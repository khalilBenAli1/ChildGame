import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ImageBackground } from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import { useTranslation } from "react-i18next";
import AppButton from "../../Components/AppButton";

const IndividualNames = ({ route }) => {
  const { t } = useTranslation();
  const { numberOfPlayers = 3 } = route.params || {}; 
  const [names, setNames] = useState(Array(numberOfPlayers).fill(""));

  const handleNameChange = (text, index) => {
    const newNames = [...names];
    newNames[index] = text;
    setNames(newNames);
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <Text style={styles.pageTitle}>{t("names")}</Text>
      <CenteredBox>
        <Text style={styles.title}>{t("individualNames")}</Text>
        {names.map((name, index) => (
          <View key={index} style={styles.namesStyle}>
            <Text style={styles.subTitle}>{`${t("player")} ${index + 1}`}</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => handleNameChange(text, index)}
              placeholder={t("enterPlayerName")}
            />
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <AppButton
            onClick={() => console.log("Start Experience")}
            backgroundColor="#389936"
          >
            <Text style={styles.buttonText}>{t("startExperience")}</Text>
          </AppButton>
        </View>
      </CenteredBox>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  namesStyle:{
    alignSelf: "flex-start",
    width:"90%"
  },
  subTitle: {
    fontSize: 18,
    color: "black",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 25,
    padding: 10,
    margin: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  pageTitle: {
    color: "white",
    alignSelf: "center",
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default IndividualNames;
