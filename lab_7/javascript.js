const winningMoves = [
    [
        true, true, true,
        false, false, false,
        false, false, false
    ], // Horizontal, Row 0
    [
        false, false, false,
        true, true, true,
        false, false, false
    ], // Horizontal, Row 1
    [
        false, false, false,
        false, false, false,
        true, true, true
    ], // Horizontal, Row 2
    [
        true, false, false,
        true, false, false,
        true, false, false
    ], // Vertical, Column 0
    [
        false, true, false,
        false, true, false,
        false, true, false
    ], // Vertical, Column 1
    [
        false, false, true,
        false, false, true,
        false, false, true
    ], // Vertical, Column 2
    [
        true, false, false,
        false, true, false,
        false, false, true
    ],  // Diagonal, Left to Right
    [
        false, false, true,
        false, true, false,
        true, false, false
    ] // Diagonal, Right to Left
]

let currentBoard = new Array(9).fill(0)
let currentPlayer = false

// Function for registering button presses.
function buttonPressed(id) {
    if (currentBoard[id] !== 0) {
        console.log("Already played implement something here lol.")
        document.getElementById(id).classList.toggle("invalidMove")
        setTimeout(() => document.getElementById(id).classList.toggle("invalidMove"), 500)
        return
    }

    currentBoard[id] = currentPlayer
    updateBoard()

    if (checkBoard()) {
        // win case
        document.getElementById('winMessage').innerHTML = "<h2>Player " + (currentPlayer ? "X" : "O") + " Wins!</h2>"
        console.log("won")
        return
    }

    document.getElementById('playerMessage').innerHTML = "<h2>Player " + (currentPlayer ? "O" : "X") + "'s Turn</h2>"
    currentPlayer = !currentPlayer
}

// Function to check player moves
function checkBoard() {
    let playerState = new Array(currentBoard.length).fill(false)

    currentBoard.forEach((value, index) => {
        if (value === currentPlayer) {
            playerState[index] = true
        }
    })

    console.log(playerState)
    for (let winningBoard in winningMoves) {
        let differs = false
        winningMoves[winningBoard].forEach((value, index) => {
            if (!value || differs)
                return
            differs = !(value && playerState[index])
        })

        if (!differs)
            return true
    }

    return false
}

// Function to add X's and O's to board
function updateBoard() {
    currentBoard.forEach((value, index) => {
        let currentMarker = ""

        if (value === true) {
            currentMarker = "X"
        } else if (value === false) {
            currentMarker = "O"
        }
        let currentIndexButton = document.getElementById(index.toString())
        currentIndexButton.innerText = currentMarker
    })
}

// Function to reset board
function clearBoard() {
    document.getElementById('playerMessage').innerHTML = "<h2>Player " + (currentPlayer ? "X" : "O") + "'s Turn</h2>"
    currentBoard = new Array(9).fill(0)
    updateBoard()
    document.getElementById('winMessage').innerHTML = ""
    currentPlayer = false
    document.getElementById('playerMessage').innerHTML = ""
}
