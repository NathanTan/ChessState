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
                        newFen = movePawn(fen, pgn)
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

// Params: - Moded Fen string of chess state
//         - Pgn move
//         - Players turn (w/b)
// Done with pgn, returns new moded fen
// Note: Doesn't work with bug house when finind piece location
const movePawn = (fen, pgn, turn) => {
    console.log("PGN: " + pgn)
    // If this move has a capture
    if (pgn.indexOf("x") !== -1) {
        console.log("TODO: add pawn capture functionality")
    }

    else {
        // Get loc
        const col = pgn[0]
        console.log("COL: " + col)
        const convertedCol = col.charCodeAt(0) - 98
        let piecesInCol = []
        fen.split("/").forEach((row) => {
            console.log(row)
            piecesInCol.push(row[convertedCol])
        })  // Maps a to 0
        console.log(piecesInCol.join(", "))
        const locatedPieceCol = -1
        let index = 0
        
        for (let col in piecesInCol) {
            let piece = ""
            console.log("PIECE: " + piece)
            fen.split("").forEach((p) => {
                piece = p
            })
            // White's turn
            // TODO: Fix the logic to get the location.
            if ('w' === turn && piece === 'P') {
                locatedPieceCol = index
                break

            }
            else if ('b' === turn && piece === 'p') {
                locatedPieceCol = index
                break
            }
            index++
        }
        console.log("Piece's location")
        console.log("(" + convertedCol + "," + locatedPieceCol + ")")
        // Find pawns starting pointto determine pawn's functionality
        // TODO: pick up here
    }
}