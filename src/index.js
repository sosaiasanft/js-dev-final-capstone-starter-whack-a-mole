const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#startButton');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timerDisplay'); // use querySelector() to get the timer element.
const cursor = document.querySelector('.cursor')
let intervalId;

// Mallet movement
window.addEventListener('mousemove', e => {
  cursor.style.top = e.pageY + 'px'
  cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
  cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
  cursor.classList.remove('active')
})

let time =0;
let timer;
let lastHole;
let points = 0;
let difficulty = "hard";

let timeoutId;
// Title element of ID of "title"
const titleElement = document.querySelector('#title');


//const result = startGame();  This might be where 
/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  // TODO: Write your code here.
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    // Generate a random number between 600 and 1200
    return Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
  } else {
    // Handle invalid difficulty values
    throw new Error("Invalid difficulty value");
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */


function chooseHole(holes) {
  // TODO: Write your code here.
  // Generate a random integer from 0 to 8 and assign it to an index variable.
  const index = Math.floor(Math.random() * holes.length);
  
  // Get a random hole with the random index
  const hole = holes[index];
  
  // Check if hole is the same as the lastHole
  if (hole === lastHole) {
    // Call chooseHole again to get a different hole
    return chooseHole(holes);
  } else {
    // Keep track of the current hole as the lastHole
    lastHole = hole;
    
    // Return the chosen hole
    return hole;
  }

}


/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  // TODO: Write your code here
// If time is greater than 0, continue the game
if (time > 0) {
  // Call showUp and get the timeoutId
  timeoutId = showUp();
  return timeoutId;
} else {
  // If time is 0, stop the game
  const gameStopped = stopGame();
  return gameStopped;
}
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/

let moleVisible = false; // Global variable to track mole visibility

// This function should show and hide a mole in a specific hole
function showUp() {
  // Check if the game is still in progress
  if (time > 0 && !moleVisible) {
    moleVisible = true; // Set mole as visible
    let delay = setDelay("easy"); // TODO: Update so that it uses setDelay()
  const hole = chooseHole(holes);  // TODO: Update so that it use chooseHole()
  // Show the mole
  toggleVisibility(hole, true);

  // Schedule hiding the mole after the current delay
    setTimeout(() => {
      // Hide the mole
      toggleVisibility(hole, false);
      moleVisible = false; // Set mole as not visible
      // Schedule the next mole appearance after the hiding delay
      setTimeout(() => {
        showUp();
      }, delay);
    }, delay);
  }
}


/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
   toggleVisibility(hole); 
   //gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/

function toggleVisibility(hole, show){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  // Add or remove the 'show' class based on the show parameter
  if (hole) {
    if (show) {
      hole.classList.add('show');
    } else {
      hole.classList.remove('show');
    }
    return hole;
  }
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here
  // Points is a global variable
  points += 1;
  
  // Score is the element where it will display the score
  //const scoreElement = document.getElementById("score");
  score.textContent = points;
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // TODO: Write your code here
  points = 0;
  console.log("clearScore");
  // This will display the score
  score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/

// Clear any existing intervals
// clearInterval(initialIntervalId);

let gameStarted = false; // Added this line to define gameStarted variable
// Start the game loop only when the game actually starts
intervalId = setInterval(() => {
  // Only show moles if the game has started
  if (gameStarted) {
    showUp();
  }
}, 1500);

function startTimer() {
  // TODO: Write your code here
  timer = setInterval(() => {
    updateTimer();
    showUp(); // Call showUp within the timer interval
  }, 1000);
  // timer = setInterval(updateTimer, 1000);
  // return timer;
  
  // Return an object containing the intervalId and the timer
   return { intervalId, timer };
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // TODO: Write your code here.
  console.log("whack!");
  updateScore();
   // Play the audioHit sound when a mole is whacked
   playAudio(audioHit);
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  // TODO: Write your code here
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/

function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/

function stopGame(){
   stopAudio(song);  //optional
  clearInterval(timer);
  clearInterval(intervalId);
  stopTimer();  // Stop both timers
  gameStarted = false;
  return "game stopped";
}

// This function stops the timer and clears the mole movement interval.
function stopTimer() {
  clearInterval(timer);
  clearInterval(intervalId);
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/

function startGame(difficulty){
  console.log("Start Game Called");
  setDuration(10);

  // Set the speed based on the difficulty
  if (difficulty === 'easy') {
    setDuration(15); // Adjust the duration for easy difficulty
  } else if (difficulty === 'normal') {
    setDuration(10); // Adjust the duration for normal difficulty
  } else if (difficulty === 'hard') {
    setDuration(5); // Adjust the duration for hard difficulty
  }

  // Play the audio song when the game starts
  play();
  
  console.log("Before showUp");
  console.log("After showUp");

  // showUp(); 
  setEventListeners();
  clearScore();
  startTimer();
  return "game started";
}


//sound FX and music
const audioHit = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/hit.mp3?raw=true");
const song = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/molesong.mp3?raw=true");


function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;