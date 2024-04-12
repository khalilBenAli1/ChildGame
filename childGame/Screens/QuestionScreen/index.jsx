import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";

const sampleQuestions = [
  {
    id: 1,
    text: "What is the capital of France?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg", // A placeholder image of Paris
    answers: [
      { id: "a1", text: "Paris", isCorrect: true },
      { id: "a2", text: "London", isCorrect: false },
      { id: "a3", text: "Berlin", isCorrect: false },
    ],
  },
  {
    id: 2,
    text: "What is the largest planet in our solar system?",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Jupiter.jpg", // A placeholder image of Jupiter
    answers: [
      { id: "a1", text: "Mars", isCorrect: false },
      { id: "a2", text: "Jupiter", isCorrect: true },
      { id: "a3", text: "Saturn", isCorrect: false },
    ],
  },
  {
    id: 3,
    text: "What year did the Titanic sink?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/RMS_Titanic_3.jpg", // A placeholder image of the Titanic
    answers: [
      { id: "a1", text: "1912", isCorrect: true },
      { id: "a2", text: "1905", isCorrect: false },
      { id: "a3", text: "1898", isCorrect: false },
    ],
  },
];

const QuestionScreen = ({ questions = sampleQuestions }) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    setShowAnswer(true);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle end of questions (e.g., navigate to a results screen)
      }
      setSelectedAnswer(null);
      setShowAnswer(false);
    }, 2000);
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")} // Make sure this path is correct
      style={styles.fullScreen}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.pageTitle}>
            {t("questions")}
          </Text>
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
        <CenteredBox style={styles.centeredBox}>
          <Text style={styles.timerPlaceholder}>
            {t("timerPlaceholder")} Timer Placeholder
          </Text>
          <Image
            source={{ uri: question.image }}
            style={styles.questionImage}
          />
          <Text style={styles.questionTexte}>{question.text}</Text>
          {question.answers.map((answer) => (
            <AppButton
              key={answer.id}
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
  topContainer:{
    display:"flex",
    flexDirection:"row",
    width:"90%",
    justifyContent:"space-between",
    marginTop:-40,
    marginBottom:10,
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
    marginBottom:20,

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
    borderRadius:10,
  },
  questionText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  questionTexte:{
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  }
});

export default QuestionScreen;
