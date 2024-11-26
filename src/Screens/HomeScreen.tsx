import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { CommonStyles } from '../utility/Styles';

export default function HomeScreen({navigation} : any) : React.JSX.Element {
    return (
        <View style={CommonStyles.background}>
            <Text style={[CommonStyles.text, CommonStyles.textPrimaryColor]}>
                Test with common style primary color
            </Text>
            <Text style={[CommonStyles.text, CommonStyles.textSecondaryColor]}>
                Test with common style secondary color
            </Text>
            <Text style={[CommonStyles.text, CommonStyles.textTertiaryColor]}>
                Test with common style tertiary color
            </Text>            
            <TouchableOpacity onPress={() => navigation.navigate('Test')}>
                <Text style={CommonStyles.textPrimaryColor}>
                    Go to Test
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('High')}>
                <Text style={CommonStyles.textSecondaryColor}>
                    Go to HighScores
                </Text>
            </TouchableOpacity>
        </View>
    );
}
