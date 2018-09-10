import constants from './constants'
import HelperFunctions from './HelperFunctions'
import FenLogic from './FenLogic'

const ExecuteTurn = (game, pgn) => {
    let newBoard = ""
    let moveCord = null
    //let fen = game.getModBoard()
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
                        console.log(game.board)
                        console.log("FEN: " + JSON.stringify(FenLogic.BoardToFen(game.board)))
                        moveCord = pgnToCordPawn(game.board, pgn, game.getTurn())
                    // TODO: deal with fen's en passant
                }
                console.log("HeRe")
                console.log(JSON.stringify(moveCord))
                game.board = updateBoardByCord(game.board, moveCord, game.debug)
        }
        //newFen = updateTurn(fen, null, null)

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
// Done with pgn, returns cordinates of piece source and desination
// Note: Doesn't work with bug house when finind piece location
// Return: New moded board as a string
const pgnToCordPawn = (board, pgn, turn) => {
    let moveObj = {
        loc: null,
        dest: null
    }
    let piece = (turn === "w") ? "P" : "p" // TODO: Change this for non-standard varients
    // If this move has a capture
    if (pgn.indexOf("x") !== -1) {
        Error("TODO: add pawn capture functionality")
    }

    else {
        // Get piece src & dest
        moveObj.loc = getPieceLocation(board, pgn, piece)
        moveObj.dest = HelperFunctions.pgnToGridCordinates(pgn, null)

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
const getPieceLocation = (board, pgn, piece, gameType) => {
    // Get loc

    const col = getPGNColumn(pgn)
    let piecesInCol = []
    board.forEach((row) => {
        piecesInCol.push(row[col])
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
        "col": col,
        "row": locatedPieceCol
    }
}

/*
 * Parameters:
 *    - pgn notation 
 * Returns:
 *    Numeric mapped value corresponding to the letter column of the board
 */
const getPGNColumn = pgn => {

    // If the first letter of the pgn is upper case, then it is the piece that is moving.
    if (pgn[0] === pgn[0].toUpperCase()) { //Check if is upper case
        // If capture
        if(pgn[1] === "x") {
            pgn[2].charCodeAt(0) - 97 // Return column as a number ( 'a' mapped to 0)
        }

        // No capture
        else {
            pgn[1].charCodeAt(0) - 97 // Return column as a number ( 'a' mapped to 0)
        }
    }

    else {
        return pgn[0].charCodeAt(0) - 97 // Return column as a number ( 'a' mapped to 0)
    }
}