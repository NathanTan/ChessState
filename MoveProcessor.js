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
    let loc = null;
    let dest = null;
    let piece = (turn === "w") ? "P" : "p" // TODO: Change this for non-standard varients
    // If this move has a capture
    if (pgn.indexOf("x") !== -1) {
        Error("TODO: add pawn capture functionality")
    }

    else {
        // Get piece src & dest
        loc = getPieceLocation(fen, pgn, piece)
        dest = HelperFunctions.pgnToGridCordinates(pgn, null)

        console.log("Piece's location")
        console.log("(" + loc.col + "," + loc.row + ")")
        console.log("Piece's Destination")
        console.log("(" + dest.col + "," + dest.row + ")")
    }

    console.log("piece " + piece)
    
    
    
    let board = fen.split("/")
    let newBoard = ""
    console.log(board.reverse()[loc.row].split(""))

    let foo = []

    for (let i in board) {
        // console.log(board[i])
        // console.log(board[i].split(""))
        for (let j in board[i].split("")) {
            let splitRow = board[i].split("")
            let symbol = splitRow[j]
            
            // If the piece source square
            if (i === loc.row && j === loc.col) {
                symbol = "_"

            }

            else if (HelperFunctions.isNumeric(symbol) || i === dest.row && j === dest.col) {
                if ( i === dest.row && j === dest.col) {
                    
                    symbol = "FUCK"
                }
                console.log(symbol)
            }
            //console.log(splitRow[j])
            foo.push(symbol)
        }
    }
    console.log(foo)

    // console.log( board[loc.row].split("")[loc.col]    )

    // // Remove the piece from the move source
    // board[loc.row].split("")[loc.col] = "X" 

    // // Place the piece in it's destination
    // board[dest.col].split("")[dest.col] = piece

    console.log(board)
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