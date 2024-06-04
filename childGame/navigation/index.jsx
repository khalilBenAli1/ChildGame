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
import ARScene from "../Screens/ArScreen";
import HorizontalLayoutScreen from "../Screens/FreeViewScreen";
import Instructions from "../Screens/Instructions";
import VideoPlayerScreen from "../Screens/VideoPlayer";

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
        <Stack.Screen name="VideoScreen" component={VideoPlayerScreen} />
        
        <Stack.Screen name="Instructions" component={Instructions} />
        
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Expedition" component={ExpeditionScreen} />
        <Stack.Screen name="GameType" component={GameTypeScreen} />
        <Stack.Screen name="FreeView" component={HorizontalLayoutScreen} />
        <Stack.Screen
          name="MatchGame"
          component={MatchScreen}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="Individuals" component={IndividualsScreen} />
        <Stack.Screen name="CreateTeams" component={CreateTeamsScreen} />
        <Stack.Screen name="ArScreen" component={ARScene} />
        <Stack.Screen
          name="Questions"
          component={QuestionScreen}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="CompleteWord"
          component={CompleteWord}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="SlidingPuzzle"
          component={SlidingPuzzle}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen name="IndividualNames" component={IndividualNames} />
        <Stack.Screen name="Seasons" component={SeasonScreen} />
        <Stack.Screen
          name="GuessWord"
          component={GuessWord}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="AnswerScreen"
          component={AnswerScreen}
          options={{
            gestureEnabled: false,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
