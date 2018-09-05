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
                        moveCord = pgnToCordPawn(FenLogic.BoardToFen(game.board), pgn, game.getTurn())
                    // TODO: deal with fen's en passant
                }
                console.log("HeRe")
                console.log(JSON.stringify(moveCord))
                game.board = updateBoardByCord(game.board, moveCord)
        }
        //newFen = updateTurn(fen, null, null)

    }

    else {
        Error("Error: no pgn provided")
    }
}

export default ExecuteTurn

/*
 * Parameters:
 *      - Row to insert piece in                as an array
 *      - Piece to place in row                 as a string
 *      - Column that the piece should go in    as a number\?
 * Returns: A row with the piece inserted       as an array
 */

/*
 * Params:
 *      - The board as a 2d array
 *      - an object holding the the source and destination of the move
 * Returns: A new 2d array with 1 piece in a different place
 */
const updateBoardByCord = (board, moveCord) => {
    let newBoard = board 
    console.log("peeed")
    console.log(board[moveCord.dest.col][moveCord.dest.row])
    console.log("->")
    console.log(board[moveCord.loc.col][moveCord.loc.row])

    newBoard[moveCord.dest.col][moveCord.dest.row] = board[moveCord.loc.col][moveCord.loc.row]
    newBoard[moveCord.loc.col][moveCord.loc.row] = "X"
    console.log("NewBoard" + JSON.stringify(newBoard))

    return newBoard


}

// Params: - Moded Fen string of chess state
//         - Pgn move
//         - Players turn (w/b)
// Done with pgn, returns cordinates of piece source and desination
// Note: Doesn't work with bug house when finind piece location
// Return: New moded board as a string
const pgnToCordPawn = (fen, pgn, turn) => {
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
        moveObj.loc = getPieceLocation(fen, pgn, piece)
        moveObj.dest = HelperFunctions.pgnToGridCordinates(pgn, null)

        console.log("Piece's location")
        console.log("(" + moveObj.loc.col + "," + moveObj.loc.row + ")")
        console.log("Piece's Destination")
        console.log("(" + moveObj.dest.col + "," + moveObj.dest.row + ")")
    }

    console.log("piece " + piece)


    return moveObj

    let board = fen.split("/")
    let newBoard = ""
    // console.log(board.reverse()[loc.row].split(""))

    let foo = []

    for (let i in board) {
        let row = []
        // console.log(board[i])
        // console.log(board[i].split(""))
        for (let j in board[i].split("")) {
            let splitRow = board[i].split("")
            let symbol = splitRow[j]
            let newRow = ""
            // console.log("[" + i + "][" + j + "]")
            // console.log("?: " + loc.row + loc.col)
            // console.log((i === loc.row))
            // console.log((j === loc.col))
            //  console.log("-----------------")
            // console.log("i: " + i)
            //     console.log("dest.row: " + dest.row)
            //     console.log(HelperFunctions.isNumeric(symbol) && i == dest.row)
            // If the piece source square
            if (i == loc.row && j == loc.col) { // Forgive me Father, for I have sinned.
                symbol = " "

                newRow = generateNewRow(board[i], dest.col, false)
                //console.log("SYMBOL" + symbol)
                // console.log("\t\t\tANITHAT")

            }

            // TODO: Fix condition of when this block runs, I need to get the correct row to geed to test  placePieceInRow

            else if (HelperFunctions.isNumeric(symbol) && i == dest.row) {
                // if (i === dest.row && j === dest.col) {2
                //console.log("i: " + i)
                //console.log("dest.row: " + dest.row)
                // console.log("\t\t\tHIT")
                // console.log("ROW: " + board[i])
                newRow = placePieceInRow(board[i], piece, dest.col)


                symbol = "FUCK"
                //  }
            }

            if (newRow === "") {

                row.push(symbol)
            }

            else {
                row.push(newRow)
                newRow = ""
                break
            }
        }
        foo.push(row)
    }
    console.log(foo.reverse())
    console.log("CoW CIty")
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