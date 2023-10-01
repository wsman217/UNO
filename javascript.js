var gameWindow = document.querySelector("grid-container");

// Arrays for setting up rows and columns.
const rows = new Array(0, 1, 2)
const cols = new Array(0, 1, 2)
const winningMoves = new Array(
    [0, 1, 2], // Horizontal, Row 0
    [3, 4, 5], // Horizontal, Row 1
    [6, 7, 8], // Horizontal, Row 2
    [0, 3, 6], // Vertical, Column 0
    [1, 4, 7], // Vertical, Column 1
    [2, 5, 8], // Vertical, Column 2
    [0, 4, 8],  // Diagonal, Left to Right
    [2, 4, 6]  // Diagonal, Right to Left
)

// Function for registering button presses.
function buttonPressed(id){
    switch(id){
        case "button0":
            alert(id)
            break
        case "button1":
            alert(id)
            break
        case "button2":
            alert(id)
            break
        case "button3":
            alert(id)
            break
        case "button4":
            alert(id)
            break
        case "button5":
            alert(id)
            break
        case "button6":
            alert(id)
            break
        case "button7":
            alert(id)
            break
        case "button8":
            alert(id)
            break
        case "buttonStart":
            alert(id)
            gameLoop()
            break
        case "buttonClear":
            alert(id)
            clearBoard()
            break
        default:
            alert("Default case")
            break
    }
}

function gameLoop(){
    while(True){
        
    }
}

function clearBoard(){

}
