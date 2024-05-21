import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";

const RoundPoints = ({
  isVisible,
  onClose,
  bannerText,
  numberOfPlayers,
  mode,
  players,
  scores,
}) => {
  const getRankDetails = (rank) => {
    if (rank === 0) {
      // Highest score
      return { message: "Roll Dice + BONUS CARD", color: "#389936" };
    } else if (rank === 1 && numberOfPlayers > 2 ) {
      return { message: "Roll Dice", color: "#389936" };
    } else {
      return { message: "No Card No Rolling Dice", color: "#FF2156" };
    }
  };

  const sortedPlayers = players
    .map((name) => ({ name, score: scores[name] ? scores[name].correct : 0 }))
    .sort((a, b) => b.score - a.score);

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      height="93%"
      hasBanner
      bannerText={bannerText}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/imgs/Score.png")}
          style={styles.image}
        />
        <Text style={styles.roundPointsTitle}>Round Points</Text>
        <View style={styles.namesContainer}>
          {players.map((name, index) => (
           <React.Fragment key={index}>
              <View key={index} style={styles.nameBox}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.scoreCont}>
                  <Text
                    style={styles.numberAnswers}
                  >{scores[name] ? `${scores[name].correct}`:null}</Text>
                  <Text style={styles.score}>Correct</Text>
                  <Text style={styles.score}>Answers</Text>
                </View>
              </View>
              {index < players.length - 1 && <View style={styles.separator} />}
              </React.Fragment>
          ))}
        </View>
        <Text style={styles.roundResult}>Round Result</Text>
        <View style={styles.namesContainer}>
          {sortedPlayers.map((player, index) => {
            const rankDetails = getRankDetails(index);
            return (
              <React.Fragment key={index}>
                <View key={index} style={styles.nameBox}>
                  <Text style={styles.name}>{player.name}</Text>
                  <View style={styles.scoreCont}>
                  <Text style={[styles.rankMessage, { color: rankDetails.color }]}>{rankDetails.message}</Text>
                  </View>
                </View>
                {index < players.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      <AppButton onClick={onClose} backgroundColor={"#389936"}>
        <Text style={styles.buttonText}>Move to the next round</Text>
      </AppButton>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  roundPointsTitle: {
    fontSize: 22,
    color: "#389936",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  rankMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DEAE48",
    textAlign: "center",
    marginBottom: 10,
    width: 80,
  },
  roundResult: {
    fontSize: 22,
    color: "#DEAE48",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  namesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 20,
  },
  numberAnswers: {
    color: "#389936",
    fontWeight: "bold",
  },
  nameBox: {
    flexDirection: "column", // Ensure vertical stacking of name and score
    alignItems: "center",
    paddingHorizontal: 30, // Adjust as necessary for spacing
  },
  name: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  score: {
    fontSize: 14,
    flexDirection: "column",
    alignItems: "center",
    color: "#555",
  },
  scoreCont: {
    flexDirection: "column",
    alignItems: "center",
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#000",
    marginHorizontal: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default RoundPoints;
