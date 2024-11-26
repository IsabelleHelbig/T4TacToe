// We might need to test this block of code, but it's just a timer so it should be fine

// Function to start the timer
export function startTimer() {
    // We'll need to start this timer with useState probably
    // If the timer is already running, do nothing
    if (timer) return;
  
    timer = setInterval(() => {
      gameTime++; // Increment seconds      
    }, 10); // Update every 10 milliseconds
}
  
// Function to stop the timer
export function stopTimer() {
    // Stop the timer. Probably call this function when the game is over, useState will be used here too? Either way it's just stopping the increments of gameTime
    clearInterval(timer); 
    // Resets the timer variable for another game
    timer = null;     
}

// Function to calculate the high score
export function calculateHighScore(gameTime) {
    // Calculate the score based on time passed since game start with a maximum of 999,999
    let score = 999999 - gameTime; 
    // If the score is negative, set it to 0
    if (score < 0) score = 0;
    return score;
}  