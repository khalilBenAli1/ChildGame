import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Alert,
  ScrollView
} from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import NumberOfPlayers from "../../Components/NumberOfPlayers";
import AppButton from "../../Components/AppButton";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from "react-redux";
import { setTeamsInfo,resetAll,setGameMode  } from "../../store/actions/gameActions";
import { useNavigation } from "@react-navigation/native";
import { resetSeasonAll } from "../../store/actions/seasonActions";
const CreateTeamsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const teamss =useSelector(state=>state)
  const [teams, setTeams] = useState([
    { name: "", players: 0 },
    { name: "", players: 0 },
    { name: "", players: 0 },
  ]);
  useEffect(() => {
    dispatch(resetAll());
  }, []);

  const handleSetTeamName = (text, index) => {
    setTeams((teams) =>
      teams.map((team, i) => (i === index ? { ...team, name: text } : team))
    );
  };

  const handleSetPlayersCount = (count, index) => {
    setTeams((teams) =>
      teams.map((team, i) => (i === index ? { ...team, players: count } : team))
    );
  };

  const submitTeamsInfo = () => {
    const allTeamsValid = teams.every(
      (team) => team.name !== "" && team.players > 0
    );
    if (allTeamsValid) {
      dispatch(setTeamsInfo(teams));
      dispatch(resetSeasonAll());
      dispatch(setGameMode("teams"));
      console.log(teamss)
      navigation.navigate("Seasons");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
     
      <Text style={styles.pageTitle}>{t("teams")}</Text>
      <CenteredBox height={"85%"}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.title}>{t("createTeams")}</Text>

        {teams.map((team, index) => (
          <View key={index} style={styles.mapContainer}>
            <Text style={styles.subTitle}>
              {t("team")} {index + 1}
            </Text>
            <TextInput
              style={styles.input}
              value={team.name}
              onChangeText={(text) => handleSetTeamName(text, index)}
              placeholder={t("enterTeamName")}
            />
            <View style={styles.numberContainer}>
              <Text>{t("numberOfPlayers")}: </Text>
              <NumberOfPlayers
                initialCount={team.players}
                onCountChange={(count) => handleSetPlayersCount(count, index)}
              />
            </View>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <AppButton onClick={submitTeamsInfo} backgroundColor="#389936">
            <Text style={styles.buttonText}>{t("startExperience")}</Text>
          </AppButton>
        </View>
        </ScrollView>
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
    height: 60,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 25,
    fontSize:12,
    padding: 10,
    marginVertical: 20,
    width: "98%",
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
