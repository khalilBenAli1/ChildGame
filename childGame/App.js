import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import i18next from "./config/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import LanguageScreen from "./Screens/LanguageScreen";

export default function App() {
  const { t } = useTranslation();
  useEffect(() => {
    i18next.changeLanguage("ar");
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
         <LanguageScreen/>
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
});
