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

    currentPlayer = !currentPlayer
}

function checkBoard() {
    let playerState = new Array(currentBoard.length).fill(false)

    currentBoard.forEach((value, index) => {
        if (value === currentPlayer) {
            playerState[index] = true
        }
    })

    for (let value in winningMoves) {
        if (winningMoves[value].toString() === playerState.toString())
            return true
    }

    return false
}

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

function clearBoard() {
    currentBoard = new Array(9).fill(0)
    updateBoard()
    document.getElementById('winMessage').innerHTML = ""
    currentPlayer = false
}
