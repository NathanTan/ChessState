import constants from './constants'
import HelperFunctions from './HelperFunctions'
import FenLogic from './FenLogic'

const ExecuteTurn = (game, pgn) => {
    let newBoard = ""
    let moveCord = null

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
                        console.log(getPieceLocation(game.board, pgn, "n", null))
                        new Error("Knight not yet implemented")
                        break
                    case "B": // Bishop move
                        Error("Bishop not yet implemented")
                        break
                    case "R": // Rook move
                        Error("Rook not yet implemented")
                        break
                    case "Q": // Queen move
                        Error("Queen not yet implemented")
                        break
                    case "K": // King move
                        Error("King not yet implemented")
                        break
                    default: // Pawn move
                        if (game.debug)
                            console.log("Pawn Move")
                        moveCord = pgnToCordPawn(game.board, pgn, game.getTurn(), game.gameType)
                    // TODO: deal with fen's en passant
                }
                game.board = updateBoardByCord(game.board, moveCord, game.debug)
        }
    }

    else {
        Error("Error: no pgn provided")
    }
}

export default ExecuteTurn


/*
 * Params:
 *      - The board as a 2d array
 *      - an object holding the the source and destination of the move
 *      - [OPTIONAL] flag for debugging printing
 * Returns: A new 2d array with 1 piece in a different place
 */
const updateBoardByCord = (board, moveCord, debug) => {
    let newBoard = board
    if (debug) {
        console.log(JSON.stringify(moveCord))
        console.log("Executing move: ")
        console.log(board[moveCord.loc.row][moveCord.loc.col] + " -> "
            + board[moveCord.dest.row][moveCord.dest.col])
    }

    newBoard[moveCord.dest.row][moveCord.dest.col] = board[moveCord.loc.row][moveCord.loc.col]
    newBoard[moveCord.loc.row][moveCord.loc.col] = "X"

    return newBoard
}

// Params: - Board as a 2d array
//         - Pgn move
//         - Players turn (w/b)
//         - Game variant type
// Done with pgn, returns cordinates of piece source and desination
// Note: Doesn't work with bug house when finind piece location
// Return: New moded board as a string
const pgnToCordPawn = (board, pgn, turn, gameType) => {
    let moveObj = {
        loc: null,
        dest: null
    }
    let piece = ""
    switch (gameType) {
        case 1:
            if (turn === "w") {
                piece = "p"
            }
            else {
                piece = "P"
            }
            break
        default:
            Error("Game variant '" + gameType + "' not yet implemented.")
    }
    // If this move has a capture
    if (pgn.indexOf("x") !== -1) {
        Error("TODO: add pawn capture functionality")
    }

    else {
        // Get piece src & dest
        moveObj.loc = getPieceLocation(board, pgn, piece, null)
        moveObj.dest = HelperFunctions.pgnToGridCordinates(pgn, null, null)

        console.log("Piece's location")
        console.log("(" + moveObj.loc.col + "," + moveObj.loc.row + ")")
        console.log("Piece's Destination")
        console.log("(" + moveObj.dest.col + "," + moveObj.dest.row + ")")
    }

    console.log("piece " + piece)


    return moveObj
}

/*
 * Parameters:
 *      - Row to insert piece in                as an array
 *      - Piece to place in row                 as a string
 *      - Column that the piece should go in    as a number\?
 * Returns: A row with the piece inserted       as an array
 */

const placePieceInRow = (row, piece, col) => {
    let newRow = []
    let leftNumber = 0
    let rightNumber = 0
    let numberOfPiece = 0
    if (row === "8") {
        for (let i = 0; i < 8; i++) {
            if (i < col) {
                leftNumber++
            }

            else if (i > col) {
                rightNumber++
            }

        }

        newRow.push(leftNumber)
        newRow.push(piece)
        newRow.push(rightNumber)

        //     if (i < col) {
        //         leftNumber++
        //     }

        // if (i 　>= col) {
        //     right
        // }
        //console.log("NEW ROW: " + newRow)
    }

    return newRow
    //Error("No yet implemented")

}

/*
 * Parameters:
 *      - Row to insert piece in                as an array
 *      - Column that the piece should go in    as a number\?
 *      - The piece is being placed             as a boolean
 * Returns: A row with the piece removed        as an array
 */
const generateNewRow = (row, col, isDest) => {
    let newRow = []
    if (isDest === false) {
        let leftNumber = 0;
        let rightNumber = 0;
        for (let i = 0; i < 8; i++) {
            console.log("--------- ")
            // console.log("COL: " + col)
            console.log("i: " + i)
            console.log(row[i])
            console.log(!HelperFunctions.isNumeric(row[i]))
            console.log("newRow: " + newRow.join())


            if (i === col || !HelperFunctions.isNumeric(row[i])) {
                let placeHolderNumber = row[i]
                // Might not need the < 8 comparison
                if (i < 7 && !HelperFunctions.isNumeric(row[i + 1]) && (i + 1 == col)) {
                    newRow.push(placeHolderNumber + 1)
                    i++
                    continue
                }

            }

            if (!HelperFunctions.isNumeric(row[i])) {
                newRow.push(row[i])
                leftNumber = 1
                console.log("CONINUE")
                continue
            }

        }

        if (leftNumber === 0 && rightNumber === 0) {
            newRow = row
            newRow[col] = 1
        }
    }
    console.log("NEW ROW: " + newRow.join())
    return newRow
}

