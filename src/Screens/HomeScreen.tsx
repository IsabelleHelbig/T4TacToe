import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {CommonStyles} from '../utility/Styles';

export default function HomeScreen({navigation}: any): React.JSX.Element {
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
        <Text
          style={[
            CommonStyles.textPrimaryColor,
            CommonStyles.text,
            CommonStyles.sizeLarge,
            styles.align,
          ]}>
          1 Player
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('2PName')}>
        <Text
          style={[
            CommonStyles.textPrimaryColor,
            CommonStyles.text,
            CommonStyles.sizeLarge,
            styles.align,
          ]}>
          2 Player
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('High')}>
        <Text
          style={[
            CommonStyles.textPrimaryColor,
            CommonStyles.text,
            CommonStyles.sizeLarge,
            styles.align,
          ]}>
          High Scores
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.alert}
        onPress={() =>
          Alert.alert(
            'T4-Tac-Toe',
            'Version 1.0 by T4\n\nFernando Horta\nIsabelle Helbig\nShannon Hilland\n\nCPRG303-H\nFall 2024',
          )
        }>
        <Text
          style={[
            CommonStyles.textTertiaryColor,
            CommonStyles.text,
            CommonStyles.sizeMedium,
          ]}>
          About
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
    backgroundColor: '#040420',
  },
  image: {
    alignSelf: 'center',
    height: 425,
  },
  align: {
    textAlign: 'center',
    paddingBottom: 25,
  },
  alert: {
    position: 'absolute',
    top: 20,
    width: '100%',
    marginLeft: '85%',
  },
});
