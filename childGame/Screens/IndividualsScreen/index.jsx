import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import NumberOfPlayers from "../../Components/NumberOfPlayers";
import AppButton from "../../Components/AppButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setPlayerCount } from "../../store/actions/gameActions";
import { useNavigation } from '@react-navigation/native';

const IndividualsScreen = () => {
  const { t } = useTranslation();
  const [playerCount, setPlayerCountLocal] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePlayerCountChange = (newCount) => {
    setPlayerCountLocal(newCount);
    dispatch(setPlayerCount(newCount));
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <Text style={styles.pageTitle}>{t("individuals")}</Text>
      <CenteredBox height={"30%"}>
        <Text style={styles.title}>{t("numberOfPlayers")}</Text>
        <NumberOfPlayers onCountChange={handlePlayerCountChange} />
        <View style={styles.buttonContainer}>
          <AppButton
            onClick={()=>navigation.navigate('IndividualNames', { numberOfPlayers:playerCount })}
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
    fontWeight: "bold",
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
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default IndividualsScreen;
