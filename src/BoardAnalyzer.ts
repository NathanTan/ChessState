import StandardTurns from "./Interfaces/Enums/StandardTurns"//s
import HelperFunctions from './HelperFunctions'
import BoardLoaction from "./Interfaces/BoardLocation"
import GameTypes from "./Interfaces/Enums/GameTypes"
import GameType from './Interfaces/Enums/GameTypes'
import constants from './constants'

class BoardAnalyzer {
    static getAllPieceLocations(board: Array<Array<string>>, color: StandardTurns): Array<string> {
        let pieceLocations = []
        let rowCount = 0
        board.forEach(row => {
            let colCount = 0
            row.forEach(piece => {

                // Possibilities are p,r,n,b,k,q,X,P,R,N,B,K,Q
                if (piece !== 'X') {
                    let pieceColor = null

                    // Get piece color 
                    if (piece === piece.toLocaleUpperCase()) {
                        pieceColor = StandardTurns.white
                    } else {
                        pieceColor = StandardTurns.black
                    }

                    if (pieceColor === color) {
                        pieceLocations.push(HelperFunctions.mapBoardPositionToChessNotation(rowCount, colCount))
                    }
                }

                colCount++
            })
            rowCount++
        });

        return pieceLocations
    }

    static getAllPossibleMovesForAPawn(board: Array<Array<string>>, source: BoardLoaction, color: StandardTurns, enPassant: string, gameType: GameTypes): Array<string> {
        let possibleMoves = []
        // Calculate by color
        if (gameType !== GameTypes.standard) {
            // Error out
            console.log("ERROR: functionality for gametype '" + gameType.toString() + "' missing.")
            return
        }

        // white is down on the map coordinates and black is down
        let direction = (color === StandardTurns.white) ? -1 : 1
        // Check 1 square up for a piece
        if (board[source.row + (1 * direction)][source.column] === "X") {
            possibleMoves.push(HelperFunctions.mapBoardPositionToChessNotation(
                source.row + (1 * direction),
                source.column
            ))
        }

        /* Check for a capture */
        // If is in bounds, has a piece and that piece is the opposite color
        if (source.column + 1 < 8 &&
            board[source.row + (1 * direction)][source.column + 1] !== "X" &&
            constants["PiecePGNToColor"][board[source.row + (1 * direction)][source.column + 1]] !== color) {
            possibleMoves.push(HelperFunctions.mapBoardPositionToChessNotation(
                source.row + (1 * direction),
                source.column + 1
            ))
        }

        // If is in bounds, has a piece and that piece is the opposite color
        if (source.column - 1 >= 0 &&
            board[source.row + (1 * direction)][source.column + 1] !== "X" &&
            constants["PiecePGNToColor"][board[source.row + (1 * direction)][source.column + 1]] !== color) {
            possibleMoves.push(HelperFunctions.mapBoardPositionToChessNotation(
                source.row + (1 * direction),
                source.column - 1
            ))
        }

        /* Check for EnPassant */
        // If EnPassant is enabled, is in bounds, EnPassant is for the correct column,
        // has no piece in dest square,
        // and that piece is the opposite color
        if (enPassant !== null && source.column + 1 < 8 &&
            HelperFunctions.mapChessNotationToBoardPositionColumn(enPassant) === source.column + 1 &&
            board[source.row + (1 * direction)][source.column + 1] === "X" && // TODO: remove this part of the condition with testing
            constants["PiecePGNToColor"][board[source.row][source.column + 1]] !== color) {
            possibleMoves.push(HelperFunctions.mapBoardPositionToChessNotation(
                source.row + (1 * direction),
                source.column + 1
            ))
        }

        // If EnPassant is enabled, is in bounds, EnPassant is for the correct column,
        // has no piece in the dest square
        // and that piece is the opposite color
        if (enPassant !== null && source.column - 1 >= 0 &&
            HelperFunctions.mapChessNotationToBoardPositionColumn(enPassant) === source.column + 1 &&
            board[source.row + (1 * direction)][source.column + 1] === "X" && // TODO: remove this part of the condition with testing
            constants["PiecePGNToColor"][board[source.row][source.column + 1]] !== color) {
            possibleMoves.push(HelperFunctions.mapBoardPositionToChessNotation(
                source.row + (1 * direction),
                source.column - 1
            ))
        }


        // If starting is a starting pawn
        // Note: needs an update for bughouse
        if (((source.row === 6 && color === StandardTurns.white) ||
            (source.row === 1 && color === StandardTurns.black)) &&
            gameType === GameType.standard) {

            // Check 1 & 2 squares up for a pawn's first move
            if (board[source.row + (1 * direction)][source.column] === "X" &&
                board[source.row + (2 * direction)][source.column] === "X") {
                possibleMoves.push(HelperFunctions.mapBoardPositionToChessNotation(
                    source.row + (2 * direction),
                    source.column
                ))
            }
        }

        return possibleMoves
    }
}

export default BoardAnalyzer