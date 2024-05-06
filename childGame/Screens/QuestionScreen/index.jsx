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
import { useSelector, useDispatch } from "react-redux";

const QuestionScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { gameMode, playerCount, currentPlayerIndex, teamsInfo } = useSelector(
    (state) => state.game
  );
  const currentSeason = useSelector((state) => state.seasons.currentSeason);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (
      currentSeason &&
      currentSeason.challenges.length > 0 &&
      playerCount > 0
    ) {
      let questionsPerParticipant =
        gameMode === "individual"
          ? Math.floor(currentSeason.challenges.length / playerCount)
          : Math.floor(currentSeason.challenges.length / teamsInfo.length);

      let startIndex = currentPlayerIndex * questionsPerParticipant;
      let endIndex = Math.min(
        startIndex + questionsPerParticipant,
        currentSeason.challenges.length
      );

      setQuestions(currentSeason.challenges.slice(startIndex, endIndex));
      setCurrentQuestionIndex(0);
    }
  }, [
    currentSeason,
    currentPlayerIndex,
    gameMode,
    playerCount,
    teamsInfo.length,
  ]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.option); // Track which option was selected
    setRevealAnswers(true); // Set to reveal all answers
    setButtonsDisabled(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle end of quiz, e.g., navigate to a results screen or show summary
      }
      setSelectedAnswer(null);
      setRevealAnswers(false);
      setButtonsDisabled(false); // Reset for the next question
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
    color: "black",
  },
  questionTexte: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default QuestionScreen;
