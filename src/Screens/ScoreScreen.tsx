import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CommonStyles} from '../utility/Styles';

export default function ScoreScreen({navigation}: any): React.JSX.Element {
  const handleScreenPress = () => {
    navigation.navigate('PostGame');
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
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
            ]}>
            Time: INSERT TIME
          </Text>
          <View style={styles.scoreCont}>
            <Text
              style={[
                CommonStyles.text,
                CommonStyles.textPrimaryColor,
                CommonStyles.sizeLarge,
              ]}>
              Score
            </Text>
            <Text
              style={[
                CommonStyles.text,
                CommonStyles.textPrimaryColor,
                CommonStyles.sizeLarge,
              ]}>
              INSERT SCORE
            </Text>
          </View>
        </View>
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
    height: 425,
  },
  lowerCont: {
    alignItems: 'center',
  },
  scoreCont: {
    marginTop: 100,
    alignItems: 'center',
  },
});
