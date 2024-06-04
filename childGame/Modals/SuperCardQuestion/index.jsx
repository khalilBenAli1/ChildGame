import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";
import { useTranslation } from 'react-i18next';

const SuperCardQuestion = ({ isVisible, onClose, onClick }) => {
  const [superCardCode, setSuperCardCode] = useState("");
  const { t } = useTranslation();
  
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
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 24,
            marginBottom: 14,
          }}
        >
         {t('super_card')}
        </Text>
      }
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/newImgs/supp.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.description}>
          {t('enter_super_card_code')}
          </Text>

          <TextInput
            style={styles.input}
            value={superCardCode}
            onChangeText={setSuperCardCode}
            placeholder={"Enter Your Code Here"}
          />
        </View>
        <AppButton onClick={handleCodeSubmit} backgroundColor={"#389936"}>
          <Text style={styles.buttonText}>{t('enter_code')}</Text>
        </AppButton>
        <AppButton onClick={onClose} backgroundColor={"#FF2F2F"}>
          <Text style={styles.buttonText}>{t('cancel')}</Text>
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
    minWidth: "98%",
    maxWidth: "98%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#389936",
  },
  image: {
    width: 130,
    height: 150,
    resizeMode: "contain",
    marginVertical: 20,
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
