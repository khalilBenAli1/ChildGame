import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import NumberOfPlayers from "../../Components/NumberOfPlayers";
import { useTranslation } from "react-i18next";
import AppButton from "../../Components/AppButton";
import { useDispatch } from "react-redux";
import { setTeamsInfo } from "../../store/actions/gameActions";
import { useNavigation } from "@react-navigation/native";

const CreateTeamsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [teams, setTeams] = useState([
    { name: "", players: 0 },
    { name: "", players: 0 },
    { name: "", players: 0 },
  ]);

  const handleSetTeamName = (text, index) => {
    const newTeams = [...teams];
    newTeams[index].name = text;
    setTeams(newTeams);
  };

  const handleSetPlayersCount = (count, index) => {
    const newTeams = [...teams];
    newTeams[index].players = count;
    setTeams(newTeams);
  };

  const submitTeamsInfo = () => {
    dispatch(setTeamsInfo(teams));
    console.log("Teams info submitted:", teams);
    navigation.navigate("Seasons");
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <Text style={styles.pageTitle}>{t("teams")}</Text>
      <CenteredBox height={"80%"}>
        <Text style={styles.title}>{t("createTeams")}</Text>

        {teams.map((team, index) => (
          <View key={index} style={styles.mapContainer}>
            <Text style={styles.subTiltle}>
              {t("team")} {index + 1}
            </Text>
            <TextInput
              style={styles.input}
              value={team.name}
              onChangeText={(text) => handleSetTeamName(text, index)}
              placeholder={t("enterTeamName")}
            />
            <View style={styles.numberContainer}>
              <Text>Number of Players : </Text>
              <NumberOfPlayers
                initialCount={team.players}
                onCountChange={(count) => handleSetPlayersCount(count, index)}
              />
            </View>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <AppButton
            onClick={() => {
              submitTeamsInfo();
            }}
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
  mapContainer: {
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
  label: {
    fontSize: 18,
    color: "#6D6D6D",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    marginRight: 5,
  },
  subTiltle: {
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
    padding: 25,
    margin: 20,
    width: "90%",
    color: "black",
  },
  numberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  pageTitle: {
    color: "white",
    alignSelf: "center",
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default CreateTeamsScreen;
