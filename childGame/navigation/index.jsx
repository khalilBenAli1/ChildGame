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
import SlidingPuzzle from "../Screens/SlidingPuzzle";
import IndividualNames from "../Screens/IndividualNames";
import SeasonScreen from "../Screens/SeasonScreen";
import CompleteWord from "../Screens/CompleteWord";
import GuessWord from "../Screens/GuessWord";
import AnswerScreen from "../Screens/AnswerScreen";
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
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Expedition" component={ExpeditionScreen} />
        <Stack.Screen name="GameType" component={GameTypeScreen} />
        <Stack.Screen name="MatchGame" component={MatchScreen} />
        <Stack.Screen name="Individuals" component={IndividualsScreen} />
        <Stack.Screen name="CreateTeams" component={CreateTeamsScreen} />
        <Stack.Screen name="Questions" component={QuestionScreen} />
        <Stack.Screen name="CompleteWord" component={CompleteWord} />
        <Stack.Screen name="SlidingPuzzle" component={SlidingPuzzle} />
        <Stack.Screen name="IndividualNames" component={IndividualNames} />
        <Stack.Screen name="Seasons" component={SeasonScreen} />
        <Stack.Screen name="GuessWord" component={GuessWord} />
        <Stack.Screen name="AnswerScreen" component={AnswerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
