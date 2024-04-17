import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from "react-native";

const gridSize = 3;
const screenWidth = Dimensions.get("window").width;
const tileWidth = screenWidth / gridSize;

const PuzzleSlicing = ({ imageUri, onPuzzleSolve }) => {
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(gridSize * gridSize - 1);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    let initialTiles = Array.from(Array(gridSize * gridSize).keys());
    initialTiles.pop();
    initialTiles.push(null);
    do {
      shuffleTiles(initialTiles);
    } while (!isSolvable(initialTiles));
  };

  const isSolvable = (tiles) => {
    let inversions = 0;
    tiles.forEach((current, i) => {
      if (current !== null) {
        for (let j = i + 1; j < tiles.length; j++) {
          if (tiles[j] !== null && tiles[j] < current) {
            inversions++;
          }
        }
      }
    });
    return inversions % 2 === 0;
  };

  const shuffleTiles = (tiles) => {
    let shuffledTiles = [...tiles];
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [
        shuffledTiles[j],
        shuffledTiles[i],
      ];
    }
    setTiles(shuffledTiles);
    setEmptyIndex(shuffledTiles.indexOf(null));
  };

  const handleTilePress = (index) => {
    if (isAdjacent(index, emptyIndex)) {
      let newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [
        newTiles[index],
        newTiles[emptyIndex],
      ];
      setTiles(newTiles);
      setEmptyIndex(index);
      checkIfSolved(newTiles);
    }
  };

  const isAdjacent = (index, emptyIndex) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const checkIfSolved = (tiles) => {
    if (tiles.every((tile, index) => tile === index || tile === null)) {
      onPuzzleSolve();
    }
  };

  return (
    <View style={styles.grid}>
      {tiles.map((tile, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tile}
          onPress={() => handleTilePress(index)}
        >
          {tile !== null ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: tileWidth,
                height: tileWidth,
                position: "absolute",
                left: -(tile % gridSize) * tileWidth,
                top: -Math.floor(tile / gridSize) * tileWidth,
              }}
              resizeMode="cover"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error("Failed to load image:", e.nativeEvent.error); // This will log more detailed error information
                setImageLoaded(false);
              }}
            />
          ) : (
            <View style={styles.emptyTile}></View>
          )}
        </TouchableOpacity>
      ))}
      {!imageLoaded && (
        <Text style={styles.errorText}>Image failed to load.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screenWidth,
    height: screenWidth,
  },
  tile: {
    width: tileWidth,
    height: tileWidth,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#333",
  },
  emptyTile: {
    backgroundColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    position: "absolute",
    top: 20,
    left: 20,
  },
});

export default PuzzleSlicing;
