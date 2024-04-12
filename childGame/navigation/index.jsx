import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LanguageScreen from "../Screens/LanguageScreen";
import ExpeditionScreen from "../Screens/ExpeditionScreen";
import GameTypeScreen from "../Screens/GameTypeScreen";


const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
        />
        <Stack.Screen
          name="Expedition"
          component={ExpeditionScreen}
        />
          <Stack.Screen
          name="GameType"
          component={GameTypeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
