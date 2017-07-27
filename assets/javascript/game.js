

// List of words
var wordsList = ["basketball", "football", "baseball", "golf", "hockey", "soccer", "volleyball", "waterpolo"];

// List of letters
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// staring score and guesses
var wins = 0;
var losses = 0;
var guessesLeft = 12;

// Letters that have been selected
var guessesSoFar = [];

// random word chosen from wordList
var wordChosen = wordsList[Math.floor(Math.random() * wordsList.length)];

// letters from wordChosen
var arrayChosen = [];

var html = "<p><h1>";


//change word to an array
function changeWordToArray() {
	for (var i = 0, j = 0; i < wordChosen.length; i++) {
		arrayChosen[j] = wordChosen.charAt(i);
		j++
		if (wordChosen.charAt(i) != " ") {
			arrayChosen[j] = false;
		} else {
			arrayChosen[j] = true;
		}
		j++
	}
}

// CHECK IF EVERYTHING WORkS
function checkCode() {
	console.log("wins: " + wins);
	console.log("losses: " + losses)
	console.log("guessesLeft: " + guessesLeft);
	console.log("guessesSoFar: " + guessesSoFar);
	console.log("wordChosen: " + wordChosen);
	console.log("arrayChosen: " + arrayChosen);
}

// resets game after being played
function resetGame() {

	// reset the varibles
	guessesLeft = 12;
	guessesSoFar = [];
	wordChosen = wordsList[Math.floor(Math.random() * wordsList.length)];
	arrayChosen = [];
	changeWordToArray();

	// directions added
	var htmlDirections="<p><h3>Press any key to begin guessing</h3></p>";
	document.querySelector("#directions").innerHTML = htmlDirections;
	
	var htmlInitial = "<p><h1>";
	
	//putting an underscore as a blank for a letter
	for (var i = 0; i < wordChosen.length; i++) {
			htmlInitial += "_ ";
		
	}
	htmlInitial += "</h1></p>"
	document.querySelector("#game").innerHTML = htmlInitial;
	var htmlScore = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector("#score").innerHTML = htmlScore;
}

// showing the current game played
function currentGame() {

	// showing the letters for chosen word and blanks
	for (i = 0, j = 0; i < (arrayChosen.length / 2); i++) {
			if (arrayChosen[j+1] == true) {
			html += arrayChosen[j];
		} else {
			html += "_";
		}
		html += " ";
		j=j+2;
	}
	html += "</h1></p>"	

	// underscore and letters in the game
	document.querySelector("#game").innerHTML = html;

	// showing the wins, loses, and guesses left
	htmlScore = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector("#score").innerHTML = htmlScore;

	// showing the guesses
	htmlGuesses = "<p><h3>"
	for (var i = 0; i < guessesSoFar.length; i++) {
		htmlGuesses += guessesSoFar[i] + " ";
	}
	htmlGuesses += "</h3></p>";
	document.querySelector("#guesses").innerHTML = htmlGuesses;
}

// checking the player's guess
function checkGuess() {
	// checking if choice is a letter
	if (arrayChosen.indexOf(userGuess) < 0 && guessesSoFar.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
		guessesLeft--;
		
	}
	// recording the guesses made by player
	if (guessesSoFar.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
		guessesSoFar[guessesSoFar.length]=userGuess;
	}

	// player getting a letter correct
	for (var i = 0; i < arrayChosen.length; i++) {
		if (arrayChosen[i] === userGuess) {
			if (arrayChosen[i+1] == false) {
			}
			arrayChosen[i+1] = true;
		}
	}	
}

// check win, add win, reset game
function checkWin() {
	if (arrayChosen.indexOf(false) < 0 ) {
		console.log("USER WINS");
		wins++;
	
	}	
}

// check if player lost, add lose, reset game
function checkLose() {
	
	if (guessesLeft == 0) {
		console.log("USER LOSES");
		losses++;
		resetGame();
	}

}

// reset html answers
function resetHtml() {
	html="<p><h1>";

}


// chosen word into individual letters
changeWordToArray();

// start game by resetting game
resetGame();

// want to see if it works
checkCode();

// start listening for events
document.onkeyup = function(event) {

	// letters chosen will be sctored to userGuess
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// Checking answer
	checkGuess();

	// prints out after letter is chosen
	currentGame();

	//checking if it works agian
	checkCode();

	// resetting html
	resetHtml();

	// checking a win, start game over
	checkWin();

	// checking a lose, start game over
	checkLose();

	// Checking if it works
	checkCode();
}

