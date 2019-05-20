import MoveResult from "./Interfaces/MoveResult"
import constants from './constants'
import ChessState from "./ChessState"
import StandardTurns from "./Interfaces/Enums/StandardTurns"
import PieceTypes from "./Interfaces/Enums/PieceTypes"
import Directions from "./Interfaces/Enums/Directions"
import BoardLocation from "./Interfaces/BoardLocation"
import GameTypes from "./Interfaces/Enums/GameTypes";
import HelperFunctions from "./HelperFunctions";
import Move from "./Interfaces/Move";
import MoveProcessor from "./MoveProcessor"

module BoardAnalizer {
    export function isCheckmate(state: ChessState, moveResult: MoveResult, board: number): boolean {

        switch (state.getGameType()) {
            case GameTypes.standard:
                // If null use zero, else use the specified board
                const localBoard = (board == null) ? 0 : board
                if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

                return (moveResult.check === true && state.checkForCheckmate(moveResult) === true)
            case GameTypes.bughouse:
                if (typeof (board) == undefined) throw new Error("Board undefined")
                if (board < 0 || board > 1) throw new Error(`Board ${board} does not exists.`)

                let isCheckmate = (moveResult.check && state.checkForCheckmate(moveResult))

        }
    }

    // Note designed for standard board
    export function wouldBeCheckmate(board: string[][], move: Move) {
        let wouldBeBoard = JSON.parse(JSON.stringify(board))

        // Turn doesn't matter if not enPassant. TODO: Try to make the turn never matter
        wouldBeBoard = MoveProcessor.updateBoardByCord(wouldBeBoard, move, false, null, false, true)


    }

    export function canAvoidCheckmate(state: ChessState, board?: number): boolean {
        // A - Avoid
        const localBoard = HelperFunctions.getLocalBoard(board)

        // Find the location of the king.
        let kingLocation = (state.getTurn(localBoard) === StandardTurns.white) ? state.state[localBoard].whiteKingLocation : state.state[localBoard].blackKingLocation

        // Check all the imidiately adjacent and diagonal squares of the king's location.
        for (let squareRulesOfInterest of constants["PieceLogic"]["King"]) {
            if (kingLocation.column + squareRulesOfInterest.column < 8 &&
                kingLocation.column + squareRulesOfInterest.column >= 0 &&
                kingLocation.row + squareRulesOfInterest.row < 8 &&
                kingLocation.row + squareRulesOfInterest.row >= 0) {
                let squareOfIntesest = {
                    row: kingLocation.column + squareRulesOfInterest.column,
                    column: kingLocation.row + squareRulesOfInterest.row
                }

                // TODO: Replace "X" as the empty space.
                // If any EMPTY squares surrounding the king are safe, it's not a checkmate.
                if (state.getBoardArray()[squareOfIntesest.row][squareOfIntesest.column] !== "X" &&
                    state.squareIsSafeForKing(squareOfIntesest, state.getTurn(localBoard), state.getGameType(), localBoard, state.debug) === true) {
                    return false
                }
            }
        }
        return true
    }

    export function canAvoidCheckmateRaw(board: string[][], turn: StandardTurns) {

        const kingLocation = findKing(board, turn)

        // Check all the imidiately adjacent and diagonal squares of the king's location.
        for (let squareRulesOfInterest of constants["PieceLogic"]["King"]) {
            if (kingLocation.column + squareRulesOfInterest.column < 8 &&
                kingLocation.column + squareRulesOfInterest.column >= 0 &&
                kingLocation.row + squareRulesOfInterest.row < 8 &&
                kingLocation.row + squareRulesOfInterest.row >= 0) {
                let squareOfIntesest = {
                    row: kingLocation.column + squareRulesOfInterest.column,
                    column: kingLocation.row + squareRulesOfInterest.row
                }

                // If any EMPTY squares surrounding the king are safe, checkmate can be avoided.
                if (board[squareOfIntesest.row][squareOfIntesest.column] !== "X" &&
                    BoardAnalizer.squareIsSafeForKing(board, squareOfIntesest,turn) === true) {
                    console.log(`square: "${JSON.stringify(squareOfIntesest)}" is safe`)
                    return true
                }
            }
        }
        return false
    }

