let timer = null; // The timer variable that will be used to start and stop the timer
let gameTime = 0; // The time passed since the game started

// Function to start the timer
export function startTimer() {
    // We'll need to start this timer when the game starts to keep track of the time
    // If the timer is already running, do nothing
    if (timer) return;
  
    timer = setInterval(() => {
      gameTime++; // Increment seconds      
    }, 10); // Update every 10 milliseconds
    console.log("Timer started");
}
  
// Function to stop the timer
export function stopTimer() {
    // Stop the timer. If the timer is not running, do nothing
    clearInterval(timer); 
    // Resets the timer variable for another game
    timer = null;     
    console.log("Timer stopped at " + gameTime + " seconds");
    let newtime = gameTime;
    gameTime = 0;
    return newtime;
}

// Function to calculate the high score
export function calculateHighScore(gameTime) {
    // Calculate the score based on time passed since game start with a maximum of 999,999
    let score = 999999 - Math.floor(gameTime * gameTime * 0.8916111102135) ; 
    gameTime = 0; // Reset the gameTime variable
    // If the score is negative, set it to 0
    if (score < 0) score = 0;
    return score;
}  

