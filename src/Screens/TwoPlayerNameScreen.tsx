import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {CommonStyles} from '../utility/Styles';

export default function OnePlayerNameScreen({navigation,}: any): React.JSX.Element {
    const [firstPlayer, setFirstPlayer] = useState(''); 
    const [secondPlayer, setSecondPlayer] = useState(''); 
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const imageScale = useRef(new Animated.Value(1)).current;
    const imageTranslateY = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        Animated.parallel([
            Animated.timing(imageScale, {
              toValue: 0.7, // Shrink image size
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY, {
              toValue: -250, // Move image up
              duration: 300,
              useNativeDriver: true,
            }),
        ]).start();
    };

    const handleBlur = () => {
        Animated.parallel([
            Animated.timing(imageScale, {
                toValue: 1, // Restore image size
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(imageTranslateY, {
                toValue: 0, // Move image back down
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleStart = () => {
        if ((!firstPlayer.trim()) || (!secondPlayer.trim())) {
            startShake();
        } else {
            navigation.navigate('2PGame', {firstPlayer, secondPlayer});
        }
    };

    const startShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[CommonStyles.background, styles.container]}>
                <Animated.Image
                    source={require('../../assets/t4logo_.png')}
                    resizeMode="contain"
                    style={[styles.logo]}
                />
                <Animated.Image
                    source={require('../../assets/tictactoe.png')}
                    resizeMode="contain"
                    style={[
                        styles.image,
                        {
                            transform: [{scale: imageScale}, {translateY: imageTranslateY}],
                        },
                    ]}
                />
                <Animated.View style={[{transform: [{translateY: imageTranslateY}]}]}>
                    <TouchableOpacity onPress={handleStart} style={styles.startButton}>
                        <Text style={[CommonStyles.text, styles.startText]}>START</Text>
                    </TouchableOpacity>
                    <Animated.View
                        style={[{transform: [{translateX: shakeAnim}]}, styles.playerCont, styles.textPadding,]}>
                        <Text style={[CommonStyles.text, styles.playerX, CommonStyles.textSecondaryColor]}>X</Text>
                        <TextInput
                          style={[CommonStyles.text, styles.playerInput]}
                          placeholder="Player 1"
                          placeholderTextColor="#7BEFDD"
                          value={firstPlayer}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onChangeText={setFirstPlayer}
                        />
                    </Animated.View>
                    {/* need to do color for text using common styles for both of these and resize for an extra name */}
                    <Animated.View
                        style={[{transform: [{translateX: shakeAnim}]}, styles.playerCont]}> 
                        <Text style={[CommonStyles.text, styles.playerX, CommonStyles.textTertiaryColor]}>O</Text>
                        <TextInput
                          style={[CommonStyles.text, styles.playerInput, CommonStyles.textTertiaryColor]}
                          placeholder="Player 2"
                          placeholderTextColor="#BC437A"
                          value={secondPlayer}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          onChangeText={setSecondPlayer}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 110,
        height: 110,
        backgroundColor: '#040420',
    },
    image: {
        alignSelf: 'center',
        height: 350,
    },
    startButton: {
        backgroundColor: '#9B46B6',
        borderRadius: 110,
        paddingVertical: 20,
        width: '60%',
        alignSelf: 'center',
    },
    startText: {
        color: '#FFF',
        textAlign: 'center',
        textShadowOffset: {width: -1, height: 5},
        textShadowRadius: 5,
        textShadowColor: '#000',
        fontSize: 48,
    },
    playerInput: {
        fontSize: 48,
        color: '#7BEFDD',
    },
    playerX: {
        fontSize: 96,
        marginHorizontal: 50,
    },
    playerCont: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    textPadding: {
        paddingTop: 20,
    }
});