    export function canBlockCheckmate(state: ChessState, moveResult: MoveResult, board?: number): boolean {
        const localBoard = HelperFunctions.getLocalBoard(board)

        // Find the location of the king.
        let kingLocation = (state.getTurn(localBoard) === StandardTurns.white) ? state.state[localBoard].whiteKingLocation : state.state[localBoard].blackKingLocation


        // If knight, unblockable
        if (moveResult.movedPiece !== PieceTypes.Knight) {
            let distance: BoardLocation = {
                row: moveResult.movedPieceDest.row - kingLocation.row,
                column: moveResult.movedPieceDest.column - kingLocation.column,
            }
            // Only check the path that are between the king and the attacking piece.
            // Find which path by assuming only a Bishop, Rook, Queen, and Pawn can attack.
            //      state means that a piece like pao, or cannon, from Chinese chess isn't 
            //      covered by the following logic.


            let direction: Directions = Directions.Null

            //TODO: Be sure to test later
            // If the attacking piece is NorthWest of the King // TODO: make sure state isn't flipped based on the distance variable
            if (distance.row = 0 && distance.row < 8 && distance.column > 0 && distance.column < 8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is SouthEast of the king.")
                direction = Directions.Southeast
            }
            //West
            else if (distance.row === 0 && distance.column >= 0 && distance.column < 8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is East of the king.")
                direction = Directions.East
            } //SouthWest

            else if (distance.row < 0 && distance.row > -8 && distance.column > 0 && distance.column < 8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is NorthEast of the king.")
                direction = Directions.Northeast
            }

            else if (distance.row < 0 && distance.row > -8 && distance.column === 0) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is North of the king")
                direction = Directions.North
            }

            else if (distance.row < 0 && distance.row > -8 && distance.column < 0 && distance.column > -8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is NorthWest of the king.")
                direction = Directions.Northwest
            }

            else if (distance.row === 0 && distance.column < 0 && distance.column > -8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is West")
                direction = Directions.West
            }

            else if (distance.row > 0 && distance.row < 8 && distance.column < 0 && distance.column > -8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is SouthWest of the king.")
                direction = Directions.Southwest
            }

            else if (distance.row < 0 && distance.column < 0 && distance.column > -8) {
                if (state.debug && !state.hideOutput)
                    console.log("Attacker is South of King.")
                direction = Directions.South
            }

            if (state.debug && !state.hideOutput)
                console.log(`Attacker is from ${direction.toString()}`)
            // Return false if there is a block that prevents checkmate.
            if (state.checkForBlockableSquares(kingLocation, direction, localBoard) === false) {
                return false
            }
            return true
        }
        return false
    }

    export function canCaptureCheckmate(state: ChessState, moveResult: MoveResult, board?: number): boolean {
        const localBoard = HelperFunctions.getLocalBoard(board)

        if (state.debug && !state.hideOutput)
            console.log("---------Checking for capture-------------")

        let result = state.squareIsSafeForKing(moveResult.movedPieceDest,
            (state.getTurn(localBoard) === StandardTurns.white) ? StandardTurns.black : StandardTurns.white,
            state.getGameType(), localBoard, state.debug)

        return result
    }

    export function canDropOnSquare(state: ChessState, location: BoardLocation, piece: string, board?: number): boolean {
        const localBoard = HelperFunctions.getLocalBoard(board)

        // If the drop square is empty
        if (state.state[localBoard][location.row][location.column] === "X") {
            // Cannot place a pawn on row 1 or row 8
            if ((piece === "P" || piece === "p") && location.row === 0 || location.row === 7) {
                return false
            }


            // Can cause check but not checkmate
            // /if(BoardAnalizer.isCheckmate(state, ))
        }
        else
            return false
    }

    export function findKing(board: string[][], color: StandardTurns): BoardLocation {
        //TODO: pick up here
        const kingPiece = constants.PieceNameToPGN["King"][color]
        let kingLocation: BoardLocation
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] === kingPiece) {
                    return {
                        row: i,
                        column: j
                    }
                }
            }
        }

        throw new Error(`King "${kingPiece}" not found on board`)

    }

    export function squareIsSafeForKing(board: string[][], kingSquare: BoardLocation, color: StandardTurns): boolean {

        // Check Knight squares, Bishop squares, and Rook squares.
        let foo = BoardAnalizer.squareIsSafeFromPiece(board, kingSquare, color, "Knight")
        let bar = BoardAnalizer.squareIsSafeFromPiece(board, kingSquare, color, "Bishop")
        let que = BoardAnalizer.squareIsSafeFromPiece(board, kingSquare, color, "Rook")
        return (foo && bar && que)
    }

    // NOTE: function is not designed for non-standard board sizes.
    export function squareIsSafeFromPiece(board: string[][], kingSquare: BoardLocation, color: StandardTurns, pieceName: string): boolean {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        let pieceSymbolWhite: string
        let pieceSymbolBlack: string

        // TODO: The problem is that the bishops and rooks don't stop after they find a piece that is in the way.

        let list: BoardLocation[][] = []
        let sublist: BoardLocation[] = []

        // Only needs to check against Rooks, Knights, and Bishops.
        switch (pieceName) {
            case "Rook":
                pieceSymbolWhite = constants["PieceNameToPGN"]["Rook"][StandardTurns.white]
                pieceSymbolBlack = constants["PieceNameToPGN"]["Rook"][StandardTurns.black]

                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 7; j++) {
                        sublist.push(constants.PieceLogic[pieceName][i * j])
                    }
                    list.push(sublist)
                    sublist = []
                }
                break
            case "Knight":
                pieceSymbolWhite = constants["PieceNameToPGN"]["Knight"][StandardTurns.white]
                pieceSymbolBlack = constants["PieceNameToPGN"]["Knight"][StandardTurns.black]

                // Just stuff it the list.
                for (let j = 0; j < 8; j++) {
                    sublist.push(constants.PieceLogic[pieceName][j])
                }
                list.push(sublist)

                break
            case "Bishop":
                pieceSymbolWhite = constants["PieceNameToPGN"]["Bishop"][StandardTurns.white]
                pieceSymbolBlack = constants["PieceNameToPGN"]["Bishop"][StandardTurns.black]

                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 7; j++) {
                        sublist.push(constants.PieceLogic[pieceName][i * j])
                    }
                    list.push(sublist)
                    sublist = []
                }
                break
            case "Queen":
            case "King":
                throw new Error("Not Yet Implemented.")
            case "Pawn":
                if (color === StandardTurns.white) {
                    if ((kingSquare.row - 1) >= 0 && (kingSquare.column - 1) >= 0 && board[kingSquare.row - 1][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && board[kingSquare.row - 1][kingSquare.column + 1] === "p")
                        return true
                    else
                        return false
                }
                else {
                    if ((kingSquare.row + 1) < 8 && (kingSquare.column - 1) >= 0 && board[kingSquare.row + 8][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && board[kingSquare.row + 1][kingSquare.column + 1] === "p")
                        return true
                    else
                        return false
                }
            default:
                throw new Error("'squareIsSafeFromPiece' function is working unexpectedly.")
        }

        for (let sublist of list) {
            for (let attackerSquare of sublist) {
                // If the square is within bounds
                if (attackerSquare.column + kingSquare.column < 8 &&
                    attackerSquare.column + kingSquare.column >= 0 &&
                    attackerSquare.row + kingSquare.row < 8 &&
                    attackerSquare.row + kingSquare.row >= 0) {

                    // This break will require there to be a clear path for non-jumping pieces to be a threat.
                    if ((board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolWhite ||
                        board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolBlack ||
                        board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== "X") &&
                        pieceName !== "Knight" // Knights are allowed to jump
                    )
                        break

                    // If the correct piece appears, then the square is not safe.
                    if (color === StandardTurns.white && board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolWhite) {
                        return false
                    }
                    else if (color === StandardTurns.black && board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolBlack) {
                        return false
                    }
                }
            }
        }
        // TODO: fix the bool outputs of this function

        return true
    }
}

export default BoardAnalizer