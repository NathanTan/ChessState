import constants from './constants'
import HelperFunctions from './HelperFunctions'
import GameTypes from './Interfaces/Enums/GameTypes';
import BoardLoaction from './Interfaces/BoardLocation';
import StandardTurns from './Interfaces/Enums/StandardTurns';
import Move from './Interfaces/Move'
import MoveResult from './Interfaces/MoveResult';
import PieceTypes from './Interfaces/Enums/PieceTypes'


const ExecuteTurn = (game, pgn: string, hideOutput: boolean, debug?: boolean): MoveResult => {
    let newBoard = ""
    // During a castle, use for the king.
    let moveCord: Move = {
        source: {
            column: -1,
            row: -1
        },
        dest: {
            column: -1,
            row: -1
        }
    }
    // Used for the rook during a castle.
    let moveCord2: Move = {
        source: {
            column: -1,
            row: -1
        },
        dest: {
            column: -1,
            row: -1
        }
    }

    if (pgn == null) {
        console.log("No More Moves")
        //return null
    }



    let result: MoveResult = {
        whiteKingSideCastle:    false,
        whiteQueenSideCastle:   false,
        blackKingSideCastle:    false,
        blackQueenSideCastle:   false,
        kingLocation:           null,
        movedPiece:             null,
        movedPieceDest:         null,
        check:                  (pgn == null) ? null : (pgn.indexOf("+") !== -1),   // Check if pgn delairs check
        gameIsOver:             false,
        moveIsInvalid:          false,
        invalidMove:            null,
        enableEnPassant:        null,
        executeEnPassant:       false
    }
    // TODO: Manually check for the king getting put in check
    let castle = false

    if (pgn) {
        let capture = (pgn.indexOf("x") !== -1)
        if (game.debug && !hideOutput)
            console.log("PGN provided: " + pgn)

        // Determine the pgn move
        switch (pgn) {
            case "0-0": // King side castle
                //TODO: add validation
                // Check if castle is legal for the position.
                if ((game.getTurn() === StandardTurns.white &&
                    game.state.fenExtras.castling.indexOf("K") !== -1) ||
                    (game.getTurn() === StandardTurns.black &&
                        game.state.fenExtras.castling.indexOf("k") !== -1)
                ) {
                    // Proceed
                    // Set move for king.
                    moveCord.dest = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 6
                    }
                    moveCord.source = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 4
                    }

                    // Set move for rook.
                    moveCord2.dest = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 5
                    }
                    moveCord2.source = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 7
                    }
                }

                else {
                    if (debug) {
                        console.log(game.getTurn().toString())
                        console.log(game.state.fenExtras.castling.indexOf("K") !== -1)
                    }
                    throw new Error("King side castling is not legal in the current state.")
                }

                if (game.getTurn() === StandardTurns.white) {
                    result.whiteKingSideCastle = true
                }
                else if (game.getTurn() === StandardTurns.black) {
                    result.blackKingSideCastle = true
                }
                castle = true
                result.kingLocation = moveCord.dest     // Keep track of where the king lands for checking checkmate.
                break
            case "0-0-0": //Queen side castle

                // Check if castle is legal.
                if ((game.getTurn() === StandardTurns.white &&
                    game.state.fenExtras.castling.indexOf("Q") !== -1) ||
                    (game.getTurn() === StandardTurns.black &&
                        game.state.fenExtras.castling.indexOf("q") !== -1)
                ) {
                    // Proceed

                    // Set move for king.
                    moveCord.dest = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 2
                    }
                    moveCord.source = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 4
                    }

                    // Set move for rook.
                    moveCord2.dest = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 3
                    }
                    moveCord2.source = {
                        row: (game.getTurn() === StandardTurns.white) ? 7 : 0,
                        column: 0
                    }
                }

                else {
                    throw new Error("Queen side castling is not legal in the current state.")
                }

                if (game.getTurn() === StandardTurns.white) {
                    result.whiteQueenSideCastle = true
                }
                else if (game.getTurn() === StandardTurns.black) {
                    result.blackQueenSideCastle = true
                }
                castle = true
                result.kingLocation = moveCord.dest     // Keep track of where the king lands for checking checkmate.
                break

            default: // Normal move  
                let piece: string
                switch (pgn[0]) {
                    case "N": // Knight move
                        piece = (game.getTurn() === StandardTurns.white) ? 'N' : 'n'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput)
                        result.movedPiece = PieceTypes.Knight
                        break
                    case "B": // Bishop move
                        piece = (game.getTurn() === StandardTurns.white) ? 'B' : 'b'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput)
                        result.movedPiece = PieceTypes.Bishop
                        break
                    case "R": // Rook move
                        piece = (game.getTurn() === StandardTurns.white) ? 'R' : 'r'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput)
                        result.movedPiece = PieceTypes.Rook                        
                        break
                    case "Q": // Queen move
                        piece = (game.getTurn() === StandardTurns.white) ? 'Q' : 'q'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput)
                        result.movedPiece = PieceTypes.Queen                 
                        break
                    case "K": // King move
                        piece = (game.getTurn() === StandardTurns.white) ? 'K' : 'k'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput)
                        result.kingLocation = moveCord.dest     // Keep track of where the king lands for checking checkmate.
                        result.movedPiece = PieceTypes.King
                        break
                    default: // Pawn move
                        if (game.debug && !hideOutput)
                            console.log("==Pawn Move")
                        moveCord = pgnToCordPawn(game.state.board, pgn, game.getTurn(), game.gameType, hideOutput, debug)
                        result.movedPiece = PieceTypes.Pawn
                        
                        // Check to see if a pawn moved 2 spaces
                        if (moveCord.dest.row - moveCord.source.row === 2 ||
                            moveCord.dest.row - moveCord.source.row === -2) {
                            let rowDifference = (game.getTurn() === StandardTurns.white) ? 1 : -1
                            result.enableEnPassant = `${pgn[0]}${Math.abs(-pgn[1] + rowDifference)}` // This should work but ought to be tested TODO:
                        }

                        if (moveCord.dest.column !== moveCord.source.column) {
                            result.executeEnPassant = true
                            console.log(moveCord)
                        }
                    // TODO: deal with fen's en passant
                }
        }
        result.movedPieceDest = moveCord.dest

        // TODO: move this function into the gameState such that only the game state can update the board.
        game.state.board = updateBoardByCord(game.state.board, moveCord, result.executeEnPassant, game.getTurn(), game.debug, hideOutput)
        if (castle)
            game.state.board = updateBoardByCord(game.state.board, moveCord2, false, null, game.debug, hideOutput)
    }

    else {
        throw new Error("Error: no pgn provided")
    }

    return result
}

