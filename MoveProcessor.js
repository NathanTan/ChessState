import constants from './constants'
import HelperFunctions from './HelperFunctions'

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
                        if (game.debug)
                            console.log("Pawn Move")
                        newFen = movePawn(fen, pgn, game.getTurn())
                    // TODO: deal with fen's en passant
                }
        }
        //newFen = updateTurn(fen, null, null)

    }

    else {
        Error("Error: no pgn provided")
    }
}

export default ExecuteTurn

// Params: - Moded Fen string of chess state
//         - Pgn move
//         - Players turn (w/b)
// Done with pgn, returns new moded fen
// Note: Doesn't work with bug house when finind piece location
const movePawn = (fen, pgn, turn) => {
    let piece = (turn === "w") ? "P" : "p" // TODO: Change this for non-standard varients
    // If this move has a capture
    if (pgn.indexOf("x") !== -1) {
        Error("TODO: add pawn capture functionality")
    }

    else {
        // Get piece src & dest
        let loc = getPieceLocation(fen, pgn, piece)
        let dest = HelperFunctions.pgnToGridCordinates(pgn, null)

        console.log("Piece's location")
        console.log("(" + loc.col + "," + loc.row + ")")
        console.log("Piece's Destination")
        console.log("(" + dest.col + "," + dest.row + ")")
    }
}

/* 
 * Parameters: 
 *      - Moded fen string
 *      - PGN move
 *      - Piece to find
 *      - game type [OPTIONAL]
 */
const getPieceLocation = (fen, pgn, piece, gameType) => {
    // Get loc
    const convertedCol = pgn[0].charCodeAt(0) - 97 // Maps a to 0
    let piecesInCol = []
    fen.split("/").forEach((row) => {
        piecesInCol.push(row[convertedCol])
    })
    let locatedPieceCol = -1
    let index = 0

    if (gameType == undefined || gameType === constants["GameTypesEnum"]["standard"]) {
        piecesInCol.reverse().forEach((p) => {
            if (p === piece) {
                locatedPieceCol = index
            }
            index++;
        })
    }

    else {
        Error("ERROR: TODO: Implement for non-standard game variants")
    }
    return {
        "col": convertedCol,
        "row": locatedPieceCol
    }
}