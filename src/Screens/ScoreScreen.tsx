import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {CommonStyles} from '../utility/Styles';
import { calculateHighScore } from '../utility/utilities';
import { useRoute } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'highscores.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
); 

export default function ScoreScreen({navigation}: any): React.JSX.Element {
  const handleScreenPress = () => {
    insertHighScore(PlayerWon, highscore, playername);
    navigation.navigate('PostGame');
  };

  const route = useRoute<{ key: string; name: string; params: { gametime: number, playername: string, PlayerWon: boolean } }>();
  const gametime = route.params ? route.params.gametime / 100 : 0;
  const playername = route.params ? route.params.playername: "";
  const highscore = route.params ? calculateHighScore(route.params.gametime) : 0;
  const PlayerWon = route.params ? route.params.PlayerWon : false;

  function insertHighScore(PlayerWon: boolean, score: number, name: string) {
    if (PlayerWon === false) {
      return;
    }   
    db.transaction(tx => {
    tx.executeSql(
        'INSERT INTO HighScores (name, score) VALUES (?, ?)',
        [name, score],
        (tx, results) => {
        console.log('Rows inserted successfully:', results.rowsAffected);        
        },
        (tx, error) => {
        console.log('Error inserting rows:', error);
        }
    );
    });
  }

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
            Time: {gametime}s
          </Text>
          <View style={styles.scoreCont}>
          <Text
              style={[
                CommonStyles.text,
                CommonStyles.textPrimaryColor,
                CommonStyles.sizeLarge,
              ]}>
              {playername}
            </Text>
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
              {highscore}
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
