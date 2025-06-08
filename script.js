const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const winnerDisplay = document.querySelector("#winner");

let turnO = true; // Player O starts first
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            gameActive = false;
            return boxes[a].innerText;
        }
    }
    return null;
}

// Check for a draw
function checkDraw() {
    return [...boxes].every(box => box.innerText !== "");
}

// Handle box click
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;

        const winner = checkWinner();
        if (winner) {
            showWinner(winner);
        } else if (checkDraw()) {
            showDraw();
        }
    });
});

// Show winner message
function showWinner(winner) {
    winnerDisplay.innerText = winner;
    msgContainer.classList.remove("hide");
}

// Show draw message
function showDraw() {
    msg.innerText = "Game ended in a draw!";
    msgContainer.classList.remove("hide");
}

// Reset the game
function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
    });
    turnO = true;
    gameActive = true;
    msgContainer.classList.add("hide");
}

// Event listeners
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);