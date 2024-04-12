import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import CenteredBox from '../../Components/CenteredBox'; 
import NumberOfPlayers from '../../Components/NumberOfPlayers'; 
import AppButton from '../../Components/AppButton'; 
import { useTranslation } from 'react-i18next';

const IndividualsScreen = () => {
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <Text style={styles.pageTitle}>{t("individuals")}</Text>
      <CenteredBox>
        <Text style={styles.title}>{t("numberOfPlayers")}</Text>
        <NumberOfPlayers />
        <View style={styles.buttonContainer}>
          <AppButton
            onClick={() => console.log("Start the experience")}
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
  pageTitle: {
    color: "white",
    alignSelf: "center",
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default IndividualsScreen;
