import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const numColumns = 3;
const numRows = 3;
const windowWidth = Dimensions.get('window').width;
const tileWidth = windowWidth / numColumns;
const tileHeight = tileWidth;
const imageUri = "https://media.gq-magazine.co.uk/photos/645b5c3c8223a5c3801b8b26/16:9/w_1280,c_limit/100-best-games-hp-b.jpg";
// Function to initialize tiles
const initializeTiles = () => {
    let tiles = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numColumns; col++) {
            tiles.push({
                row,
                col,
                originalRow: row,
                originalCol: col,
            });
        }
    }
    tiles[tiles.length - 1].isEmpty = true; // Mark the last tile as empty
    return shuffleTiles(tiles); // Shuffle tiles while ensuring solvability
};

// Function to shuffle tiles ensuring the puzzle is solvable
const shuffleTiles = (tiles) => {
    let shuffledTiles = [...tiles];
    let emptyIndex = shuffledTiles.length - 1;

    // Perform swaps to shuffle tiles
    for (let i = 0; i < 300; i++) {
        const adjacentIndices = getAdjacentIndices(emptyIndex);
        const randomIndex = adjacentIndices[Math.floor(Math.random() * adjacentIndices.length)];
        [shuffledTiles[emptyIndex], shuffledTiles[randomIndex]] = [shuffledTiles[randomIndex], shuffledTiles[emptyIndex]];
        emptyIndex = randomIndex;
    }

    return shuffledTiles;
};

// Function to get valid adjacent tile indices
const getAdjacentIndices = (index) => {
    const { row, col } = indexToRowCol(index);
    let indices = [];
    if (row > 0) indices.push(rowColToIndex(row - 1, col)); // Up
    if (row < numRows - 1) indices.push(rowColToIndex(row + 1, col)); // Down
    if (col > 0) indices.push(rowColToIndex(row, col - 1)); // Left
    if (col < numColumns - 1) indices.push(rowColToIndex(row, col + 1)); // Right
    return indices.filter(index => index !== -1);
};

const indexToRowCol = (index) => ({ row: Math.floor(index / numColumns), col: index % numColumns });
const rowColToIndex = (row, col) => row * numColumns + col;

const SlidingPuzzle = () => {
    const [tiles, setTiles] = useState(initializeTiles());

    const moveTile = (index) => {
        const emptyIndex = tiles.findIndex(t => t.isEmpty);
        const targetIndex = index;

        if (getAdjacentIndices(emptyIndex).includes(targetIndex)) {
            let newTiles = [...tiles];
            [newTiles[emptyIndex], newTiles[targetIndex]] = [newTiles[targetIndex], newTiles[emptyIndex]];
            setTiles(newTiles);
        }
    };

    return (
        <View style={styles.container}>
            {tiles.map((tile, index) => (
                <TouchableOpacity key={index} style={[styles.tile, {
                    left: tile.col * tileWidth,
                    top: tile.row * tileHeight,
                }]} onPress={() => moveTile(index)} disabled={tile.isEmpty}>
                    {!tile.isEmpty && (
                        <Image
                            source={{ uri: imageUri }}
                            style={{
                                width: windowWidth,
                                height: windowWidth,
                                position: 'absolute',
                                left: -tile.originalCol * tileWidth,
                                top: -tile.originalRow * tileHeight,
                            }}
                            resizeMode="cover"
                        />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowWidth,
        position: 'relative',
    },
    tile: {
        width: tileWidth,
        height: tileHeight,
        overflow: 'hidden',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SlidingPuzzle;
