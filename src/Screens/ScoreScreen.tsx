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

export default function ScoreScreen({route, navigation}: {route: any, navigation: any}): React.JSX.Element {
  const { winnerName, PlayerWon } = route.params;
  const gametime = route.params.gametime / 100;
  const score = PlayerWon == "X" ? calculateHighScore(gametime * 100) : 0;
  
  
  const handleScreenPress = () => {
    insertHighScore(PlayerWon, score, winnerName);
    navigation.navigate('PostGame', {winnerName});
  };
  
  console.log('Score screen', gametime, winnerName, score, PlayerWon);
  function insertHighScore(PlayerWon: string, score: number, name: string) {
    if (PlayerWon == "O") {
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
              Score
            </Text>
            <Text
              style={[
                CommonStyles.text,
                CommonStyles.textPrimaryColor,
                CommonStyles.sizeLarge,
              ]}>
              {score}
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
    marginTop: 50,
    alignItems: 'center',
  },
  
});
