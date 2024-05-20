import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, SafeAreaView, Alert } from "react-native";
import { imageUrls } from "../../data/images";
import CenteredBox from "../../Components/CenteredBox";
import CountdownTimer from "../../Components/CountdownTimer";

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
  const [gameOver, setGameOver] = useState(false);
  const initialTime = 60; // Set initial timer count down from 60 seconds

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, [images]);

  useEffect(() => {
    if (matchedIndices.length === images.length) {
      Alert.alert("Congratulations!", "You've won the game!");
      setGameOver(true);
    }
  }, [matchedIndices, images.length]);

  const handleTimeOut = () => {
    if (!gameOver) {
      Alert.alert("Time's up!", "You've lost the game.");
      setGameOver(true);
      setIsInteractable(false);
    }
  };

  const handleTilePress = (index) => {
    if (!isInteractable || flippedIndices.includes(index) || matchedIndices.includes(index) || gameOver) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsInteractable(false);
      const match = shuffledImages[newFlippedIndices[0]] === shuffledImages[newFlippedIndices[1]];
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
      <SafeAreaView style={styles.container}>
        <CenteredBox style={styles.centeredBox} height={'90%'}>
        <CountdownTimer initialTime={initialTime} onEnd={handleTimeOut} />
          <View style={styles.grid}>
            {shuffledImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tile}
                onPress={() => handleTilePress(index)}
                disabled={!isInteractable || gameOver}
              >
                <View style={[
                  styles.card,
                  flippedIndices.includes(index) || matchedIndices.includes(index) ? styles.cardFlipped : styles.cardCovered
                ]}>
                  {(flippedIndices.includes(index) || matchedIndices.includes(index)) && (
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,  // Space between grid and timer
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
    overflow: 'hidden',
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
