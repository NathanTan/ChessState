const constants = require('constants')

console.log(constants)
let currentFen = constants.startingFen

let state = {
    "debug": false,
    "gameType": "standard"
}

/* Gets the current players turn from a fen */
const getTurn = (fen) => {
    let stateDataArray = fen.split(" ")
    return stateDataArray[1]
}

/* Returns a new fen based on the pgn */
const executeTurn = (state, fen, pgn) => {
    let newFen
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
                newFen = movePawn(state, fen, pgn)
                // TODO: deal with fen's en passant
            }
        }
        newFen = updateTurn(fen, null, null)

    }

    else {
        console.log("Error: no pgn provided")
    }
}

/* Returns a new fen where the turn has been toggled */
/* Parameters: 
 *    fen - Fen string to be updated
 *    enPassant - if enPassant is availible (The last move was a 2 space pawn move), then the location that the capturning pawn is this varianle, otherwise it's null
 *    halfmove - either increments or resets the number of halfmoves since the capture of a piece, or the movemenet of a pawn
 */
const updateTurn = (fen, enPassant, halfmove) => {
    console.log(fen)
    /* Deconstruct fen */
    let stateDataArray = fen.split(" ")
    if (stateDataArray[1] === "w") {
        
        stateDataArray[1] = "b"
    }

    else if (stateDataArray[1] === "b") {

        stateDataArray[1] = "w"
        stateDataArray[5] = +stateDataArray[5] + 1 // Increment the move count
    }

    /* Deal with halfmove */
    if (halfmove) {
        // Not a pawn move and no capture
        stateDataArray[4] = +stateDataArray[4] + 1 // Increment the move count
        
    }

    else {
        // Pawn was moved or piece was captured
        stateDataArray[5] = 0 // Reset halfmove count        
    }

    /* Deal with en passant */
    // TODO
    
    /* Reconstruct fen */
    return stateDataArray.join(" ")
}

const movePawn = (state, fen, pgn)  => {
    let boardArray = fen.split(" ").split("/")
    switch (state.gameType) {
        case "standard":
            /* Check for a double space move */
            if (pgn.includes("4") && getTurn(fen) === "w") {
                // if (boardArray[5])
            }

            if ( pgn.includes("3") && getTurn(fen) === "b") {

            }
        break
        default:
        console.log("Error")
    }

}


const getValidMoves = (piece, loc_raw, fen) => {
   loc = processLoc(loc_raw);
}

const processLoc = (loc) => {
   column = loc[0]
   row = loc[1]
   let newloc = ""
  
   // Convert the column letter to a number. i.e. a = 0, b = 1, g = 7 
   newloc.append(loc[0].charCodeAt(0) - 97)   
   newloc.append(loc[1] - 1) // TODO: make sure this returns an int.

   return newloc
}






//console.log(getTurn(currentFen))
console.log(currentFen)
//executeTurn(state, null, "f7")
currentFen = updateTurn(currentFen, null, null)
console.log(currentFen)
currentFen = updateTurn(currentFen, null, null)
console.log(currentFen)
