import constants from './constants'
import HelperFunctions from './HelperFunctions'
import FenLogic from './FenLogic'
import GameTypes from './Interfaces/Enums/GameTypes';
import BoardLoaction from './Interfaces/BoardLocation';
import StandardTurns from './Interfaces/Enums/StandardTurns';
import Move from './Interfaces/Move'

const ExecuteTurn = (game, pgn) => {
    let newBoard = ""
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
    
    if (pgn) {
        let capture = (pgn.indexOf("x") !== -1)
        if (game.debug)
            console.log("PGN provided: " + pgn)

        // Determine the pgn move
        switch (pgn) {
            case "O-O": // King side castle
                //TODO: add validation
                throw new Error("Castling not yet implemented")
                break
            case "O-O-O": //Queen side castle
                throw new Error("Castling not yet implemented")
                break

            default: // Normal move  
                let piece: string
                switch (pgn[0]) {
                    case "N": // Knight move
                        piece = (game.getTurn() === StandardTurns.white) ? 'N' : 'n'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType)
                        break
                    case "B": // Bishop move
                        piece = (game.getTurn() === StandardTurns.white) ? 'B' : 'b'
                        moveCord.dest = HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture)
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType)
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
                            console.log("==Pawn Move")
                        moveCord = pgnToCordPawn(game.state.board, pgn, game.getTurn(), game.gameType)
                    // TODO: deal with fen's en passant
                }
                // TODO: move this function into the gameState such that only the game state can update the board.
                game.state.board = updateBoardByCord(game.state.board, moveCord, game.debug)
        }
    }

    else {
        throw new Error("Error: no pgn provided")
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
const updateBoardByCord = (board: string[][], moveCord: Move, debug: boolean) => {
    let newBoard = board
    if (debug) {
        console.log(JSON.stringify(moveCord))
        console.log("Executing move: ")
        console.log(board[moveCord.source.row][moveCord.source.column] + " -> "
            + board[moveCord.dest.row][moveCord.dest.column])
    }

    newBoard[moveCord.dest.row][moveCord.dest.column] = board[moveCord.source.row][moveCord.source.column]
    newBoard[moveCord.source.row][moveCord.source.column] = "X"

    return newBoard
}

// Params: - Board as a 2d array
//         - Pgn move
//         - Players turn (w/b)
//         - Game variant type
// Done with pgn, returns cordinates of piece source and desination
// Note: Doesn't work with bug house when finind piece location
// Return: New moded board as a string
const pgnToCordPawn = (board, pgn: string, turn: StandardTurns, gameType: GameTypes, debug?: boolean) => {
    console.log("pgnToCordPawn~")
    console.log("turn: " + StandardTurns[turn])
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
        moveObj.source = getPieceLocation(board, pgn, piece, gameType)
    else {
        moveObj.source = findPieceSource(board, pgn, piece, moveObj.dest, gameType)
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
const getPieceLocation = (board: Array<Array<string>>, pgn: string, piece: string, gameType: GameTypes): BoardLoaction => {
    // Get loc
    console.log("getPieceLocation~")
    console.log("piece: " + piece)

    let col: number = null
    let possibleCol = []
    let possibleCords = []

    // If pawn
    if (piece === "p" || piece === "P") {
        console.log("----------op 1")
        col = getPGNDropColumn(pgn)
        console.log("col: " + col + " pgn: " + pgn)
    }
    else {
        // TODO: remove everything in this condition.
        console.log("----------op 2")

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
        console.log(board.length)
        console.log(board[0])
        let pieceSource: BoardLoaction = null;
        console.log("COLL: " + col.toString())
        pieceSource.column = +col
        pieceSource.row = -1;
        let possibleCordss = getAllPossiblePieceLocations(board, piece, pieceSource, gameType)

    }

    let piecesInCol: string[] = []
    board.forEach((row) => {
        piecesInCol.push(row[col])
    })

    let locatedPieceRow = -1
    let index = 0

    if (gameType == undefined || gameType === GameTypes.standard) {
        piecesInCol.forEach((p) => {
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
    console.log("locatedPieceCol: ")
    console.log(locatedPieceRow)
    return {
        "column": col,
        "row": locatedPieceRow
    }
}


/* 
 * Parameters: 
 *      - board as 2d array
 *      - Piece to find
 *      - game type [OPTIONAL]
 */
const getAllPossiblePieceLocations = (board: Array<Array<string>>, piece: string, source: BoardLoaction, gameType: GameTypes) => {
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

const getValidMoves = (board: Array<Array<string>>, piece, loc, gameType: GameTypes) => {
    console.log("consts: " + JSON.stringify(constants["PieceLogic"]))
    console.log("piece: " + piece)
    const pieceName = constants["PiecePGNToName"][piece]
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

const findPieceSource = (board: string[][], pgn: string, piece: string, dest: BoardLoaction, gameType: GameTypes): BoardLoaction => {
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
            console.log("piece: " + piece)
            console.log("Dest: " + JSON.stringify(dest))
            possibleSources.forEach((possibleSource: BoardLoaction) => {
                console.log(board[possibleSource.row][possibleSource.column])
                if (board[possibleSource.row][possibleSource.column] === piece) {
                    ans.push(possibleSource)
                }
            })

            // Complex senario
            if (ans.length !== 1) {
                let answer: BoardLoaction
                let count = 0
                // If there is an extra character in the pgn and it's a letter, thus representing the source column, use that column
                if (pgn.length === 4 && !HelperFunctions.isNumeric(pgn[1])) {

                    ans.forEach((possibleSource) => {
                        if (possibleSource.column === charToColumnNumber(pgn[1])) {
                            count++;
                            console.log(possibleSource)
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
                            console.log(possibleSource)
                        }
                    })
                }

                // Just a little bit of error checking 
                if (count <= 0)
                    throw new Error("No piece found capabile of moving to the destination.")
                if (count !== 1)
                    throw new Error("Something went wrong and too many possible piece sources were for this move")
                return answer

                throw new Error("Having two or more pieces that can move to the same space needs to be handled")
            }
            else {
                console.log("BAM")
                console.log(ans[0])
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