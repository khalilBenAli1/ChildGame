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

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const MatchScreen = ({ images = imageUrls }) => {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [isInteractable, setIsInteractable] = useState(true);
  const [showTurnModal, setShowTurnModal] = useState(true);
  const [gameOver, setGameOver] = useState(false);
const dispatch=useDispatch()
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0);

  useEffect(() => {
    if (currentPlayerIndex === 0) {
      resetGameForNextPlayer(); // Initialize the game when the component mounts or when it's the first player's turn
    }
    console.log(currentPlayerIndex,"currentPlayerIndex")
  }, [currentPlayerIndex]);

  const {
    gameMode,
    playerCount,
    currentPlayerIndex,
    teamsInfo,
    playerNames,
    roundStart,
    scores,
  } = useSelector((state) => state.game);
  const initialTime = 60;
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
      Alert.alert("Congratulations!", "You've won the game!");
      finalizeCurrentPlayerTurn()
    }
  }, [matchedIndices, images.length]);

  const handleTimeOut = () => {
    if (!gameOver) {
      Alert.alert("Time's up!", "You've lost the game.", [
        {
          text: "OK",
          onPress: () => {
            dispatch(updateScore(playerList[currentPlayerIndex], false));
            if (currentPlayerIndex + 1 < players) {
              finalizeCurrentPlayerTurn();
            setResetTimerTrigger((prev) => prev + 1);
            }
            else{
              console.log("finished")
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
    }
    else{console.log('fnished')}
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
      <SafeAreaView style={styles.container}>
        <CenteredBox style={styles.centeredBox} height={"90%"}>
        <CountdownTimer
          initialTime={initialTime}
          onEnd={handleTimeOut}
          start={!showTurnModal && !gameOver}
          resetTrigger={resetTimerTrigger}
          extraTime={0}
        />
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
                    <Image source={{ uri: image }} style={styles.image} />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  centeredBox: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20, // Space between grid and timer
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  tile: {
    width: 100,
    height: 100,
    margin: 10,
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
});

export default MatchScreen;
