import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {CommonStyles} from '../utility/Styles';
import { startTimer, stopTimer } from '../utility/utilities';
import { useRoute } from '@react-navigation/native';

var PlayerWon = "O";
var winnerName = "";
var gametype = "";


function Square({value, onSquareClick}: {value: any; onSquareClick: any}) {
  return (
    <TouchableOpacity style={styles.square} onPress={onSquareClick}>
      <Text
        style={[
          CommonStyles.text,
          styles.squareText,
          value === 'X'
            ? CommonStyles.textSecondaryColor
            : CommonStyles.textTertiaryColor,
        ]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
  isGameOver,
  isThinking,
  firstPlayer,
  secondPlayer
}: {
  xIsNext: boolean;
  squares: any;
  onPlay: any;
  isGameOver: boolean;
  isThinking: boolean;
  firstPlayer: string;
  secondPlayer: string;
}) {
  function handleClick(i: number) {
      if (
        calculateWinner(squares) ||
        squares[i] ||
        isGameOver ||
        isThinking 
      ) {
        return;
      }
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? 'X' : 'O';
      onPlay(nextSquares);
  }

  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    if(secondPlayer === '') {
      status = winner === 'X' ? `${firstPlayer} won!` : 'You lost!'; 
      gametype = "1P"; 
    } 
    else {
      status = winner === 'X' ? `${firstPlayer} won!` : `${secondPlayer} won!`;
      gametype = "2P";
    }
    PlayerWon = winner;
    winner === 'X' ? winnerName = firstPlayer : winnerName = secondPlayer;
    
  } 
  else {
    if(secondPlayer === '') {
      status = xIsNext ? 'Your Turn' : "Computer's Turn";
    } 
    else {
      status = xIsNext ? `${firstPlayer}'s Turn` : `${secondPlayer}'s Turn` ;
    }
  }

  return (
    <View style={styles.cont}>
      <Text
        style={[
          CommonStyles.text,
          CommonStyles.textPrimaryColor,
          CommonStyles.sizeLarge,
        ]}>
        {status}
      </Text>
      <View style={styles.board}>
        <View style={styles.boardRow}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
              />
            ))}
        </View>
        <View style={styles.boardRow}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Square
                key={i + 3}
                value={squares[i + 3]}
                onSquareClick={() => handleClick(i + 3)}
              />
            ))}
        </View>
      </View>
      <View style={styles.boardRow}>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Square
              key={i + 6}
              value={squares[i + 6]}
              onSquareClick={() => handleClick(i + 6)}
            />
          ))}
      </View>
    </View>
  );
}

export default function Game({navigation, firstPlayer, secondPlayer}: {navigation: any, firstPlayer: string, secondPlayer: string}) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false); // Track game over state
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isThinking, setIsThinking] = useState(false);
   
  console.log(`game screen, first player ${firstPlayer}, second player ${secondPlayer}`);

  if (secondPlayer === '') {
    useEffect(() => {
      // Automatically make a move for the computer when it's its turn
      if (!xIsNext && !isGameOver) {
        setIsThinking(true);
        setTimeout(() => {
          const availableSquares = currentSquares
            .map((value, index) => (value === null ? index : null))
            .filter(index => index !== null);

          if (availableSquares.length > 0) {
            const randomIndex =
              availableSquares[
                Math.floor(Math.random() * availableSquares.length)
              ];
            const nextSquares = currentSquares.slice();
            nextSquares[randomIndex] = 'O';
            handlePlay(nextSquares);
          }
          setIsThinking(false); // Stop thinking message
        }, 500); // .5second delay for thinking
      }
    }, [xIsNext, currentSquares, isGameOver]); // Trigger when it's computer's turn
  }
  else {
    useEffect(() => {
      // Automatically make a move for the computer when it's its turn
      if (!isGameOver) {
        const availableSquares = currentSquares
            .map((value, index) => (value === null ? index : null))
            .filter(index => index !== null);
        }      
    }, [xIsNext, currentSquares, isGameOver]); // Trigger when it's player 2's turn
  }

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    startTimer(); // Start game timer
    // Check if game has ended
    if (calculateWinner(nextSquares)) {
      setIsGameOver(true);
      let gametime = stopTimer();      
      setTimeout(() => {
      navigation.navigate('Score', {gametime, winnerName, PlayerWon, gametype, firstPlayer, secondPlayer}); // Navigate to ScoreScreen after 2 seconds
      }, 2000);
    } else if (!nextSquares.includes(null)) {
      setIsGameOver(true);
      let gametime = stopTimer();
      setTimeout(() => {
      navigation.navigate('Score', {gametime, winnerName: 'Draw', PlayerWon: 'Draw', gametype, firstPlayer, secondPlayer}); // Navigate to ScoreScreen after 2 seconds
      }, 2000);
    } else {
      setIsGameOver(false);
    }
  }

  calculateWinner(currentSquares);

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/frame.png')}>
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        isGameOver={isGameOver}
        isThinking={isThinking}
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
      />
    </ImageBackground>
  );
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  cont: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
  },
  board: {
    marginTop: 30,
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 130,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,

    position: 'relative',
  },
  squareText: {
    fontSize: 96,
  },
});
