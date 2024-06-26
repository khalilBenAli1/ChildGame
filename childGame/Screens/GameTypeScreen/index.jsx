import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image
} from "react-native";
import AppButton from "../../Components/AppButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { setGameMode } from "../../store/actions/gameActions";

import { useNavigation } from "@react-navigation/native";

const GameTypeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const selectMode = (mode) => {
    dispatch(setGameMode(mode));
    console.log(mode)
    mode==='individual'?navigation.navigate("Individuals"):navigation.navigate("CreateTeams")
  };
  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{t("gameType")}</Text>
        <Text style={styles.subtitle}>{t("selectPlayMode")}</Text>

        <View style={styles.buttonContainer}>
          <AppButton
            onClick={() => selectMode('individual')}
            backgroundColor="#389936"
            borderColor="#CD9777"
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>{t("individuals")}</Text>
              <Image source={require("../../assets/newImgs/btata 1.png")} resizeMode="contain" style={styles.batataImgs}/>
              <Text style={styles.buttonSubtitle}>
                {t("individualsDescription")}
              </Text>
            </View>
          </AppButton>
          <AppButton
            onClick={() => selectMode('teams')}
            backgroundColor="#389936"
            borderColor="#CD9777"
          >
            <View style={styles.textContainer}>
              
              <Text style={styles.buttonTitle}>{t("teams")}</Text>
              <View style={{flexDirection:"row"}}>
              <Image source={require("../../assets/newImgs/btata 1.png")} resizeMode="contain" style={styles.batataImgs}/>
              <Image source={require("../../assets/newImgs/btata 1.png")} resizeMode="contain" style={styles.batataImgs}/>
              <Image source={require("../../assets/newImgs/btata 1.png")} resizeMode="contain" style={styles.batataImgs}/>
              </View>
              <Text style={styles.buttonSubtitle}>{t("teamsDescription")}</Text>
            </View>
          </AppButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  batataImgs:{
    width:50,
    height:50
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop:-20,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 40,
    alignItems:"center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize:24,
    marginVertical:15,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginVertical:10,
    paddingVertical:10,
    textAlign:"center",
    marginBottom:12
  },
  textContainer: {
    height:150,            
    alignItems: 'center',  
    justifyContent: 'center'
  }
});

export default GameTypeScreen;
