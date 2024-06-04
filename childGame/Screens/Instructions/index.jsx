import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import AppButton from "../../Components/AppButton";
import { useTranslation } from 'react-i18next';
import i18next from "../../config/i18n"
import { useNavigation } from '@react-navigation/native';


const Instructions = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const handleNext = () => {
        navigation.navigate('Expedition');
    };


    return (
        <ImageBackground
            source={require("../../assets/imgs/imgBg.png")}
            style={styles.background}
        >
            <CenteredBox height={"90%"}>
                <ScrollView>
                <Text style={styles.title}>{t('Instructions')}</Text>
                <Text style={styles.subtitle}>
                {t('ALLInstructions')}
                </Text>
                </ScrollView>
                <View style={styles.nextButtonContainer}>
                    <AppButton onClick={handleNext} backgroundColor="#389936">
                        <Text style={styles.nextButtonText}>{t('next')}</Text>
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
    paddingTop:10,
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
    marginTop:-10,
    width:"100%",
    lineHeight:40
    
  },
  subtitle: {
    fontSize: 18,
    lineHeight:30,
    maxWidth:"100%",
    color: "black",
    textAlign: "center",
    marginVertical: 20,
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
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Instructions;
