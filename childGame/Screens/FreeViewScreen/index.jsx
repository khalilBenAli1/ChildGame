import React, { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView , Image} from "react-native";
import AppButton from "../../Components/AppButton";
import CenteredBox from "../../Components/CenteredBox";
import * as ScreenOrientation from "expo-screen-orientation";
import { LinearGradient } from "expo-linear-gradient";

const HorizontalLayoutScreen = () => {
  useEffect(() => {
    // Lock the orientation to landscape mode when this component mounts
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    };
    changeScreenOrientation();

    // Reset orientation to default (portrait) when the component unmounts
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#244023", "#359A60"]} style={styles.background}>
        <View style={styles.leftColumn}>
          <View style={styles.modelContainer}>
            {/* Placeholder for 3D Model */}
            <Text>3D Model Goes Here</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <AppButton
              onClick={() => console.log("Button 1 clicked")}
              backgroundColor="#389936"
              borderColor="#CD9777"
            >
              <Text style={styles.buttonText}>Free View</Text>
            </AppButton>
            <AppButton
              onClick={() => console.log("Button 2 clicked")}
              backgroundColor="#389936"
              borderColor="#CD9777"
            >
              <Text style={styles.buttonText}>Augmented Reality</Text>
            </AppButton>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <CenteredBox height={"90%"}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.title}>Borj Lazarit</Text>
              <Text style={styles.subtitle}>
                Under the impetus of Moriscan engineers, the fortification of
                the 17th century adopted the technique of “hollow masonry” which
                appears to be the main characteristic of this new school. The
                forts of Ghar El Melh are among their works. The first fort,
                located at the entrance to the city and built-in 1659 under the
                orders
              </Text>
              <View style={styles.imageRow}>
          <Image source={require('../../assets/FreeView/1.png')} style={styles.image} />
          <Image source={require('../../assets/FreeView/2.png')} style={styles.image} />
          <Image source={require('../../assets/FreeView/3.png')} style={styles.image} />
        </View>
            </ScrollView>
          </CenteredBox>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  contentContainer: {
    width: "100%",
    alignItems: "flex-start",
    alignSelf: "left",
    justifyContent: "flex-start",
    textAlign: "left",
    padding:10
  },
  title: {
    color:"#0D5239",
    fontWeight:"black",
    fontSize:25,
    marginBottom:10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "50%",
    alignSelf: "flex-start",
  },
  background: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
  },
  leftColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modelContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#ddd", // Just for visibility
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  rightColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    borderRadius:9
  },
});

export default HorizontalLayoutScreen;
