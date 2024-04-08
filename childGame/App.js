import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import i18next from './config/i18n';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {

  const { t } = useTranslation();
  useEffect(() => {
    i18next.changeLanguage("ar");
  }, []);
  return (
    
    <View style={styles.container}>
      <Text>{t('greeting')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
