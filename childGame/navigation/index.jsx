import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LanguageScreen from "../Screens/LanguageScreen";
import ExpeditionScreen from "../Screens/ExpeditionScreen";
import GameTypeScreen from "../Screens/GameTypeScreen";
import CreateTeamsScreen from "../Screens/CreateTeamsScreen";
import IndividualsScreen from "../Screens/IndividualsScreen";
import QuestionScreen from "../Screens/QuestionScreen";
import MatchScreen from "../Screens/MatchScreen";
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MatchGame"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Expedition" component={ExpeditionScreen} />
        <Stack.Screen name="GameType" component={GameTypeScreen} />
        <Stack.Screen name="MatchGame" component={MatchScreen} />
        <Stack.Screen name="Individuals" component={IndividualsScreen} />
        <Stack.Screen name="CreateTeams" component={CreateTeamsScreen} />
        <Stack.Screen name="Questions" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
