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
    // console.log(error);
  }
); 

export default function ScoreScreen({route, navigation}: {route: any, navigation: any}): React.JSX.Element {
  const { winnerName, PlayerWon, gametype, firstPlayer, secondPlayer } = route.params;
  const gametime = route.params.gametime;
  
if (PlayerWon == "X" && gametype == "1P" || gametype == "2P" && PlayerWon !== "Draw") {
    var localscore = calculateHighScore(gametime);
  }
  else {
    var localscore = 0;
  }

  const score = localscore;
  
  const handleScreenPress = () => {
    insertHighScore(PlayerWon, score, winnerName);
    navigation.navigate('PostGame', {winnerName, gametype, firstPlayer, secondPlayer});
  };
  
  // console.log('Score screen', gametime, winnerName, score, PlayerWon);
  function insertHighScore(PlayerWon: string, score: number, name: string) {
    if (PlayerWon == "O" && gametype == "1P" || PlayerWon == "Draw" && winnerName == "Draw") {
      return;
    }       
    db.transaction(tx => {
    tx.executeSql(
        'INSERT INTO HighScores (name, score) VALUES (?, ?)',
        [name, score],
        (tx, results) => {
        // console.log('Rows inserted successfully:', results.rowsAffected);        
        },
        (tx, error) => {
        // console.log('Error inserting rows:', error);
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
            Time: {gametime / 100}s
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
