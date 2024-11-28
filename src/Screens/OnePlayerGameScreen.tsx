import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Game from '../components/game';
import {CommonStyles} from '../utility/Styles';

export default function OnePlayerGameScreen({route, navigation}: {route: any, navigation: any;
}): React.JSX.Element {
  const playerName = route.params.playerName;
  console.log('1p game screen', playerName);
  return (
    <View style={[CommonStyles.background, styles.container]}>
      <Game navigation={navigation} playername={playerName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 10,
  },
});
