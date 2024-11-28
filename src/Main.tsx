import '../gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import LandingScreen from './Screens/LandingScreen';
import HighScoreScreen from './Screens/HighScoreScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnePlayerNameScreen from './Screens/OnePlayerNameScreen';
import TwoPlayerNameScreen from './Screens/TwoPlayerNameScreen';
import OnePlayerGameScreen from './Screens/OnePlayerGameScreen';
import ScoreScreen from './Screens/ScoreScreen';
import PostGame from './Screens/PostGameScreen';

const Stack = createStackNavigator();

function Main(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="1PName" component={OnePlayerNameScreen} />
        <Stack.Screen name="2PName" component={TwoPlayerNameScreen} />
        <Stack.Screen name="High" component={HighScoreScreen} />
        <Stack.Screen name="1PGame" component={OnePlayerGameScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
        <Stack.Screen name="PostGame" component={PostGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
