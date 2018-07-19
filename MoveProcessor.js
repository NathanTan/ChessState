const ExecuteTurn = (game, pgn) => {
    let newFen = ""
    let fen = game.getModBoard()
    if (pgn) {
        if (game.debug)
            console.log("PGN provided: " + pgn)

        // Determine the pgn move
        switch (pgn) {
            case "O-O": // King side castle
                //TODO: add validation
                break
            case "O-O-O": //Queen side castle
                break

            default: // Normal move           
                switch (pgn[0]) {
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
                        console.log("Pawn Move")
                        //newFen = movePawn(state, fen, pgn)
                    // TODO: deal with fen's en passant
                }
        }
        //newFen = updateTurn(fen, null, null)

    }

    else {
        console.log("Error: no pgn provided")
    }
}

export default ExecuteTurn

// Done with pgn, returns new moded fen
const movePawn = (fen, pgn) => {
    // If this move has a capture
    if (pgn.indexOf("x") !== -1) {
        console.log("TODO: add pawn capture functionality")
    }

    else {
        // Find pawns starting pointto determine pawn's functionality
        // TODO: pick up here
    }
}