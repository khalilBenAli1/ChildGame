import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Alert,
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
import { updateSeasonStatus } from "../../store/actions/seasonActions";
import { updateScore } from "../../store/actions/gameActions";
import { playSound } from "../../utils/sound";
import useDisableBackButton from "../../utils/useDisableBackButton";



const imageData = [
  {
    word: "PortioFarina",
    image: require("../../assets/completeWords/nou.png"),
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
  },
  {
    word: "Gataaya",
    image: require("../../assets/completeWords/Gataaya.png"),
    scrambledLetters: ["G", "A", "T", "A", "A", "Y", "A"],
  },
  {
    word: "Phéniciens",
    image: require("../../assets/completeWords/lesPhi.png"),
    scrambledLetters: ["P", "H", "É", "N", "I", "C", "I", "E", "N", "S"],
  },
];

const shuffleLetters = (letters) => {
  let shuffled = [...letters];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CompleteWord = () => {
  useDisableBackButton()
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [remainingLetters, setRemainingLetters] = useState([]);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const timerDuration = 30;
  const [usedIndices, setUsedIndices] = useState([]);
  const currentSeason = useSelector((state) => state.seasons.currentSeason);
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
        const availableIndices = imageData.map((_, index) => index).filter(index => !usedIndices.includes(index));
        if (availableIndices.length > 0) {
          const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
          const randomData = imageData[randomIndex];
          setUsedIndices([...usedIndices, randomIndex]);
          setCurrentData(randomData);
          setSelectedLetters([]);
          setRemainingLetters(shuffleLetters(randomData.scrambledLetters));
        } else {
          setShowCompletedModal(true); // Handle the scenario where all words have been completed.
        }
        setShowTurnModal(true);
      }, [currentPlayerIndex]);

  const handleLetterSelect = (letter, index) => {
    let newSelected = [...selectedLetters, letter];
    let newRemaining = [...remainingLetters];
    newRemaining.splice(index, 1);
    setSelectedLetters(newSelected);
    setRemainingLetters(newRemaining);
  };

  const handleLetterDeselect = (letter, index) => {
    let newSelected = [...selectedLetters];
    newSelected.splice(index, 1);
    setSelectedLetters(newSelected);
    setRemainingLetters([...remainingLetters, letter]);
  };
  const finalizeCurrentPlayerTurn = () => {
    let players = gameMode === "individual" ? playerCount : teamsInfo.length;
    if (currentPlayerIndex + 1 < players) {
      setShowTurnModal(true);
      const randomData =
        imageData[Math.floor(Math.random() * imageData.length)];
      setCurrentData(randomData);
      dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
    } else {
      setShowCompletedModal(true);
    }
  };

  const handleSubmit = () => {
    const formedWord = selectedLetters.join("");

    if (formedWord.toUpperCase() === currentData.word.toUpperCase()) {
      playSound("victory")
      Alert.alert("Bonne réponse", "Vous avez trouvé la bonne réponse !", [
        { text: "OK", onPress: () => {
          dispatch(updateScore(playerList[currentPlayerIndex], true))
          
          finalizeCurrentPlayerTurn() 
          setResetTimerTrigger(prev=>prev+1)
        }},
      ]);
    } else {
      playSound("defait")
      Alert.alert("Réponse incorrecte", "Ce n'est pas la bonne réponse.", [
        {
          text: "OK",
          onPress: () => {
            setSelectedLetters([]);
           
            setRemainingLetters(shuffleLetters(currentData.scrambledLetters));
            dispatch(updateScore(playerList[currentPlayerIndex], false))
            setResetTimerTrigger(prev=>prev+1)
            finalizeCurrentPlayerTurn();
          },
        },
      ]);
    }
  };

  const handleTurnModalClose = () => {
    setShowTurnModal(false);
  };
  const handleCloseCompletedModal = ()=>{
    setShowCompletedModal(false);
    dispatch(updateSeasonStatus(currentSeason.title, true));
    dispatch(setCurrentPlayerIndex(0));
    navigation.navigate("Seasons")
  }

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      {currentData && (
        <>
          <RoundPoints
            isVisible={showCompletedModal}
            onClose={handleCloseCompletedModal}
            bannerText={<Text>Final Scores</Text>}
            numberOfPlayers={players}
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
            <CenteredBox height={"93%"}>
              <CountdownTimer
                initialTime={timerDuration}
                onEnd={handleSubmit}
                start={!showTurnModal && !showCompletedModal}
                resetTrigger={resetTimerTrigger}
                extraTime={0}
              />
              <View style={styles.imagesContainer}>
                <Image source={currentData.image} style={styles.image} />
              </View>
              <Text style={styles.instructionText}>
              "Complétez le mot en fonction des images ci-dessus :"
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
                  length: currentData.word.length - selectedLetters.length,
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
              <Text style={styles.buttonText}>Soumettre la réponse</Text>

              </AppButton>
            </CenteredBox>
          </SafeAreaView>
        </>
      )}
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
    height: 150,
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
    flexWrap: "wrap",
    marginBottom: 10,
    maxWidth: "100%",
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
