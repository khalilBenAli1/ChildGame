import React, { useState, useEffect } from "react";
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
import RoundPoints from "../../Modals/RoundPoints";
import Turn from "../../Modals/Turn";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentPlayerIndex } from "../../store/actions/gameActions";

const sampleData = {
  word: "PortioFarina",
  scrambledLetters: [
    "P",
    "O",
    "R",
    "T",
    "I",
    "O",
    "F",
    "A",
    "R",
    "I",
    "N",
    "A",
  ],
};

const shuffleLetters = (letters) => {
  let shuffled = [...letters];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CompleteWord = () => {
  
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [remainingLetters, setRemainingLetters] = useState([
    shuffleLetters(sampleData.scrambledLetters),
  ]);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);

  const {
    gameMode,
    playerCount,
    currentPlayerIndex,
    teamsInfo,
    playerNames,
    scores,
  } = useSelector((state) => state.game);
  let players = gameMode === "individual" ? playerCount : teamsInfo.length;
  const playerList =
    gameMode === "individual"
      ? playerNames
      : teamsInfo.map((element) => element.name);

  useEffect(() => {

    setShowTurnModal(true);

    console.log(currentPlayerIndex)
  }, [currentPlayerIndex]);

  useEffect(() => {
    setRemainingLetters(shuffleLetters(sampleData.scrambledLetters));
  }, []);
  
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

  const handleSubmit = () => {

    const formedWord = selectedLetters.join("");
    if (formedWord === sampleData.word) {
      console.log("Correct answer!");
      setShowCompletedModal(true);
    } else {
      alert("Incorrect answer");
      if (currentPlayerIndex + 1 < players) {
        dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
        setSelectedLetters([]);
        setRemainingLetters(shuffleLetters(sampleData.scrambledLetters));
        setResetTimerTrigger(prev => prev + 1); 
      } else {
        setShowCompletedModal(true);
      }
    }
  };

  const handleTurnModalClose = () => {
    setShowTurnModal(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      <RoundPoints
        isVisible={showCompletedModal}
        onClose={() => navigation.navigate("Seasons")}
        bannerText={<Text>Final Scores</Text>}
        numberOfPlayers={playerCount}
        mode={gameMode}
        players={playerList}
        scores={scores}
      />
      <Turn
        isVisible={showTurnModal}
        onClose={handleTurnModalClose}
        title={`${playerList[currentPlayerIndex]}'s Turn`}
        onClick={handleTurnModalClose}
      />
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
            resetTrigger={resetTimerTrigger}
          />
          <View style={styles.imagesContainer}>
            <Image source={require("../../assets/imgs/nou.png")} style={styles.image} />
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
          <AppButton backgroundColor={"#389936"} onClick={handleSubmit}>
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
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    marginVertical: 30,
  },
  image: {
    width: "80%",
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
    flexWrap: 'wrap',
    marginBottom: 10,
    maxWidth: '100%',
  },
  letterBox: {
    backgroundColor: "#DEAE48",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    marginVertical: 3,
  },
  emptyLetterBox: {
    backgroundColor: "#CCCCCC",
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
