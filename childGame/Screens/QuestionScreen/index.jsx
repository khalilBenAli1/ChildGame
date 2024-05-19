import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image
} from "react-native";
import { useTranslation } from "react-i18next";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";
import RoundStart from "../../Modals/RoundStart";
import Turn from "../../Modals/Turn";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRound,
  setCurrentPlayerIndex,
} from "../../store/actions/gameActions";
import { updateSeasonStatus } from "../../store/actions/seasonActions";
import { useNavigation } from "@react-navigation/native";
import { updateScore } from "../../store/actions/gameActions";
import CompletedRound from "../../Modals/CompletedRound";
import RoundPoints from "../../Modals/RoundPoints";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const QuestionScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.game);
  const {
    gameMode,
    playerCount,
    currentPlayerIndex,
    teamsInfo,
    playerNames,
    roundStart,
    scores,
  } = useSelector((state) => state.game);
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
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTimer, setStartTimer] = useState(false);

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const playerList =
    gameMode === "individual"
      ? playerNames
      : teamsInfo.map((element) => element.name);
  const timerDuration = 10;

  useEffect(() => {
    if (currentSeason && currentSeason.challenges.length > 0) {
      let allQuestions = [...currentSeason.challenges];
      shuffleArray(allQuestions);

      const questionsPerParticipant =
        gameMode === "individual"
          ? Math.floor(allQuestions.length / playerCount)
          : Math.floor(allQuestions.length / 3);

      const startIndex = currentPlayerIndex * questionsPerParticipant;
      const endIndex = Math.min(
        startIndex + questionsPerParticipant,
        allQuestions.length
      );

      const selectedQuestions = allQuestions
        .slice(startIndex, endIndex)
        .map((question) => ({
          ...question,
          options: [...question.options],
        }));

      selectedQuestions.forEach((question) => shuffleArray(question.options));

      setQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
    }
  }, [
    currentSeason,
    currentPlayerIndex,
    gameMode,
    playerCount,
    teamsInfo.length,
    roundStart,
  ]);

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
    setStartTimer(true);
  };
  const finalizeCurrentPlayerTurn = () => {
    let players = gameMode === "individual" ? playerCount : teamsInfo.length;
    if (currentPlayerIndex + 1 < players) {
      dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
      resetQuestionsForNextPlayer(currentPlayerIndex + 1);
    } else {
      // setShowCompletedModal(true);
      dispatch(setCurrentPlayerIndex(0));
      console.log("reset", currentPlayerIndex);
      navigation.replace("CompleteWord");
    }
  };
  const handleCompletedModalClose = () => {
    setShowCompletedModal(false);
    dispatch(updateSeasonStatus(currentSeason.title, true));
    dispatch(setCurrentPlayerIndex(0));
    navigation.navigate("Seasons");
  };
  const resetQuestionsForNextPlayer = (newPlayerIndex) => {
    let questionsPerParticipant =
      gameMode === "individual"
        ? Math.floor(currentSeason.challenges.length / playerCount)
        : Math.floor(currentSeason.challenges.length / 3);

    let startIndex = newPlayerIndex * questionsPerParticipant;
    let endIndex = Math.min(
      startIndex + questionsPerParticipant,
      currentSeason.challenges.length
    );

    setQuestions(currentSeason.challenges.slice(startIndex, endIndex));
    setCurrentQuestionIndex(0);
    setShowTurnModal(true);
  };

  const handleRoundStart = () => {
    dispatch(toggleRound(false));
    handleRoundStartClose();
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.option);
    setSelectedOption(answer);
    setRevealAnswers(true);
    setButtonsDisabled(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        finalizeCurrentPlayerTurn();
      }
      setSelectedAnswer(null);
      setSelectedOption(null);
      setRevealAnswers(false);
      setButtonsDisabled(false);
      setResetTimerTrigger((prev) => prev + 1);
    }, 2000);
  };
  const handleTimerEnd = () => {
    setSelectedAnswer("time_expired");
    setRevealAnswers(true);
    setButtonsDisabled(true);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        resetStatesForNextQuestion();
      } else {
        finalizeCurrentPlayerTurn();
      }
    }, 2000);
  };

  const resetStatesForNextQuestion = () => {
    setSelectedAnswer(null);
    setRevealAnswers(false);
    setButtonsDisabled(false);
    setResetTimerTrigger((prev) => prev + 1);
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
        <RoundPoints
          isVisible={showCompletedModal}
          onClose={handleCompletedModalClose}
          bannerText={<Text>Final Scores</Text>}
          numberOfPlayers={playerCount || teamsInfo.length}
          mode={gameMode}
          players={playerList}
          scores={scores}
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
        <CenteredBox style={styles.centeredBox} height={"88%"}>
          <View style={styles.counter}>
            <CountdownTimer
              initialTime={timerDuration}
              onEnd={() => (buttonsDisabled ? null : handleTimerEnd())}
              resetTrigger={resetTimerTrigger}
            />
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((answer, index) => (
            <AppButton
              key={index}
              onClick={() => {
                answer.option === question.correctAnswer
                  ? dispatch(updateScore(playerList[currentPlayerIndex], true))
                  : dispatch(
                      updateScore(playerList[currentPlayerIndex], false)
                    );
                handleAnswer(answer);
              }}
              backgroundColor={
                revealAnswers
                  ? answer.option === selectedOption?.option
                    ? answer.option === question.correctAnswer
                      ? "#389936" // Green for correct
                      : "#FF2F2F" // Red for incorrect
                    : "#D9D9D9" // Dim other options
                  : "#DEAE48" // Default color
              }
              disabled={buttonsDisabled}
            >
              <Text style={styles.optionText}>{answer.text}</Text>
            </AppButton>
          ))}
          <View style={{width:'60%',justifyContent:"center",alignItems:"center", position:"absolute",bottom:0}}>
          <Image source={require("../../assets/newImgs/Group 6970.png")} style={{width:60,height:60}} resizeMode="contain"/>
            <AppButton backgroundColor={"#FF2F2F"}>
              
              <Text style={styles.optionText}>Super Card</Text>
            </AppButton>
          </View>
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
    marginTop: -5,
    marginBottom: 10,
  },
  counter: {
    marginBottom: 30,
    marginTop: -120,
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
    marginBottom: 50,
    color: "black",
  },
  optionText: {
    maxWidth: "80%",
    color: "white",
    fontWeight: "600",
  },
});

export default QuestionScreen;
