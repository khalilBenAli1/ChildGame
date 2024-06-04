import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import { imageWords } from "../../data/imagesWords";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentPlayerIndex, setGuessWord } from "../../store/actions/gameActions";
import Turn from "../../Modals/Turn";
import RoundPoints from "../../Modals/RoundPoints";
import useDisableBackButton from "../../utils/useDisableBackButton";
import { updateSeasonStatus } from "../../store/actions/seasonActions";

const GuessWord = () => {
  useDisableBackButton();
  const [currentWordData, setCurrentWordData] = useState(null);
  const [showTurnModal, setShowTurnModal] = useState(true);
  const [showCompletedModal, setShowCompletedModal] = useState(false);


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentSeason = useSelector((state) => state.seasons.currentSeason);
  const [usedWordIndices, setUsedWordIndices] = useState(new Set());

  const {
    gameMode,
    playerCount,
    currentPlayerIndex,
    teamsInfo,
    playerNames,
    scores,
  } = useSelector((state) => state.game);
  const playerList =
    gameMode === "individual"
      ? playerNames
      : teamsInfo.map((element) => element.name);
  const players = gameMode === "individual" ? playerCount : teamsInfo.length;

  useEffect(() => {
    let randomIndex;
    let availableIndices = imageWords
      .map((_, index) => index)
      .filter((index) => !usedWordIndices.has(index));

    if (availableIndices.length === 0) {
      setShowCompletedModal(true);
    }
    randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setCurrentWordData(imageWords[randomIndex]);
    setUsedWordIndices((prev) => new Set(prev).add(randomIndex));

    if (currentPlayerIndex < players) {
      setShowTurnModal(true);
    } else {
      setShowCompletedModal(true);
      
    }
  }, [currentPlayerIndex]);

  const handleOnClick = () => {
    dispatch(setGuessWord(currentWordData));
    navigation.navigate("AnswerScreen");
  };

  const handleTurnModalClose = () => {
    setShowTurnModal(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      <SafeAreaView style={styles.container}>
        <Turn
          isVisible={showTurnModal}
          onClose={handleTurnModalClose}
          title={`${playerList[currentPlayerIndex]}'s Turn`}
          onClick={handleTurnModalClose}
        />
        <RoundPoints
          isVisible={showCompletedModal}
          onClose={() => {
            dispatch(updateSeasonStatus(currentSeason.title, true));
            dispatch(setCurrentPlayerIndex(0));
            navigation.navigate("Seasons");
          }}
          bannerText={<Text>Final Scores</Text>}
          numberOfPlayers={players}
          mode={gameMode}
          players={playerList}
          scores={scores}
        />
        <ProgressBar
          progress={1}
          width={null}
          style={styles.progressBar}
          color="#389936"
          unfilledColor="#CCCCCC"
          borderWidth={0}
        />
        <CenteredBox height={"90%"}>
          {currentWordData && (
            <>
              <Image source={currentWordData.image} style={styles.image} />
              <Text style={styles.description}>
                Décrivez le mot à vos équipes et donnez-leur le téléphone pour
                insérer:
              </Text>
              <Text style={styles.targetWord}>{currentWordData.word}</Text>
            </>
          )}
          <Text style={styles.hint}>
            Astuce : Vous pouvez insérer le mot correct après que vos
            coéquipiers vous l'ont donné la réponse pour vous assurer qu'elle
            est correctement répondue.
          </Text>
          <View style={styles.myFlex} />
          <AppButton backgroundColor={"#389936"} onClick={handleOnClick}>
            <Text style={styles.buttonText}>Démarrer la minuterie</Text>
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
    width: "90%",
    height: 230,
    resizeMode: "cover",
    marginVertical: 30,
    borderRadius: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 30,
    marginHorizontal: 12,
  },
  targetWord: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#389936",
    marginVertical: 30,
    textAlign: "center",
  },
  myFlex: {
    flex: 1,
  },
  hint: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginVertical: 20,
    marginHorizontal: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GuessWord;
