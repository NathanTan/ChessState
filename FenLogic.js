console.log("Hello world")
const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

console.log(startingFen)
let currentFen = startingFen

/* Gets the current players turn from a fen */
const getTurn = (fen) => {
    let boardArray = fen.split("/")
    let stateDataArray = boardArray[7].split(" ")
    return stateDataArray[1]
}

console.log(getTurn(currentFen))