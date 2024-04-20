import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";

const guessWordData = {
  image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg",
  word: "PARIS",
};

const GuessWord = () => {
  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      <SafeAreaView style={styles.container}>
        <ProgressBar
          progress={1}
          width={null}
          style={styles.progressBar}
          color="#389936"
          unfilledColor="#CCCCCC"
          borderWidth={0}
        />
        <CenteredBox height={"90%"}>
          <Image
            source={{ uri: guessWordData.image }}
            style={styles.image}
          />
          <Text style={styles.description}>
            Describe the word to your Teams and give them the phone to insert:
          </Text>
          <Text style={styles.targetWord}>{guessWordData.word}</Text>
          <Text style={styles.hint}>
            Hint: You can insert the correct word after your teammates give you the answer to ensure it's answered correctly.
          </Text>
          <View style={styles.myFlex}/>
          <AppButton backgroundColor={"#389936"}>
            <Text style={styles.buttonText}>Start the Timer</Text>
          </AppButton>
        </CenteredBox>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 300,
    resizeMode: "cover",
    marginVertical:30,
    borderRadius:20
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical:30,
    marginHorizontal:12
  },
  targetWord: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#389936",
    marginVertical:30,
    textAlign: "center",
  },
  myFlex:{
    flex:1
  },
  hint: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginVertical:20,
    marginHorizontal:12
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default GuessWord;