export default ExecuteTurn


/*
 * Params:
 *      - The board as a 2d array
 *      - an object holding the the source and destination of the move
 *      - [OPTIONAL] flag for debugging printing
 * Returns: A new 2d array with 1 piece in a different place
 */
const updateBoardByCord = (board: string[][], moveCord: Move, enPassant: boolean, turn: StandardTurns, debug: boolean, hideOutput: boolean) => {
    let newBoard = board

    if (debug && !hideOutput) {
        console.log(JSON.stringify(moveCord))
        console.log("Executing move: ")
        console.log(board[moveCord.source.row][moveCord.source.column] + " -> "
            + board[moveCord.dest.row][moveCord.dest.column])
    }

    newBoard[moveCord.dest.row][moveCord.dest.column] = board[moveCord.source.row][moveCord.source.column]
    newBoard[moveCord.source.row][moveCord.source.column] = "X"

    if (enPassant) {
        let rowDifference = (turn === StandardTurns.white) ? 1 : -1
        newBoard[moveCord.dest.row + rowDifference][moveCord.dest.column] = "X"
    }

    return newBoard
}

const updateBoardByCordEnPassant = (board: string[][], moveCord: Move, enPassant: boolean, debug: boolean, hideOutput: boolean) => {
    let newBoard = board
    newBoard[moveCord.dest.row][moveCord.dest.column] = board[moveCord.source.row][moveCord.source.column]
    newBoard[moveCord.source.row][moveCord.source.column] = "X"


console.log(`But the en Passant: ${enPassant}`)
    console.log("Move")
console.log(moveCord)

return null
}
// Params: - Board as a 2d array
//         - Pgn move
//         - Players turn (w/b)
//         - Game variant type
// Done with pgn, returns cordinates of piece source and desination
// Note: Doesn't work with bug house when finind piece location
// Return: New moded board as a string
const pgnToCordPawn = (board: string[][],pgn: string, turn: StandardTurns, gameType: GameTypes, hideOutput: boolean, debug?: boolean): Move => {
    // console.log(`DEBUG: ${debug}`)
    // console.log(`hideOutput: ${hideOutput}`)
    if (debug && !hideOutput) {
        console.log("~~~pgnToCordPawn")
        console.log("turn: " + StandardTurns[turn])
        console.log(`pgn: ${pgn}`)
    }
    let moveObj: Move = {
        source: {
            column: -1,
            row: -1
        },
        dest: {
            column: -1,
            row: -1
        }
    }
    let capture = (pgn.indexOf("x") !== -1)

    let piece = ""
    switch (gameType) {
        case GameTypes.standard:
            if (turn === StandardTurns.black) {
                piece = "p"
            }
            else {
                piece = "P"
            }
            break
        default:
            throw new Error("Game variant '" + gameType + "' not yet implemented.")
    }

    moveObj.dest = HelperFunctions.findPieceDestination(pgn, turn, gameType, capture)

    if (piece === "p" || piece === "P")
        moveObj.source = getPieceLocation(board, pgn, piece, gameType, hideOutput)
    else {
        moveObj.source = findPieceSource(board, pgn, piece, moveObj.dest, gameType, debug, hideOutput)
    }

    if (debug) {
        console.log("Piece's location")
        console.log("(" + moveObj.source.column + "," + moveObj.source.row + ")")
        console.log("Piece's Destination")
        console.log("(" + moveObj.dest.column + "," + moveObj.dest.row + ")")
    }

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
 *      - board as 2d array
 *      - PGN move
 *      - Piece to find
 *      - game type [OPTIONAL]F
 */
// TODO: Deal with situtation where there are 2 pieces in the same column that can move to the same square.
const getPieceLocation = (board: string[][], pgn: string, piece: string, gameType: GameTypes, hideOutput:boolean, debug?: boolean): BoardLoaction => {
    // Get loc
    if (debug && !hideOutput) {
        console.log("getPieceLocation~")
        console.log("piece: " + piece)
    }

    let col: number = null
    let possibleCol = []
    let possibleCords = []

    // If pawn
    if (piece === "p" || piece === "P") {
        col = getPGNDropColumn(pgn)
        if (debug && !hideOutput)
            console.log("col: " + col + " pgn: " + pgn)
    }
    else {
        // TODO: remove everything in this condition.

        // TODO: add validation to make sure the user didn't input correctly
        // Only one piece that can go to the dest square
        if (pgn.length === 3) {
            let b: BoardLoaction = { column: -1, row: -1 }
            b.column = charToColumnNumber(pgn[1])
            //b.column
            b.row = 8 - +pgn[2]
        }

        // Two pieces (in standard) can land on the dest square
        else if (pgn.length === 4) {

        }
        else {
            throw new Error("Something's wrong in the neighborhood. Who you gonna call???")
        }



        col = getPGNDropColumn(pgn)
      
        let pieceSource: BoardLoaction = null;
        pieceSource.column = +col
        pieceSource.row = -1;

    }

    let piecesInCol: string[] = []
    board.forEach((row) => {
        piecesInCol.push(row[col])
    })

    let locatedPieceRow = -1
    let index = 0

    if (gameType == undefined || gameType === GameTypes.standard) {
        piecesInCol.forEach((p) => {
            if (debug && !hideOutput)
                console.log("p: " + p)
            if (p === piece) {
                locatedPieceRow = index
            }
            index++;
        })
    }

    else {
        throw new Error("ERROR: TODO: Implement for non-standard game variants")
    }

    return {
        "column": col,
        "row": locatedPieceRow
    }
}

const findPieceSource = (board: string[][], pgn: string, piece: string, dest: BoardLoaction, gameType: GameTypes, debug: boolean, hideOutput: boolean): BoardLoaction => {
    switch (gameType) {
        case GameTypes.standard:

            let possibleSources: BoardLoaction[] = []
            // Find all possible sources on the map for the provided piece.
            constants.PieceLogic[constants["PiecePGNToName"][piece]].forEach((square) => {

                if (square.column + dest.column < 8 &&
                    square.column + dest.column >= 0 &&
                    square.row + dest.row < 8 &&
                    square.row + dest.row >= 0)
                    possibleSources.push({
                        column: square.column + dest.column,
                        row: square.row + dest.row
                    })
            })

            let ans: BoardLoaction[] = []
            // console.log("piece: " + piece)
            // console.log("Dest: " + JSON.stringify(dest))

            // Find which of the possible sources is the real source
            // Special logic for Rooks
            if (piece === "R" || piece === "r") {
                possibleSources.forEach((possibleSource: BoardLoaction) => {
                    //console.log(board[possibleSource.row][possibleSource.column])
                    if (board[possibleSource.row][possibleSource.column] === piece) {
                        ans.push(possibleSource)
                    }
                })
                // Once we have the two possible locations, check the squares between
                // the possible location and the destination square for other pieces.
                for (let possibleSource of ans) {   // TODO: add lots of unit testing here and check for moving rooks in columns
                    let row = possibleSource.row
                    let offset = 1
                    for (let i = 0; i < constants.BoardWidth; i++) {
                        let col1 = possibleSource.column + offset
                        let col2 = possibleSource.column - offset

                        if (board[row][col1] !== undefined && board[row][col1] !== "X") {
                            break // This is not the one
                        }
                        else if (board[row][col1] !== undefined && board[row][col2] !== "X") {
                            break // This is not the one
                        }
                        else if ((col1 === dest.column && row === dest.row) ||
                            (col2 === dest.column && row === dest.row)) {
                            // this is the one
                            return possibleSource
                        }
                        offset++
                    }
                }
            }
            // Normal rules
            else {
                possibleSources.forEach((possibleSource: BoardLoaction) => {
                    //console.log(board[possibleSource.row][possibleSource.column])
                    if (board[possibleSource.row][possibleSource.column] === piece) {
                        ans.push(possibleSource)
                    }
                })
            }
            // Complex senario
            if (ans.length !== 1) {
                let answer: BoardLoaction
                let count = 0
                // If there is an extra character in the pgn and it's a letter, thus representing the source column, use that column
                if (pgn.length === 4 && !HelperFunctions.isNumeric(pgn[1])) {
                    ans.forEach((possibleSource) => {
                        if (possibleSource.column === charToColumnNumber(pgn[1])) {
                            count++;
                           // console.log(possibleSource)
                            answer = possibleSource
                        }
                    })
                }

                // If there is an extra character in the pgn and it's a number, thus representing the source row, use that row
                else if (pgn.length === 4 && HelperFunctions.isNumeric(pgn[1])) {
                    ans.forEach((possibleSource) => {
                        // TODO: unit test this
                        if (possibleSource.row === +pgn[1]) {
                            count++
                            answer = possibleSource
                            //console.log(possibleSource)
                        }
                    })
                }

                // Just a little bit of error checking 
                if (count <= 0)
                    throw new Error("No piece found capabile of moving to the destination.")
                if (count !== 1)
                    throw new Error("Something went wrong and too many possible piece sources were for this move")
                return answer
            }
            else {
                if (!hideOutput) {
                    console.log(ans[0])
                }
                return ans[0]
            }
            //}
            break
        default:
            throw new Error("Game type " + gameType + " not yet implemented.")
    }
}


/*
 * Parameters:
 *    - pgn notation 
 * Returns:
 *    Numeric mapped value corresponding to the letter column of the board
 */
const getPGNDropColumn = (pgn: string): number => {

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

const charToColumnNumber = (char: string): number => {
    return char[0].charCodeAt(0) - 97;
}

const testMethod = () => {
    return 1
}