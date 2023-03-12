const statusDisplay = document.querySelector(".game--status")

let gameActive = true;

let currentPlayer = "x";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMassage = () => `Won! :`;
const drawMassage = () => `Draw!`;
const currentPlayerTurn = () => `${currentPlayer}`
const text = document.getElementById("text")

statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}


function handlePlayerChange() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    statusDisplay.innerHTML = currentPlayerTurn();
}


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleResultValidation() {
    let roundWon = false;
    for (let i= 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon){
    text.innerHTML = winningMassage();
    statusDisplay.innerHTML = currentPlayer;
    gameActive = false;
    return;
}
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
    text.innerHTML = drawMassage();
    statusDisplay.innerHTML = ""
    gameActive = false;
    return;
}
    handlePlayerChange()
}


function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "x";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    text.innerHTML = "Next Turn:"
    document.querySelectorAll('.cell')
            .forEach(cell => cell.innerHTML = "");
}
    


document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);