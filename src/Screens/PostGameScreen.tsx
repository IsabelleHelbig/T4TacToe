import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {CommonStyles} from '../utility/Styles';
import { useRoute } from '@react-navigation/native';

export default function PostGame({route, navigation}: {route: any, navigation: any}): React.JSX.Element {
  // const {playername} = navigation.state.params;
  const { winnerName, gametype, firstPlayer, secondPlayer } = route.params;
  
  const playPress = () => {
    if (gametype === '1P') {
      navigation.navigate('1PGame', {firstPlayer});
    } else {
    navigation.navigate('2PGame', {firstPlayer, secondPlayer});
  };
}

  const menuPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={[CommonStyles.background, styles.container]}>
      <Image
        source={require('../../assets/t4logo_.png')}
        resizeMode="contain"
        style={[styles.logo]}
      />
      <Image
        source={require('../../assets/tictactoe.png')}
        resizeMode="contain"
        style={[styles.image]}
      />
      <View style={styles.lowerCont}>
        <Text
          style={[
            CommonStyles.text,
            CommonStyles.textPrimaryColor,
            CommonStyles.sizeLarge,
          ]}
          onPress={playPress}>
          Play Again
        </Text>
        <Text
          style={[
            CommonStyles.text,
            CommonStyles.textPrimaryColor,
            CommonStyles.sizeLarge,
            styles.menu,
          ]}
          onPress={menuPress}>
          Main Menu
        </Text>
      </View>
    </View>
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
    height: 425,
  },
  lowerCont: {
    alignItems: 'center',
  },
  menu: {
    marginTop: '40%',
  },
});
