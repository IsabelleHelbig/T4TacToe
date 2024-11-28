import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {CommonStyles} from '../utility/Styles';
import { startTimer, stopTimer, winner } from '../utility/utilities';
import { useRoute } from '@react-navigation/native';

let PlayerWon = false;


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
}: {
  xIsNext: boolean;
  squares: any;
  onPlay: any;
  isGameOver: boolean;
  isThinking: boolean;
}) {
  function handleClick(i: number) {
    if (
      calculateWinner(squares) ||
      squares[i] ||
      isGameOver ||
      isThinking ||
      !xIsNext
    ) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    onPlay(nextSquares);
  }

  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner === 'X' ? 'You won!' : 'You lost!';
    if(winner === 'X') {
      PlayerWon = true;
    }
  } else {
    status = xIsNext ? 'Your Turn' : "Computer's Turn";
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

export default function Game({navigation}: any) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false); // Track game over state
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isThinking, setIsThinking] = useState(false);
  const route = useRoute<{ key: string; name: string; params: { playername: string } }>();
  const playername = route.params ? route.params.playername : "Player 1"; 
   

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

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    startTimer(); // Start timer for the next move
    // Check if game has ended
    if (calculateWinner(nextSquares)) {
      setIsGameOver(true);
      let gametime = stopTimer();      
      setTimeout(() => {
        navigation.navigate('Score', {gametime, playername, PlayerWon}); // Navigate to ScoreScreen after 2 seconds
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
