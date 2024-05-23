import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity,TextInput,ScrollView,Alert } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { minusScore } from "../../data/extraTimeCodes";
import { useDispatch } from "react-redux";
import { subtractPoints } from "../../store/actions/gameActions";
const ScoreSuperCard = ({
  isVisible,
  onClose,
  bannerText,
  players,
  scores,
  superButton,
}) => {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
    const [code,setCode]=useState("")
    const [usedCodes, setUsedCodes] = useState(new Set());
    const dispatch=useDispatch()
    const handleSuperCardSubmit = () => {
        const upperCaseCode = code.toUpperCase();
        console.log("Submitted code:", upperCaseCode);
        console.log("All minus scores:", Object.keys(minusScore));
        console.log("Used codes:", Array.from(usedCodes));
    
        if (usedCodes.has(upperCaseCode)) {
          Alert.alert("Erreur", "Ce code a déjà été utilisé.");
            return;
        }
    
        if (minusScore[upperCaseCode]) {
            if (selectedPlayerIndex == null || selectedPlayerIndex >= players.length || selectedPlayerIndex < 0) {
              Alert.alert("Erreur", "Aucun joueur sélectionné.");
                return;
            }
            dispatch(subtractPoints(players[selectedPlayerIndex], 2));  // Assuming 2 points to subtract
            usedCodes.add(upperCaseCode);
            Alert.alert("Succès", `2 points retirés de ${players[selectedPlayerIndex]}.`);

            return;
        }
    
        Alert.alert("Erreur", "Code invalide");

    };

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      height="93%"
      hasBanner
      bannerText={bannerText}
    >
        <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center" , flex:1}}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Remove <Text style={styles.highlight}>2</Text> points in this round
          from one of the Players
        </Text>
        <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholder={"Enter code"}
            />
        <View style={styles.namesContainer}>
          {players.map((name, index) => (
            <React.Fragment key={index}>
              <View style={styles.nameBox}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.score}>
                  Score: {scores[name] ? scores[name].correct : 0}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.selectionCircle,
                    selectedPlayerIndex === index ? styles.selectedCircle : {},
                  ]}
                  onPress={() => setSelectedPlayerIndex(index)}
                >
                  {selectedPlayerIndex === index && (
                    <Icon name="check" size={24} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>
              {index < players.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </View>
      </View>
      <AppButton onClick={handleSuperCardSubmit} backgroundColor={"#FF2F2F"}>
        <Text style={styles.buttonText}>Activate Super Card</Text>
      </AppButton>
      <TouchableOpacity onPress={onClose} style={{alignItems:"center",justifyContent:"center"}}>
        <Text style={{ color: "#FF2F2F", fontSize:18 }}>Cancel</Text>
      </TouchableOpacity>
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    height: 60,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 25,
    fontSize:12,
    padding: 10,
    marginVertical: 20,
    minWidth:"98%",
    maxWidth:"98%",
    width: "98%",
  },
  highlight: {
    fontSize: 20,
    color: "#DEAE48",
    fontWeight: "bold",
  },
  namesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 20,
  },
  nameBox: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  score: {
    fontSize: 14,
    color: "#555",
  },
  selectionCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  selectedCircle: {
    backgroundColor: "#FF2F2F",
  },
  checkIcon: {
    width: 15,
    height: 15,
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

export default ScoreSuperCard;
