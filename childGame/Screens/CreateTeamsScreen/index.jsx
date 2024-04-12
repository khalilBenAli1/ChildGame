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

const CreateTeamsScreen = () => {
  const { t } = useTranslation();
  const [teamName, setTeamName] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
       <Text style={styles.pageTitle}>{t("teams")}</Text>
      <CenteredBox>
        <Text style={styles.title}>{t("createTeams")}</Text>

        <Text style={styles.subTiltle}>{t("team")} 1</Text>
        <TextInput
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
          placeholder="Enter team name"
        />
        <View style={styles.numberContainer}>
          <Text style={styles.label}>{t("numberOfPlayers")}</Text>
          <NumberOfPlayers />
        </View>
        <Text style={styles.subTiltle}>{t("team")} 2</Text>
        <TextInput
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
          placeholder="Enter team name"
        />
        <View style={styles.numberContainer}>
          <Text style={styles.label}>{t("numberOfPlayers")}</Text>
          <NumberOfPlayers />
        </View>
        <Text style={styles.subTiltle}>{t("team")} 3</Text>
        <TextInput
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
          placeholder="Enter team name"
        />
        <View style={styles.numberContainer}>
          <Text style={styles.label}>{t("numberOfPlayers")}</Text>
          <NumberOfPlayers />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            onClick={() => console.log("handle start experience")}
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
  label: {
    fontSize: 18,
    color: "#6D6D6D",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    marginRight:5,
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
  },
  numberContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems:"flex-start",
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight:'bold',
    fontSize:18
  },
  buttonContainer:{
    marginTop:20,
    width:"100%",
    alignItems:"center"
  },
  pageTitle:{
    color:"white",
    alignSelf:"center",
    margin:10,
    fontSize:30,
    fontWeight:'bold'
  }
});

export default CreateTeamsScreen;
