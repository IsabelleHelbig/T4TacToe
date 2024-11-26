import '../gesture-handler';
import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import TestScreen from './Screens/TestScreen';
import LandingScreen from './Screens/LandingScreen';
import HighScoreScreen from './Screens/HighScoreScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Main() : React.JSX.Element {
    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                    headerShown: false
                  }}>
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
                <Stack.Screen name="High" component={HighScoreScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;