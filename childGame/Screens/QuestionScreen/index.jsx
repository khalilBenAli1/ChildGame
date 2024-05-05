import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";
import RoundStart from "../../Modals/RoundStart";
import { useSelector, useDispatch } from "react-redux";

const QuestionScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { gameMode, playerCount, currentPlayerIndex, teamsInfo } = useSelector(
    (state) => state.game
  );
  const currentSeason = useSelector(
    (state) => state.seasons.currentSeason
  );
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const { game } = useSelector((state) => state);
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const teamNames = game.teamsInfo.map((player) => "Team " + player.name);

  useEffect(() => {
 
    if (currentSeason && currentSeason.challenges) {
      let questionsPerParticipant;
      let startIndex;
      let endIndex;

      if (gameMode === "individual") {
        questionsPerParticipant = Math.floor(
          currentSeason.challenges.length / playerCount
        );
        startIndex = currentPlayerIndex * questionsPerParticipant;
        endIndex = startIndex + questionsPerParticipant;
      } else {
        questionsPerParticipant = Math.floor(
          currentSeason.challenges.length / 3
        );
        startIndex = currentPlayerIndex * questionsPerParticipant;
        endIndex = startIndex + questionsPerParticipant;
      }

      setQuestions(currentSeason.challenges.slice(startIndex, endIndex));
      setCurrentQuestionIndex(0);
    }
  }, [
    currentSeason,
    currentPlayerIndex,
    gameMode,
    playerCount,
    teamsInfo,
  ]);
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    setShowAnswer(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setResetTimerTrigger((prev) => prev + 1);
      } else {
        // Handle end of questions (navigate to a results screen)
      }
      setSelectedAnswer(null);
      setShowAnswer(false);
    }, 2000);
  };
  useEffect(() => {
    if (currentSeason) {
      dispatch(setCurrentPlayerIndex(0));
    }
  }, [currentSeason, dispatch]);
  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      {   console.log("currentSeason " + currentSeason.challenges + "currentSeasonIndex:"+currentSeason.title) }
      <RoundStart
        isVisible={true}
        onClose={() => console.log("Close modal")}
        text={"Round " + game.roundNumber}
        mode={game.gameMode}
        orderList={
          game.gameMode === "individual" ? game.playerNames : teamNames
        }
        onClick={() => setShowModal(false)}
      />
      <SafeAreaView style={styles.container}>
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
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CountdownTimer
              initialTime={10}
              onEnd={() => {
                if (currentQuestionIndex + 1 < totalQuestions) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  setResetTimerTrigger((prev) => prev + 1);
                }
              }}
              resetTrigger={resetTimerTrigger}
            />
          </View>
          <Text style={styles.questionTexte}>{question.question}</Text>
          {question.options.map((answer,index) => (
            <AppButton
              key={index}
              onClick={() => handleAnswer(answer)}
              backgroundColor={
                showAnswer
                  ? answer.isCorrect
                    ? "#389936"
                    : "#FF2F2F"
                  : "#DEAE48"
              }
            >
              <Text style={styles.questionText}>{answer.text}</Text>
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
  timerPlaceholder: {
    fontSize: 18,
    marginBottom: 10,
  },
  questionImage: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  questionTexte: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default QuestionScreen;
