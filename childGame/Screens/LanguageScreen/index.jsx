import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CenteredBox from "../../Components/CenteredBox";
import AppButton from "../../Components/AppButton";
import CountryFlag from "react-native-country-flag";
import { useTranslation } from 'react-i18next';
import i18next from "../../config/i18n"
import { useNavigation } from '@react-navigation/native';

const LanguageScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language); 
        i18next.changeLanguage(language, (err) => {
            if (err) return console.log('Something went wrong changing the language', err);
            console.log("Language changed to:", language);
        });
    };

    const handleNext = () => {
        navigation.navigate('Expedition');
    };

    const getButtonColor = (language) => selectedLanguage === language ? "#389936" : "#DEAE48";

    return (
        <ImageBackground
            source={require("../../assets/imgs/imgBg.png")}
            style={styles.background}
        >
            <CenteredBox height={"80%"}>
                <Text style={styles.title}>{t('experienceLanguage')}</Text>
                <Text style={styles.subtitle}>
                    {t('chooseLanguagePrompt')}
                </Text>
                <AppButton
                    onClick={() => handleLanguageChange("ar")}
                    backgroundColor={"#D9D9D9"}
                    disabled
                >
                    <View style={styles.languagesContainer}>
                        <View style={styles.flags}>
                            <CountryFlag isoCode="TN" size={25} />
                        </View>
                        <Text style={styles.buttonText}>{t('arabic')}</Text>
                    </View>
                </AppButton>
                <AppButton
                    onClick={() => handleLanguageChange("en")}
                    backgroundColor={"#D9D9D9"}
                    disabled
                >
                    <View style={styles.languagesContainer}>
                        <View style={styles.flags}>
                            <CountryFlag isoCode="US" size={25} />
                        </View>
                        <Text style={styles.buttonText}>{t('english')}</Text>
                    </View>
                </AppButton>
                <AppButton
                    onClick={() => handleLanguageChange("fr")}
                    backgroundColor={getButtonColor("fr")}
                >
                    <View style={styles.languagesContainer}>
                        <View style={styles.flags}>
                            <CountryFlag isoCode="FR" size={25} />
                        </View>
                        <Text style={styles.buttonText}>{t('french')}</Text>
                    </View>
                </AppButton>
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
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
    marginTop:-30,
    width:"90%",
    lineHeight:40
    
  },
  subtitle: {
    fontSize: 18,
    lineHeight:30,
    width:"88%",
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
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LanguageScreen;
