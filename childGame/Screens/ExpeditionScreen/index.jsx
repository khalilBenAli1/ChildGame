import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CenteredBox from '../../Components/CenteredBox';
import AppButton from '../../Components/AppButton';
import { useTranslation } from 'react-i18next';

const ExpeditionScreen = () => {
  const { t } = useTranslation();

  const handleButtonPress = (option) => {
    console.log(option, "button pressed");
  };

  return (
    <ImageBackground
      source={require("../../assets/imgs/imgBg.png")}
      style={styles.background}
    >
      <CenteredBox>
        <Text style={styles.title}>{t('GATAYA_EXPEDITION')}</Text>
        <View style={styles.buttonsContainer}>
          <AppButton
            onClick={() => handleButtonPress("board_game")}
            backgroundColor="#DEAE48"
            borderColor="#CD9777"
          >
            <Text style={styles.buttonText}>{t('board_game')}</Text>
          </AppButton>
          <AppButton
            onClick={() => handleButtonPress("AR_experience")}
            backgroundColor="#DEAE48"
            borderColor="#CD9777"
          >
            <Text style={styles.buttonText}>{t('AR_experience')}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ExpeditionScreen;
