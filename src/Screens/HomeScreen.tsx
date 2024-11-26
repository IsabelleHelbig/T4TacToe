import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function HomeScreen({navigation} : any) : React.JSX.Element {
    return (
        <View>
            <Text>
                Hello, world!
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Test')}>
                <Text>
                    Go to Test
                </Text>
            </TouchableOpacity>
        </View>
    );
}