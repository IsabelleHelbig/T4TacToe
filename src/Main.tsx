import '../gesture-handler';
import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import TestScreen from './Screens/TestScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Main() : React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Test" component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;