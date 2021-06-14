const player1Panel = document.getElementById('player1');
const player2Panel = document.getElementById('player2');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('resetButton');
const messageParagraph = document.getElementById('message-para');

// options for the computer
const gameElements = ['Rock', 'Paper', 'Scissor'];

const imagesOriginalClassList = [];
const imagesVisibile = [];

let playerWinCount = 0;
let computerWinCount = 0;

let played = false;

// called first to initialize the game
function initializeGame() {
	saveImageObjects(); // Saves all the image ids to an array
	addEventListeners(); // Adds all required event listeners
}

// main function called when option is clicked
function game(playerSelectionNumber) {
	played = true;

	const computerSelectionNumber = getComputerPlay();
	const playerSelection = gameElements[playerSelectionNumber];
	const computerSelection = gameElements[computerSelectionNumber];

	displayWinnerMessage(getWinnerMessage(playerSelection, computerSelection));
	displayScore();

	arrangeImages(playerSelectionNumber, computerSelectionNumber);
}

function checkWinner(playerSelection, computerSelection) {
	if(playerSelection === computerSelection) return 0;

	if(playerSelection === gameElements[0] && computerSelection === gameElements[1]
    || playerSelection === gameElements[1] && computerSelection === gameElements[2]
    || playerSelection === gameElements[2] && computerSelection === gameElements[0]) {
		return 2;
	}

	return 1;
}

// restarts game
function resetGame() {
	played = false;
	playerWinCount = 0;
	computerWinCount = 0;

	resetPage();
	displayScore();
}

// resets page to original look
function resetPage() {
	for(let i = 0; i < imagesOriginalClassList.length; i++) {
		imagesVisibile[i].className = imagesOriginalClassList[i];
	}
	
	messageParagraph.classList.add('no-visibility');
	imagesVisibile[1].classList.remove('no-visibility');

	player1Panel.textContent = 'Please choose one of the following:';
	player2Panel.textContent = '';
}

// returns a random number to us as an index to get the computer's choice
function getComputerPlay() {
	return Math.floor(Math.random() * gameElements.length);
}

// removes middle image from visibility and writes winner message
function displayWinnerMessage(message) {
	const image1 = document.getElementById('image1');

	image1.classList.add('no-visibility');
	messageParagraph.innerHTML = `${message}<br><br><br> (Press any key to continue)`;
	messageParagraph.classList.add('middle-panel');
	messageParagraph.classList.remove('no-visibility');
}

// returns a string used as the winner message
function getWinnerMessage(playerSelection, computerSelection) {

	const winnerNumber = checkWinner(playerSelection, computerSelection);
	let winnerMessage;

	if(winnerNumber === 0) {
		winnerMessage = 'Tie';
	}else if(winnerNumber === 1) {
		playerWinCount += 1;
		winnerMessage = 'beats';
	}else if(winnerNumber === 2) {
		computerWinCount += 1;
		winnerMessage = 'is beaten by';
	}

	return winnerMessage;
}

// saves the IDs of the images and their classes
function saveImageObjects() {
	for(let i = 0; i < 6; i++) {
		imagesVisibile[i] = document.getElementById(`image${i}`);
		imagesOriginalClassList[i] = imagesVisibile[i].className;
	}
}

// adds the eventlisteners
function addEventListeners() {
	for(let i = 0; i < 3; i++) {
		imagesVisibile[i].addEventListener('click', () => {
			if(!played) {
				game(i)
			}
		});
	}

	document.addEventListener('keydown', () => {	
		if(played) {
			played = false;
			resetPage();
		}
	});
	
    resetButton.addEventListener('click', resetGame);
}

// arranges images to show what the player and computer picked
function arrangeImages(playerSelection, computerSelection) {
	imagesVisibile[0].classList.add('no-visibility');
	imagesVisibile[2].classList.add('no-visibility');

	player1Panel.textContent = 'Player 1 chose:';
	player2Panel.textContent = 'Computer chose:';

	if(playerSelection === computerSelection) {
		computerSelection += 3;
	}

	imagesVisibile[playerSelection].className = 'left-panel fit';
	imagesVisibile[computerSelection].className = 'right-panel fit';
}

// updates the score display
function displayScore() {
	scoreElement.textContent = `Score: You ${playerWinCount}, Computer ${computerWinCount}`;
}

initializeGame();
