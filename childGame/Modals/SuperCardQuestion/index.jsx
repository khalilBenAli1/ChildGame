import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput , ScrollView} from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";

const SuperCardQuestion = ({ isVisible, onClose, onClick }) => {
  const [superCardCode, setSuperCardCode] = useState("");
  const handleCodeSubmit = () => {
    onClick(superCardCode); 
    setSuperCardCode(""); 
    onClose();    
  };
  
  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      height={"85%"}
      hasBanner
      bannerText={
        <Text style={{ fontWeight: "bold", color: "white" ,fontSize:24 , marginBottom:14}}>Super Card</Text>
      }
    >
      <ScrollView contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>
      <View style={styles.container}>
        
        <Image
          source={require("../../assets/newImgs/Group 6970.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          Enter Your super card code to get an advantage
        </Text>
        <TextInput
          style={styles.input}
          value={superCardCode}
          onChangeText={setSuperCardCode}
          placeholder={"Enter Your Code Here"}
        />
      </View>
      <AppButton onClick={handleCodeSubmit} backgroundColor={"#389936"}>
        <Text style={styles.buttonText}>Enter Code</Text>
      </AppButton>
      <AppButton onClick={onClose} backgroundColor={"#FF2F2F"}>
        <Text style={styles.buttonText}>Surrender</Text>
      </AppButton>
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 60,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 25,
    fontSize: 12,
    padding: 10,
    marginVertical: 20,
    minWidth:"98%",
    maxWidth:"98%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#389936",
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "contain",
    marginVertical: 30,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  teamName: {
    color: "#DEAE48",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SuperCardQuestion;
