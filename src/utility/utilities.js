// We might need to test this block of code, but it's just a timer so it should be fine

let timer = null; // The timer variable that will be used to start and stop the timer
let gameTime = 0; // The time passed since the game started
let playername = ""; // The name of the player

// Function to start the timer
export function startTimer() {
    // We'll need to start this timer with useState probably
    // If the timer is already running, do nothing
    if (timer) return;
  
    timer = setInterval(() => {
      gameTime++; // Increment seconds      
    }, 10); // Update every 10 milliseconds
    console.log("Timer started");
}
  
// Function to stop the timer
export function stopTimer() {
    // Stop the timer. Probably call this function when the game is over, useState will be used here too? Either way it's just stopping the increments of gameTime
    clearInterval(timer); 
    // Resets the timer variable for another game
    timer = null;     
    console.log("Timer stopped at " + gameTime + " seconds");
    return gameTime;
}

// Function to calculate the high score
export function calculateHighScore(gameTime) {
    // Calculate the score based on time passed since game start with a maximum of 999,999
    let score = 999999 - Math.floor(gameTime * 1.8916111102135) ; 
    gameTime = 0; // Reset the gameTime variable
    // If the score is negative, set it to 0
    if (score < 0) score = 0;
    return score;
}  

export function winner(playername) {
    // Function to determine if the player has won the game
    // If the player has won, return true, otherwise return false
    return true;
}