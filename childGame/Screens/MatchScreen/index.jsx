import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  Modal,
  Button,
} from "react-native";
import { imageUrls } from "../../data/images";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleRound,
  setCurrentPlayerIndex,
} from "../../store/actions/gameActions";
import Turn from "../../Modals/Turn";
import { updateScore } from "../../store/actions/gameActions";
import useDisableBackButton from "../../utils/useDisableBackButton";
import { useNavigation } from "@react-navigation/native";
import { playSound } from "../../utils/sound";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";
function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const MatchScreen = ({ images = imageUrls }) => {
  useDisableBackButton();
  const [shuffledImages, setShuffledImages] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [isInteractable, setIsInteractable] = useState(true);
  const [showTurnModal, setShowTurnModal] = useState(true);
  const [showNextPlayerModal, setShowNextPlayerModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const dispatch = useDispatch();
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    if (currentPlayerIndex === 0) {
      resetGameForNextPlayer();
    }
    console.log(currentPlayerIndex, "currentPlayerIndex");
  }, [currentPlayerIndex]);

  const { gameMode, playerCount, currentPlayerIndex, teamsInfo, playerNames } =
    useSelector((state) => state.game);
  const initialTime = 30;
  const playerList =
    gameMode === "individual"
      ? playerNames
      : teamsInfo.map((element) => element.name);
  const players = gameMode === "individual" ? playerCount : teamsInfo.length;

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, [images]);

  useEffect(() => {
    if (matchedIndices.length === images.length) {
      playSound("victory");
      Alert.alert("Félicitations !", "Vous avez gagné le jeu !");
      dispatch(updateScore(playerList[currentPlayerIndex], true));
      setResetTimerTrigger((prev) => prev + 1);
      finalizeCurrentPlayerTurn();
    }
  }, [matchedIndices, images.length]);

  const handleTimeOut = () => {
    if (!gameOver) {
      playSound("defait");
      Alert.alert("Temps écoulé !", "Vous avez perdu le jeu.", [
        {
          text: "OK",
          onPress: () => {
            dispatch(updateScore(playerList[currentPlayerIndex], false));
            if (currentPlayerIndex + 1 < players) {
              finalizeCurrentPlayerTurn();
              setResetTimerTrigger((prev) => prev + 1);
            } else {
              setShowNextPlayerModal(true);
            }
          },
        },
      ]);
      setGameOver(true);
      setIsInteractable(false);
    }
  };

  const finalizeCurrentPlayerTurn = () => {
    if (currentPlayerIndex + 1 < players) {
      dispatch(setCurrentPlayerIndex(currentPlayerIndex + 1));
      resetGameForNextPlayer();
      setShuffledImages(shuffleArray(images)); // Reset images for next player
      setMatchedIndices([]); // Reset matches
      setFlippedIndices([]); // Reset flipped indices
      setIsInteractable(true);
      setShowTurnModal(true);
    } else {
      setShowNextPlayerModal(true);
    }
  };

  const closeNextModal = () => {
    setShowNextPlayerModal(false);
    setTimeout(() => {
      dispatch(setCurrentPlayerIndex(0));
      navigation.replace("GuessWord");
    }, 500);
   
  };
  const resetGameForNextPlayer = () => {
    setShuffledImages(shuffleArray(images)); // Reset images for next player
    setMatchedIndices([]); // Reset matches
    setFlippedIndices([]); // Reset flipped indices
    setGameOver(false);
    setIsInteractable(true);
  };

  const handleTilePress = (index) => {
    if (
      !isInteractable ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index) ||
      gameOver
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsInteractable(false);
      const match =
        shuffledImages[newFlippedIndices[0]] ===
        shuffledImages[newFlippedIndices[1]];
      if (match) {
        const newMatchedIndices = [...matchedIndices, ...newFlippedIndices];
        setMatchedIndices(newMatchedIndices);
        setFlippedIndices([]);
        setIsInteractable(true);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setIsInteractable(true);
        }, 1000);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.fullScreen}
    >
      <Turn
        isVisible={showTurnModal}
        onClose={() => setShowTurnModal(false)}
        title={`${playerList[currentPlayerIndex]}'s Turn`}
        onClick={() => setShowTurnModal(false)}
      />

      <CustomModal
      isVisible={showNextPlayerModal}
      onClose={() => console.log("closed")}
      height={"60%"}
      >
          <Image source={require("../../assets/imgs/first.png")} style={{height:150}} resizeMode="contain"/>
          <Text style={{fontSize:14,marginVertical:10}}>Pour le prochain jeu, un seul joueur doit tenir le téléphone et voir le mot.</Text>
          <AppButton
              backgroundColor={"#FF2F2F"}
              onClick={() => closeNextModal()}
            >
              <Text style={styles.optionText}>procéder</Text>
            </AppButton>
      </CustomModal>

      <SafeAreaView style={styles.container}>
        <CenteredBox style={styles.centeredBox} height={"90%"}>

          <CountdownTimer
            initialTime={initialTime}
            onEnd={handleTimeOut}
            start={!showTurnModal}
            resetTrigger={resetTimerTrigger}
            extraTime={0}
          />
           <Text style={styles.gameDescription}>
          Trouvez les paires correspondantes le plus rapidement possible pour gagner des points!
        </Text>
          <View style={styles.grid}>
            {shuffledImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tile}
                onPress={() => handleTilePress(index)}
                disabled={!isInteractable || gameOver}
              >
                <View
                  style={[
                    styles.card,
                    flippedIndices.includes(index) ||
                    matchedIndices.includes(index)
                      ? styles.cardFlipped
                      : styles.cardCovered,
                  ]}
                >
                  {(flippedIndices.includes(index) ||
                    matchedIndices.includes(index)) && (
                    <Image source={image} style={styles.image} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
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
  optionText: {
    maxWidth: "80%",
    color: "white",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  centeredBox: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  tile: {
    width: 80,
    height: 80,
    margin: 5,
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  cardFlipped: {
    backgroundColor: "#fff",
  },
  cardCovered: {
    backgroundColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gameDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    padding: 10,

    marginVertical: 20,
  },
});

export default MatchScreen;
