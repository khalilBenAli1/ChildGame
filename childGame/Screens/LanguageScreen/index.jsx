import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import AppButton from "../../Components/AppButton";
import CountryFlag from "react-native-country-flag";

const LanguageScreen = () => {
  const handleLanguageChange = (language) => {
    console.log("Language selected:", language);
  };

  const handleNext = () => {
    console.log("Next button pressed");
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <CenteredBox>
        <Text style={styles.title}>EXPERIENCE LANGUAGE</Text>
        <Text style={styles.subtitle}>
          Before we start choose the language that you Prefer
        </Text>
        <AppButton
          onClick={() => handleLanguageChange("arabic")}
          backgroundColor="#DEAE48"
        >
          <View style={styles.languagesContainer}>
            <View style={styles.flags}>
              <CountryFlag isoCode="TN" size={25} />
            </View>
            <Text style={styles.buttonText}>Arabic</Text>
          </View>
        </AppButton>
        <AppButton
          onClick={() => handleLanguageChange("english")}
          backgroundColor="#DEAE48"
        >
          <View style={styles.languagesContainer}>
            <View style={styles.flags}>
              <CountryFlag isoCode="US" size={25} />
            </View>
            <Text style={styles.buttonText}>English</Text>
          </View>
        </AppButton>
        <AppButton
          onClick={() => handleLanguageChange("french")}
          backgroundColor="#DEAE48"
        >
          <View style={styles.languagesContainer}>
            <View style={styles.flags}>
              <CountryFlag isoCode="FR" size={25} />
            </View>
            <Text style={styles.buttonText}>French</Text>
          </View>
        </AppButton>
        <View style={styles.nextButtonContainer}>
          <AppButton onClick={handleNext} backgroundColor="#389936">
            <Text style={styles.nextButtonText}>Next</Text>
          </AppButton>
        </View>
      </CenteredBox>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
    marginTop:-30,
  },
  subtitle: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginVertical: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    marginLeft: 10,
    fontWeight:"bold",
    fontSize:20
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize:20,
    fontWeight:"bold",
  },

  nextButtonContainer: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    alignItems:"center"
  },
  languagesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flags: {
    width: 25,
    height: 25,
    borderRadius: "100%",
    overflow: "hidden",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LanguageScreen;
