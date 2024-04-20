import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";

const sampleData = {
  images: [
    "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Jupiter.jpg",
  ],
  word: "EXAMPLE",
  scrambledLetters: ["E", "X", "A", "M", "P", "L", "E"],
};

const CompleteWord = () => {
  const { t } = useTranslation();
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [remainingLetters, setRemainingLetters] = useState([
    ...sampleData.scrambledLetters,
  ]);

  const handleLetterSelect = (letter, index) => {
    let newSelected = [...selectedLetters, letter];
    let newRemaining = remainingLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelected);
    setRemainingLetters(newRemaining);
  };

  const handleLetterDeselect = (letter, index) => {
    let newRemaining = [...remainingLetters, letter];
    let newSelected = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelected);
    setRemainingLetters(newRemaining);
  };

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
          <View style={styles.imagesContainer}>
            {sampleData.images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </View>
          <Text style={styles.instructionText}>
            {t("Complete the word based on the images above:")}
          </Text>
          <View style={styles.lettersContainer}>
            {selectedLetters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.letterBox}
                onPress={() => handleLetterDeselect(letter, index)}
              >
                <Text style={styles.letter}>{letter}</Text>
              </TouchableOpacity>
            ))}
            {Array.from({
              length: sampleData.word.length - selectedLetters.length,
            }).map((_, index) => (
              <View key={index} style={styles.emptyLetterBox}></View>
            ))}
          </View>
          <View style={styles.lettersContainer}>
            {remainingLetters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.letterBox}
                onPress={() => handleLetterSelect(letter, index)}
              >
                <Text style={styles.letter}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <AppButton backgroundColor={"#389936"}>
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
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  lettersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  letterBox: {
    backgroundColor: "#DEAE48",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 15,
  },
  emptyLetterBox: {
    backgroundColor: "#0D5239",
    width: 40,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 18,
    color: "white",
  },
  progressBar: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default CompleteWord;
