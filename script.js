let gameElements = ["Rock", "Paper", "Scissor"];
let playerWinCount = 0;
let computerWinCount = 0;
let scoreElement = document.getElementById("score");

function getComputerPlay(){
    return gameElements[Math.floor(Math.random() * gameElements.length)];
}



function playRound(playerSelection, computerSelection) {
    let winnerNumber = checkWinner(playerSelection, computerSelection);
    if(winnerNumber === 0){
        return "It's a tie!";
    }
    

    if(winnerNumber === 1) {        
        playerWinCount++;
        return `You won! ${playerSelection} beats ${computerSelection}`;
    }
    else {
        computerWinCount++;
        return `The Computer won! ${computerSelection} beats ${playerSelection}`;
    }
    
} 

function checkWinner(playerSelection, computerSelection){
    if(playerSelection === computerSelection){
        return 0;
    }
    if(playerSelection === gameElements[0] && computerSelection === gameElements[1]){
        return 2;
    }
    if(playerSelection === gameElements[1] && computerSelection === gameElements[2]){
        return 2;
    }
    if(playerSelection === gameElements[2] && computerSelection === gameElements[0]){
        return 2;
    }
    return 1;
}

function game(playerSelection){
    console.log(playRound(gameElements[playerSelection], getComputerPlay()));

    displayWinnerMessage();
}

function resetGame(){
    playerWinCount = 0;
    computerWinCount = 0;
}

function displayWinnerMessage() {
    let winner = (playerWinCount > computerWinCount) ? "You won. Congratulations!": 
        (playerWinCount < computerWinCount) ? "The Computer won. Next time!": 
        "It's a tie!";
    scoreElement.innerHTML = `Score: You ${ playerWinCount }, Computer ${ computerWinCount }`;
}