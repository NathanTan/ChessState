const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

console.log(startingFen)
let currentFen = startingFen

let state = {
    "debug": false
}

/* Gets the current players turn from a fen */
const getTurn = (fen) => {
    let stateDataArray = fen.split(" ")
    return stateDataArray[1]
}

/* Returns a new fen based on the pgn */
const executeTurn = (state, fen, pgn) => {
    if (pgn) {
        if (state.debug)
            console.log("PGN provided: " + pgn)

        // Determine the pgn move
        switch(pgn) {

            case "O-O": // King side castle
            //TODO: add validation

            break

            case "O-O-O": //Queen side castle
            break

            default: // Normal move           
            
            switch(pgn[0]) {
                case "N": // Knight move
                
                
                break
                
                case "B": // Bishop move
                break
                case "R": // Rook move
                break
                case "Q": // Queen move
                break
                case "K": // King move
                break
                default: // Pawn move
                console.log("Default")
            }
        }
        let newFen = updateTurn(fen)

    }

    else {
        console.log("Error: no pgn provided")
    }
}

/* Returns a new fen where the turn has been toggled */
const updateTurn = (fen) => {
    console.log(fen)
    /* Deconstruct fen */
    let stateDataArray = fen.split(" ")
    if (stateDataArray[1] === "w")
        stateDataArray[1] = "b"
    else if (stateDataArray[1] === "b")
        stateDataArray[1] = "w"
    
    /* Reconstruct fen */
    return stateDataArray.join(" ")
}


console.log(getTurn(currentFen))
console.log(currentFen)
//executeTurn(state, null, "f7")
currentFen = updateTurn(currentFen)
console.log(currentFen)