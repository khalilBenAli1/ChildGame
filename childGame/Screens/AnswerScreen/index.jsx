import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";

const AnswerScreen = () => {
  const [answer, setAnswer] = useState("");

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
          <CountdownTimer
            initialTime={30}
            onEnd={() => console.log("Time's up!")}
          />
          <Image
            source={require("../../assets/imgs/Guess.png")}
            style={styles.image}
          />
          <Text style={styles.description}>
            Enter the Word that your friend is describing:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setAnswer}
            value={answer}
            placeholder="Your word here"
            placeholderTextColor="#ccc"
          />
          <AppButton backgroundColor={"#389936"} onClick={() => console.log('Answer:', answer)}>
            <Text style={styles.buttonText}>Submit Answer</Text>
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
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginVertical:20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical:20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "#000",
    marginVertical:20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default AnswerScreen;
