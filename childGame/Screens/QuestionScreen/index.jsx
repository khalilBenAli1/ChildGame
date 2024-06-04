import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";
import RoundStart from "../../Modals/RoundStart";
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
import SuperCardQuestion from "../../Modals/SuperCardQuestion";
import { extraTimeCodes , skipAndScoreCodes} from "../../data/extraTimeCodes";
import { playSound } from "../../utils/sound";
import useDisableBackButton from "../../utils/useDisableBackButton";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const QuestionScreen = () => {
  useDisableBackButton()
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
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTimer, setStartTimer] = useState(false);
  const [showfinishedRound, setShowfinishedRound] = useState(false);
  const [showSuperCard, setShowSuperCard] = useState(false);
  const [extraTime, setExtraTime] = useState(0);
  const [usedCodes, setUsedCodes] = useState(new Set());
  const [playerQuestions, setPlayerQuestions] = useState([]);

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const playerList =
    gameMode === "individual"
      ? playerNames
      : teamsInfo.map((element) => element.name);
  const timerDuration = 20;
  const players = gameMode === "individual" ? playerCount : teamsInfo.length;


  useEffect(() => {
    if (currentSeason && currentSeason.challenges.length > 0) {
      let allQuestions = [...currentSeason.challenges];
      const questionsPerParticipant =3


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
        shuffleArray(selectedQuestions)
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


  const addExtraTime = (seconds) => {
    setExtraTime(prevExtra => prevExtra + seconds);
  };

  const handleSuperCardSubmit = (code) => {
    const upperCaseCode = code.toUpperCase();
  
    if (usedCodes.has(upperCaseCode)) {
      Alert.alert("Erreur", "Ce code a déjà été utilisé.");
      return;
    }
  
    // Handle extra time codes
    if (extraTimeCodes[upperCaseCode]) {
      addExtraTime(extraTimeCodes[upperCaseCode]);
      setUsedCodes(prevSet => new Set(prevSet.add(upperCaseCode))); // Add code to the used set
      Alert.alert("Succès", `Ajout de ${extraTimeCodes[upperCaseCode]} secondes !`);
      playSound('victory');
      return;
    }
  
    // Handle skip and score codes
    if (skipAndScoreCodes[upperCaseCode]) {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setExtraTime(0)
        dispatch(updateScore(playerList[currentPlayerIndex], true))
      setUsedCodes(prevSet => new Set(prevSet.add(upperCaseCode))); // Add code to the used set
      Alert.alert("Succès", "Question passée et score ajouté !");
      } else if (currentPlayerIndex + 1 < players) {
        dispatch(updateScore(playerList[currentPlayerIndex], true))
      setUsedCodes(prevSet => new Set(prevSet.add(upperCaseCode))); // Add code to the used set
      Alert.alert("Succès", "Question passée et score ajouté !");
        setShowfinishedRound(true);
        
      } else {
        dispatch(updateScore(playerList[currentPlayerIndex], true))
      setUsedCodes(prevSet => new Set(prevSet.add(upperCaseCode))); // Add code to the used set
      Alert.alert("Succès", "Question passée et score ajouté !");
        finalizeCurrentPlayerTurn();
      }
      return;
    }
  
    Alert.alert("Erreur", "Code invalide");
  };
  const handleRoundStartClose = () => {
    setShowRoundStartModal(false);
    setStartTimer(true);
  };

  const finalizeCurrentPlayerTurn = () => {
    let players = gameMode === "individual" ? playerCount : teamsInfo.length;
    if (currentPlayerIndex + 1 < players) {
      dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
      resetQuestionsForNextPlayer(currentPlayerIndex + 1);
    } else {
      dispatch(setCurrentPlayerIndex(0));
      console.log(currentSeason.title)
      if (currentSeason.title==="Printemps" || currentSeason.title==="الربيع") {
        navigation.replace("CompleteWord");
      } else {
        navigation.replace("MatchGame");
      }
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
  };

  const handleRoundStart = () => {
    dispatch(toggleRound(false));
    handleRoundStartClose();
  };
  const handleFinishedRound = () => {
    setShowfinishedRound(false);
    finalizeCurrentPlayerTurn();
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.option);
    setSelectedOption(answer);
    setRevealAnswers(true);
    setButtonsDisabled(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setExtraTime(0)
      } else if (currentPlayerIndex + 1 < players) {
        setShowfinishedRound(true);
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
      } else if (currentPlayerIndex + 1 < players) {
        resetStatesForNextQuestion();
        setShowfinishedRound(true);
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
          bannerText={
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 20,
                marginTop: -14,
              }}
            >
              Round 1
            </Text>
          }
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
        <CompletedRound
          isVisible={
            currentPlayerIndex + 1 < players ? showfinishedRound : false
          }
          onClose={handleFinishedRound}
          title="Round Complete"
          targetName={playerList[currentPlayerIndex + 1]}
          onClick={handleFinishedRound}z
        />
        <SuperCardQuestion
          isVisible={showSuperCard}
          onClose={() => {
            setShowSuperCard(false);
            if (currentQuestionIndex + 1 < totalQuestions) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              playSound('defait');
            }
            else{
              finalizeCurrentPlayerTurn();
              playSound('defait');
            }
            resetStatesForNextQuestion();
          }}
          onClick={handleSuperCardSubmit}
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
              onEnd={() =>
                buttonsDisabled || showSuperCard ? null : handleTimerEnd()
              }
              resetTrigger={resetTimerTrigger}
              start={!roundStart && !showfinishedRound}
              extraTime={extraTime} 
            />
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((answer, index) => (
            <AppButton
              key={index}
              onClick={() => {
                if (answer.option === question.correctAnswer) {
                  dispatch(updateScore(playerList[currentPlayerIndex], true));
                  playSound('victory');
                } else {
                  dispatch(updateScore(playerList[currentPlayerIndex], false));
                  playSound('defait');
                }
                handleAnswer(answer);
              }}
              backgroundColor={
                revealAnswers
                  ? answer.option === selectedOption?.option
                    ? answer.option === question.correctAnswer
                      ? "#389936" // Green
                      : "#FF2F2F" // Red
                    : "#D9D9D9" // Dim
                  : "#DEAE48" // Default
              }
              disabled={buttonsDisabled}
            >
              <Text style={styles.optionText}>{answer.text}</Text>
            </AppButton>
          ))}
          <View
            style={{
              width: "60%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <Image
              source={require("../../assets/newImgs/Group 6970.png")}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <AppButton
              backgroundColor={"#FF2F2F"}
              onClick={() => setShowSuperCard(true)}
            >
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
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    color: "black",
  },
  optionText: {
    maxWidth: "80%",
    color: "white",
    fontWeight: "600",
  },
});

export default QuestionScreen;
