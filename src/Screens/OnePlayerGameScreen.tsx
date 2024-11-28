import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Game from '../components/game';
import {CommonStyles} from '../utility/Styles';

export default function OnePlayerGameScreen({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  return (
    <View style={[CommonStyles.background, styles.container]}>
      <Game navigation={navigation} />
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
