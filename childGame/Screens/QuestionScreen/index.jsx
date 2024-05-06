import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";
import RoundStart from "../../Modals/RoundStart";
import Turn from "../../Modals/Turn";
import { useSelector, useDispatch } from "react-redux";
import { toggleRound, setCurrentPlayerIndex } from "../../store/actions/gameActions";
import { updateSeasonStatus } from "../../store/actions/seasonActions";
import { useNavigation } from "@react-navigation/native";

const QuestionScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { gameMode, playerCount, currentPlayerIndex, teamsInfo, playerNames, roundStart } = useSelector(
    (state) => state.game
  );
  const navigation = useNavigation();
  const currentSeason = useSelector((state) => state.seasons.currentSeason);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showRoundStartModal, setShowRoundStartModal] = useState(true);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const playerList = gameMode === "individual" ? playerNames : teamsInfo.map(element => element.name);

  useEffect(() => {
    if (currentSeason && currentSeason.challenges.length > 0) {
      let questionsPerParticipant = gameMode === "individual"
        ? Math.floor(currentSeason.challenges.length / playerCount)
        : Math.floor(currentSeason.challenges.length / 3);

      let startIndex = currentPlayerIndex * questionsPerParticipant;
      let endIndex = Math.min(startIndex + questionsPerParticipant, currentSeason.challenges.length);

      setQuestions(currentSeason.challenges.slice(startIndex, endIndex));
      setCurrentQuestionIndex(0);

      if (!roundStart) {
        setShowTurnModal(true);
      }
    }
  }, [currentSeason, currentPlayerIndex, gameMode, playerCount, teamsInfo.length, roundStart]);

  const handleRoundStartClose = () => {
    setShowRoundStartModal(false);
    if (roundStart) {
      setTimeout(() => {
        setShowTurnModal(true);
      }, 1000);
    }
  };

  const handleTurnModalClose = () => {
    setShowTurnModal(false);

  };
  const finalizeCurrentPlayerTurn = () => {
    let players=gameMode==='individual'?playerCount:teamsInfo.length;
    if (currentPlayerIndex + 1 < players) {
      // Prepare to move to next player
      dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
      // Reset the questions for the next player
      resetQuestionsForNextPlayer(currentPlayerIndex + 1);
    } else {
      console.log("Round ended. All players have completed their turns.");
      dispatch(updateSeasonStatus(currentSeason.title,true))
      
      navigation.navigate("Seasons")
    }
  };
  
  const resetQuestionsForNextPlayer = (newPlayerIndex) => {
    let questionsPerParticipant =
      gameMode === "individual"
        ? Math.floor(currentSeason.challenges.length / playerCount)
        : Math.floor(currentSeason.challenges.length / 3);
  
    let startIndex = newPlayerIndex * questionsPerParticipant;
    let endIndex = Math.min(startIndex + questionsPerParticipant, currentSeason.challenges.length);
  
    setQuestions(currentSeason.challenges.slice(startIndex, endIndex));
    setCurrentQuestionIndex(0);  // Reset the question index for the new player
  
    // Now show the turn modal for the new player
    setShowTurnModal(true);
  };

  const handleRoundStart = () => {
    dispatch(toggleRound(false));
    handleRoundStartClose();
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.option); 
    setRevealAnswers(true); 
    setButtonsDisabled(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // No more questions, handle end of player's turn
        finalizeCurrentPlayerTurn();
      }
      setSelectedAnswer(null);
      setRevealAnswers(false);
      setButtonsDisabled(false);
    }, 2000); // Delay for showing the results briefly
  };

  if (!question) {

    return <Text>Loading questions or no questions available.</Text>;
  }

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      <SafeAreaView style={styles.container}>
        <RoundStart
          isVisible={roundStart}
          onClose={handleRoundStartClose}
          mode={gameMode}
          orderList={playerList}
          onClick={handleRoundStart}
        />
        <Turn
          isVisible={showTurnModal}
          onClose={handleTurnModalClose}
          title={`${playerList[currentPlayerIndex]}'s Turn`}
          onClick={handleTurnModalClose}
        />
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>{t("questions")}</Text>
          <Text style={styles.pageTitle}>
            {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
        </View>
        <ProgressBar
          progress={(currentQuestionIndex + 1) / totalQuestions}
          width={null}
          style={styles.progressBar}
          color="#389936"
          unfilledColor="#CCCCCC"
          borderWidth={0}
        />
        <CenteredBox style={styles.centeredBox} height={"80%"}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((answer, index) => (
            <AppButton
              key={index}
              onClick={() => handleAnswer(answer)}
              backgroundColor={
                revealAnswers
                  ? answer.option === question.correctAnswer
                    ? "#389936" // Green for correct
                    : "#FF2F2F" // Red for incorrect
                  : "#DEAE48" // Default color
              }
              disabled={buttonsDisabled}
            >
              <Text style={styles.optionText}>{answer.text}</Text>
            </AppButton>
          ))}
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
  topContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: -40,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  progressBar: {
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  centeredBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
});

export default QuestionScreen;
