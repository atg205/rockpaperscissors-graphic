let gameElements = ["Rock", "Paper", "Scissor"];
let playerWinCount = 0;
let computerWinCount = 0;
let scoreElement = document.getElementById("score");
let imagesVisibile;

let imagesOriginalClassList;
let messageParagraph;

let player1Panel = document.getElementById("player1");
let player2Panel = document.getElementById("player2");

let played = false;

function initializeGame(){
    saveImageObjects(); //Saves all the image ids to an array
    addEventListenerToImages();
}

function game(playerSelectionNumber){
    let computerSelectionNumber = getComputerPlay();
    let playerSelection = gameElements[playerSelectionNumber];
    let computerSelection = gameElements[computerSelectionNumber];
    displayWinnerMessage(getWinnerMessage(playerSelection, computerSelection) + "<br><br><br> (Press any key to continue)");
    

    removeEventListenerFromImages();
    displayHelpMessage();
    displayScore();

    arrangeImages(playerSelectionNumber, computerSelectionNumber);
    
    document.addEventListener("keydown", function() { resetPage(); } );
}

/*function removeEventListenerFromImages() not working! */
function removeEventListenerFromImages(){
    for(let i = 0; i < 3; i++){
        imagesVisibile[i].removeEventListener("click", function(){ game(i); });
    }
}

function getComputerPlay(){
    return Math.floor(Math.random() * gameElements.length);
}

function displayWinnerMessage(message) {
    let image1 = document.getElementById("image1");
    messageParagraph = document.getElementById("message-para");

    image1.classList.add("no-visibility");
    messageParagraph.innerHTML = message;
    messageParagraph.classList.add("middle-panel");
    messageParagraph.classList.remove("no-visibility");
}

function getWinnerMessage(playerSelection, computerSelection) {
    played = true;
    let winnerMessage = "";

    

    let winnerNumber = checkWinner(playerSelection, computerSelection);

    if(winnerNumber === 0){
        winnerMessage = "Tie";
    }
    

    if(winnerNumber === 1) {        
        playerWinCount++;
        winnerMessage = "beats";
    }
    
    if(winnerNumber === 2) {
        computerWinCount++;
        winnerMessage = "is beaten by";
    }

    return winnerMessage;
 } 

 function checkWinner(playerSelection, computerSelection){
    if(playerSelection === computerSelection){
        console.log("Tie");
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



function saveImageObjects() {
    imagesVisibile = [];
    imagesOriginalClassList = [];

    for(let i = 0; i < 6; i++){
        imagesVisibile[i] = document.getElementById("image" + i);
        imagesOriginalClassList[i] = imagesVisibile[i].className;
    }
}

function addEventListenerToImages(){
    for(let i = 0; i < 3; i++){
        imagesVisibile[i].addEventListener("click", function(){ game(i); });
    }
}

function displayHelpMessage() {
    document.getElementById("helpMessage").classList.remove("no-visibility");
}





function resetPage() {
    if(played){
        for(let i = 0; i < imagesOriginalClassList.length; i++){
            imagesVisibile[i].className = imagesOriginalClassList[i];
        }
        messageParagraph.classList.add("no-visibility");
        imagesVisibile[1].classList.remove("no-visibility");
        
        player1Panel.innerHTML = "Please choose one of the following:";
        player2Panel.innerHTML = "&nbsp;";
    }
}

function resetGame(){
    playerWinCount = 0;
    computerWinCount = 0;
    resetPage();
    displayScore();
}

function displayScore() {
    scoreElement.innerHTML = `Score: You ${ playerWinCount }, Computer ${ computerWinCount }`;
}

function arrangeImages(playerSelection, computerSelection){
    
    imagesVisibile[0].classList.add("no-visibility");
    imagesVisibile[2].classList.add("no-visibility");

    

    player1Panel.innerHTML = "Player 1 chose:";
    player2Panel.innerHTML = "Computer chose:";
    
    if(playerSelection === computerSelection){
        computerSelection += 3; 
    }

    imagesVisibile[playerSelection].className = 'left-panel fit';
    imagesVisibile[computerSelection].className = 'right-panel fit';
    
}



initializeGame();