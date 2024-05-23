import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateScore } from "../../store/actions/gameActions";
import { setCurrentPlayerIndex } from "../../store/actions/gameActions";
import useDisableBackButton from "../../utils/useDisableBackButton";
import { playSound } from "../../utils/sound";

const AnswerScreen = () => {
  useDisableBackButton();
  const [answer, setAnswer] = useState("");
  const guessWord = useSelector((state) => state.game.guessWord);
  const navigation = useNavigation();
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
  const dispatch = useDispatch();
  const handleAnswerSubmit = () => {
    if (answer.trim().toLowerCase() === guessWord.word.toLowerCase()) {
      playSound("victory");
      Alert.alert("Bonne réponse", "Vous avez trouvé la bonne réponse !", [
        {
          text: "OK",
          onPress: () => {
            dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
            navigation.navigate("GuessWord");
          },
        },
      ]);
    } else {
      playSound("defait");
      Alert.alert("Réponse incorrecte", "Ce n'est pas la bonne réponse.", [
        {
          text: "OK",
          onPress: () => {
            dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
            navigation.navigate("GuessWord");
          },
        },
      ]);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
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
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CountdownTimer
              initialTime={30}
              onEnd={() => {
                playSound("defait");
                Alert.alert(
                  "Réponse incorrecte",
                  "Ce n'est pas la bonne réponse.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
                        navigation.navigate("GuessWord");
                      },
                    },
                  ]
                );
              }}
              start={true}
              extraTime={0}
            />
            <Image
              source={require("../../assets/imgs/Guess.png")}
              style={styles.image}
            />
            <Text style={styles.description}>
              Saisissez le mot que votre ami décrit :
            </Text>

            <TextInput
              style={styles.input}
              onChangeText={setAnswer}
              value={answer}
              placeholder="Your word here"
              placeholderTextColor="#ccc"
            />
            <AppButton
              backgroundColor={"#389936"}
              onClick={() => handleAnswerSubmit()}
            >
              <Text style={styles.buttonText}>Soumettre la réponse</Text>
            </AppButton>
          </ScrollView>
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
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: "#000",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AnswerScreen;
