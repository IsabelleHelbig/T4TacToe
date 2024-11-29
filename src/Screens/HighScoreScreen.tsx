import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { CommonStyles } from '../utility/Styles';
// import { startTimer, stopTimer, calculateHighScore } from '../utility/utilities';

export default function HighScoreScreen({navigation} : any) {

    let timer: string | number | NodeJS.Timeout | null | undefined; // Variable to hold the timer
    let gameTime = 0; // Variable to track game time in hundredths of a second

    // Function to start the timer
    function startTimer() {
        // We'll need to start this timer with useState probably
        // If the timer is already running, do nothing
        if (timer) return;
    
        timer = setInterval(() => {
        gameTime++; // Increment seconds      
        }, 10); // Update every 10 milliseconds
        console.log("timer started");
    }
    
    // Function to stop the timer
    function stopTimer() {
        // Stop the timer. Probably call this function when the game is over, useState will be used here too? Either way it's just stopping the increments of gameTime
        if (timer !== null) {
            clearInterval(timer);
        }
        // Resets the timer variable for another game
        timer = null;  
        console.log("timer ended");   
        console.log("game time: " + gameTime / 100) + " seconds";
    }

    // Function to calculate the high score
    function calculateHighScore(gameTime: number) {
        // Calculate the score based on time passed since game start with a maximum of 999,999
        let score = 999999 - Math.floor(gameTime * 1.8916111102135) ; 
        gameTime = 0; // Reset the gameTime variable
        // If the score is negative, set it to 0
        if (score < 0) score = 0;
        console.log(score);        
        return score;
        
    }   
    
    // function to insert a score into the database. call this function when the game is over a human player is the winner
    function insertScore(name: string, score: number) {
        db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO HighScores (name, score) VALUES (?, ?)',
            [name, score],
            (tx, results) => {
            console.log('Rows inserted successfully:', results.rowsAffected);
            fetchScores();
            },
            (tx, error) => {
            console.log('Error inserting rows:', error);
            }
        );
        });
    }

    // function to clear the database.
    function clearDatabase() {
        db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM HighScores',
            [],
            (tx, results) => {
            console.log('Rows deleted successfully:', results.rowsAffected);
            fetchScores();
            },
            (tx, error) => {
            console.log('Error deleting rows:', error);
            }
        );
        });
    }

    interface Score {
        id: number;
        name: string;
        score: number;    
    }

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
      
    const [scores, setScores] = useState<Score[]>([]); 

    useEffect(() => {
        db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS HighScores (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, score INTEGER)',
            [],
            () => {
            console.log("Table created successfully");            
            fetchScores();
            },
            error => {
            console.log(error);
            }
        );
        });
    }, []);

    // remove this addDummyData function if the database already exists on your ends
    const addDummyData = () => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO HighScores (name, score) VALUES 
            ('Alice', 100), 
            ('Bob', 200), 
            ('Charlie', 300),  
            ('David', 400), 
            ('Eve', 500), 
            ('Frank', 600), 
            ('Grace', 700), 
            ('Heidi', 800), 
            ('Ivan', 900), 
            ('Judy', 1000)`,
            [],
            (tx, results) => {
              console.log('Rows inserted successfully:', results.rowsAffected);
            },
            (tx, error) => {
              console.log('Error inserting rows:', error);
            }
          );
        }, 
        (error) => {
          console.log('Transaction error:', error);
        }, 
        () => {
          console.log('Transaction completed successfully');
        });
      };
    
    const fetchScores = () => {
        db.transaction(tx => {
            tx.executeSql(
            'SELECT * FROM HighScores ORDER BY score DESC LIMIT 10',
            [],
            (tx, results) => {
                let tempScores: Score[] = []; 
                for (let i = 0; i < results.rows.length; i++) {
                tempScores.push(results.rows.item(i));
                }
                setScores(tempScores);
                console.log(tempScores);
            },
            error => {
                console.log(error);
            }
            );
        });
        };

    return (
        <View style={styles.highScoresContainer}>
        <Image
            source={require('../../assets/t4logo_.png')}
            resizeMode="contain"
            style={styles.image}
        />
        <Text style={[styles.header, CommonStyles.textPrimaryColor, CommonStyles.text, CommonStyles.sizeLarge]}>
            High Scores
        </Text>
        <FlatList
            data={scores}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => 
                <View>
                    <Text style={[styles.scoreName, CommonStyles.text, CommonStyles.sizeMedium]}>{item.name}</Text> 
                    <Text style={[styles.scoreScore, CommonStyles.text, CommonStyles.sizeMedium]}>{item.score}</Text>
                    
                </View>}
        />         
            <TouchableOpacity>
            
                <Text style={[styles.back, CommonStyles.textPrimaryColor, CommonStyles.text, CommonStyles.sizeLarge]} onPress={() => navigation.navigate('Home')}>
                    Main Menu
                </Text>
                
                {/* the following text blocks are for testing purposes only. enable and disable at will */}

                {/* 
                
                <Text style={[styles.back, CommonStyles.textTertiaryColor, CommonStyles.text, CommonStyles.sizeMedium]} onPress={() => clearDatabase()}>
                    Clear Scores 
                </Text>                
                <Text style={[styles.back, CommonStyles.textPrimaryColor, CommonStyles.text, CommonStyles.sizeLarge]} onPress={() => addDummyData()}>
                    Populate
                </Text>                
                  */}
            </TouchableOpacity>  
        </View>
        
    )
};


const styles = StyleSheet.create({
    highScoresContainer: {
        position: "relative",
        flexShrink: 0,
        height: '100%',
        width: '100%',
        backgroundColor: "#040420",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },    
    image: {
        flexShrink: 0,
        width: 110,
        height: 110,
        backgroundColor: "#040420",
    },
    header: {
        width: '100%',
        display: "flex",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 70,
        color: '#F9D7A1',        
    },
    scoreName: {
        color: '#FFF',
        marginLeft: 50
    },
    scoreScore: {
        fontSize: 24,
        color: '#FFF',
        marginLeft: 305,
        marginTop: -28,
        textAlign: 'right'
    },
    back: {
        marginBottom: 70,
        marginLeft: 100,
        fontSize: 32,
        color: '#F9D7A1',
    }   
});
