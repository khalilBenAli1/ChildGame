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
import { setGuessWord, setCurrentPlayerIndex } from "../../store/actions/gameActions";
import Turn from "../../Modals/Turn";
import RoundPoints from "../../Modals/RoundPoints";
import useDisableBackButton from "../../utils/useDisableBackButton";

const GuessWord = () => {
  useDisableBackButton()
  const [currentWordData, setCurrentWordData] = useState(null);
  const [showTurnModal, setShowTurnModal] = useState(true);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    gameMode,
    playerCount,
    currentPlayerIndex,
    teamsInfo,
    playerNames,
    scores,
  } = useSelector((state) => state.game);
  const playerList = gameMode === "individual" ? playerNames : teamsInfo.map((element) => element.name);
  const players = gameMode === "individual" ? playerCount : teamsInfo.length;

  useEffect(() => {
    const randomItem = imageWords[Math.floor(Math.random() * imageWords.length)];
    setCurrentWordData(randomItem);
    if(currentPlayerIndex<players){
      setShowTurnModal(true);
    }
    else{
      setShowCompletedModal(true)
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
          onClose={() => navigation.navigate("Seasons")} 
          bannerText={<Text>Final Scores</Text>}
          numberOfPlayers={playerCount}
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
              <Image
                source={{ uri: currentWordData.image }}
                style={styles.image}
              />
              <Text style={styles.description}>
                Describe the word to your Teams and give them the phone to
                insert:
              </Text>
              <Text style={styles.targetWord}>{currentWordData.word}</Text>
            </>
          )}
          <Text style={styles.hint}>
            Hint: You can insert the correct word after your teammates give you
            the answer to ensure it's answered correctly.
          </Text>
          <View style={styles.myFlex} />
          <AppButton backgroundColor={"#389936"} onClick={handleOnClick}>
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
