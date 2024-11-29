import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Game from '../components/game';
import {CommonStyles} from '../utility/Styles';

export default function TwoPlayerGameScreen({route, navigation}: {route: any, navigation: any;
}): React.JSX.Element {
  const firstPlayer = route.params.firstPlayer;
  const secondPlayer = route.params.secondPlayer;
  console.log(`2p game screen, first player ${firstPlayer}, second player ${secondPlayer}`);
  return (
    <View style={[CommonStyles.background, styles.container]}>
      <Game navigation={navigation} firstPlayer={firstPlayer} secondPlayer={secondPlayer} />
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
