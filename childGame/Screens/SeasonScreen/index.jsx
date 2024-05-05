
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SeasonCard from "../../Components/SeasonCard";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCurrentSeason } from "../../store/actions/seasonActions";
const SeasonScreen = () => {
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const { seasons } = useSelector((state) => state.seasons);
  const navigation = useNavigation();
  const handleSubmit = (season)=>{
    dispatch(setCurrentSeason(season))
    console.log(season)
    navigation.navigate("Questions")
  }
  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <Text style={styles.title}>Seasons</Text>
      {seasons.map((season, index) => (
        <View key={index} style={styles.cardContainer}>
          <View style={styles.iconAndCardContainer}>
            <View style={styles.iconContainer}>
              <Icon
                name={season.playable ? "check-circle" : "lock"}
                size={30}
                color={"white"}
                style={styles.icon}
              />
            </View>
            <SeasonCard
              title={season.title}
              numberOfChallenges={season.numberOfChallenges}
              difficulty={season.difficulty}
              completed={season.completed}
              color={season.completed ? "#1BAA76" : "#ccc"}
              onClick={() =>handleSubmit(index)}
              disabled={!season.playable}
            />
          </View>
          {index < seasons.length && <View style={styles.line} />}
        </View>
      ))}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "column",
    marginRight: 20,
  },
  iconAndCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  icon: {
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  iconContainer: {
    marginRight: 10,
    backgroundColor: "#DEAE48",
    borderRadius: 30,
    padding: 3,
    alignSelf: "flex-start",
    zIndex: 7,
  },
  line: {
    position: "absolute",
    height: "88%",
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "dashed",
    left: 16,
    top: 3,
    zIndex: 1,
  },
});

export default SeasonScreen;
