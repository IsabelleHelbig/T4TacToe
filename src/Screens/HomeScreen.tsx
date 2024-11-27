import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { CommonStyles } from '../utility/Styles';

export default function HomeScreen({navigation} : any) : React.JSX.Element {
    return (
        <View style={[CommonStyles.background, styles.container]}>
            <Image
                source={require('../../assets/t4logo_.png')}
                resizeMode="contain"
                style={styles.logo}
                />
            <Image 
                source={require('../../assets/tictactoe.png')}
                resizeMode="contain"
                style={styles.image}
                />            
            <TouchableOpacity onPress={() => navigation.navigate('1PName')}>
                <Text style={[CommonStyles.textPrimaryColor, CommonStyles.text, CommonStyles.sizeLarge, styles.align]}>
                    1 Player
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('2PName')}>
                <Text style={[CommonStyles.textPrimaryColor, CommonStyles.text, CommonStyles.sizeLarge, styles.align]}>
                    2 Player
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('High')}>
                <Text style={[CommonStyles.textPrimaryColor, CommonStyles.text, CommonStyles.sizeLarge, styles.align]}>
                    HighScores
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        padding: 10,
    },
    logo: {
        width: 110,
        height: 110,
        backgroundColor: "#040420",
    },
    image: {
        alignSelf: 'center', 
        height: 425,
    },
    align: {
        textAlign: 'center',
        paddingBottom: 25,
    },
}); 