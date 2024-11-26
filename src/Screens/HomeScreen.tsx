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
            <Text style={[CommonStyles.text, CommonStyles.txtPrimaryColor]}>
                Test with common style primary color
            </Text>
            <Text style={[CommonStyles.text, CommonStyles.txtSecondaryColor]}>
                Test with common style secondary color
            </Text>
            <Text style={[CommonStyles.text, CommonStyles.txtTertiaryColor]}>
                Test with common style tertiary color
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Test')}>
                <Text style={CommonStyles.txtPrimaryColor}>
                    Go to Test
                </Text>
            </TouchableOpacity>
        </View>
    );
}