/* 
 * Parameters: 
 *      - board as 2d array
 *      - PGN move
 *      - Piece to find
 *      - game type [OPTIONAL]
 */
// TODO: Deal with situtation where there are 2 pieces in the same column that can move to the same square.
const getPieceLocation = (board, pgn, piece, gameType) => {
    // Get loc

    let col = null
    let possibleCol = []
    let possibleCords = []
    if (piece === "p" || piece === "P") {
        console.log("----------op 1")
        col = getPGNDropColumn(pgn)
    }
    else {
        console.log("----------op 2")
        console.log(board.length)
        console.log(board[0])
        let possibleCordss = getAllPossiblePieceLocations(board, piece, gameType)

    }

    let piecesInCol = []
    board.forEach((row) => {
        piecesInCol.push(row[col])
    })

    let locatedPieceCol = -1
    let index = 0

    if (gameType == undefined || gameType === constants["GameTypesEnum"]["standard"]) {
        piecesInCol.forEach((p) => {
            console.log("p: " + p)
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
        "col": col,
        "row": locatedPieceCol
    }
}

/* 
 * Parameters: 
 *      - board as 2d array
 *      - Piece to find
 *      - game type [OPTIONAL]
 */
const getAllPieceLocations = (board, piece, gameType) => {
    let possibleCords = []
    console.log(board[0])
    /* Find all locations of all pieces that match 'piece', the chosen piece */
    board.forEach((row, indexRow) => {
    // for (let i = 0; i < board.length; i++) {
        // let row = board[i]
        console.log("Row: " + JSON.stringify(row))
        row.forEach((p, indexCol) => {
            if (p === piece) {
                possibleCords.push({ "row": indexRow, "col": indexCol })
            }
        })

        // /* Optimizations */
        // if (gameType != null && gameType === constants.GameTypesEnum.standard) {
        //     let breakFromLoop = false // Indicates that all pieces have been found
        //     switch (piece) {
        //         case "k":   // White King
        //         case "K":   // Black King
        //         case "q":   // White Queen
        //         case "Q":   // Black Queen
        //             if (possibleCords === 1)        // Only one allowed on board
        //                 breakFromLoop = true
        //             break
        //         case "r":   // White Rook
        //         case "R":   // Black Rook
        //         case "n":   // White Knight
        //         case "N":   // Black Knight
        //         case "b":   // White Bishop
        //         case "B":   // Black Bishop
        //             if (possibleCol.length === 2)   // Only 2 allowed on board
        //                 breakFromLoop = true
        //             break
        //         default:
        //             Error("Unknown Piece")
        //     }
        //     if (breakFromLoop) {
        //         break;
        //     }
        // }
    })
    return possibleCords
}

/* 
 * Parameters: 
 *      - board as 2d array
 *      - Piece to find
 *      - game type [OPTIONAL]
 */
const getAllPossiblePieceLocations = (board, piece, gameType) => {
    console.log("getAllPossiblePieceLocations~")
    console.log("board: " + JSON.stringify(board))
    console.log("piece: " + JSON.stringify(piece))
    console.log("gameType: " + JSON.stringify(gameType))

    const pieceLocations = getValidMoves(board, piece, null, gameType)
    console.log("Possible Cords: " + JSON.stringify(pieceLocations))

    let possibleLocations = []
    pieceLocations.forEach((loc) => {
        console.log("LLLOOOOCCC: " + JSON.stringify(loc))
        let validMoves = getValidMoves(board, piece, loc, gameType)

    })

}

const getValidMoves = (board, piece, loc, gameType) => {
    console.log("consts: " + JSON.stringify(constants["PieceLogic"]))
    console.log("piece: " + piece)
    const pieceName =  constants["PiecePGNToName"][piece]
    console.log("Piece name: " + pieceName)
    let moves = constants["PieceLogic"][pieceName]
    let legalMoves = []
    console.log("HEERHE")
    console.log("LOC: " + JSON.stringify(loc))

    // note: apply (add) a move to a piece location to get the destination
    // console.log("move: " + JSON.stringify(moves))

    /* Find all legal moves */
    moves.forEach((move) => {
        console.log("Move: " + JSON.stringify(move))
        let num = loc.row + move.row
        let num2 = loc.col + move.col
        console.log("num1: " + JSON.stringify(num) + "\nnum2:" + JSON.stringify(num2))
        if (num < constants.BoardWidth || num >= 0 ||
            num2 < constants.BoardHeight || num2 >= 0) {
            legalMoves.push(move)
        }
    })
    console.log("Legal Moves:")
    console.log(legalMoves)
    // TODO: Pick up here
    // TODO: Make loc (the piece source) have a value.
    return null
}


/*
 * Parameters:
 *    - pgn notation 
 * Returns:
 *    Numeric mapped value corresponding to the letter column of the board
 */
const getPGNDropColumn = pgn => {

    // If the first letter of the pgn is upper case, then it is the piece that is moving.
    if (pgn[0] === pgn[0].toUpperCase()) { //Check if is upper case
        // If capture
        if (pgn[1] === "x") {
            return pgn[2].charCodeAt(0) - 97 // Return column as a number ( 'a' mapped to 0)
        }

        // No capture
        else {
            return pgn[1].charCodeAt(0) - 97 // Return column as a number ( 'a' mapped to 0)
        }
    }

    else {
        return pgn[0].charCodeAt(0) - 97 // Return column as a number ( 'a' mapped to 0)
    }
}