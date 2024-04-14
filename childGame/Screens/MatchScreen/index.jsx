import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import CenteredBox from "../../Components/CenteredBox"; 

const MatchScreen = ({ images=imageUrls }) => {
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  const handleTilePress = (index) => {
    if (flippedIndices.includes(index) || matchedIndices.includes(index)) {
      return; 
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const match = images[newFlippedIndices[0]] === images[newFlippedIndices[1]];
      if (match) {
        setMatchedIndices([...matchedIndices, ...newFlippedIndices]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
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
        <CenteredBox style={styles.centeredBox}>
          <View style={styles.grid}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tile}
                onPress={() => handleTilePress(index)}
              >
                <View style={[
                  styles.card,
                  (flippedIndices.includes(index) || matchedIndices.includes(index)) ? styles.cardFlipped : styles.cardCovered
                ]}>
                  {flippedIndices.includes(index) || matchedIndices.includes(index) ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : null}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#ccc", // Default covered color
    overflow: 'hidden',
  },
  cardFlipped: {
    backgroundColor: "#fff", // White background to show the image
  },
  cardCovered: {
    backgroundColor: "#ccc", // Grey background to hide the image
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default MatchScreen;



const imageUrls = [
  "https://via.placeholder.com/150/0000FF/808080?Text=Image1",
  "https://via.placeholder.com/150/0000FF/808080?Text=Image1",
  "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image2", 
  "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image2",
  "https://via.placeholder.com/150/FFFF00/000000?Text=Image3",
  "https://via.placeholder.com/150/FFFF00/000000?Text=Image3",
  "https://via.placeholder.com/150/008000/FFFFFF?Text=Image4",
  "https://via.placeholder.com/150/008000/FFFFFF?Text=Image4",
  "https://via.placeholder.com/150/FFA500/000000?Text=Image5",
  "https://via.placeholder.com/150/FFA500/000000?Text=Image5"  
];
