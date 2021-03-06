import BoardPrinter from './BoardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import ExecuteTurn from './MoveProcessor'
import FenLogic from './FenLogic'
import State from './Interfaces/State'
import GameType from './Interfaces/Enums/GameTypes'
import StandardTurns from './Interfaces/Enums/StandardTurns'
import MoveResult from './Interfaces/MoveResult'
import BoardLocation from './Interfaces/BoardLocation'
import Config from './Interfaces/Config'
import PieceTypes from './Interfaces/Enums/PieceTypes'
import Directions from './Interfaces/Enums/Directions'
import GameStatus from './Interfaces/GameStatus'

// (function(window){


//     const myLib = () => {


class ChessState {
    /* Properties */
    public debug: boolean
    private gameType: GameType
    private state: State
    private hideOutput: boolean
    private config: Config


    /*
    * Params:
    *      - [OPTIONAL] game variant type
    *      - [OPTIONAL] starting fen position
    *      - [OPTIONAL] flag for debugging printing
    *      - [TESTING] game for testing (as array of pgns)
    * Returns: A new 2d array with 1 piece in a different place
    */
    constructor(config?: Config) {
        // TODO: validate config object

        if (config == null) {
            this.config = constants.defaultConfig
        }
        else {
            this.config = config
        }
        
        this.debug = this.config.debug
        this.gameType = this.config.gameType
        this.hideOutput = this.config.hideOutput
        let fenExtras;

        // Check for provided fen.
        if (this.config.fen == null) {
            // No provided fen string means a default start.
            this.config.fen = constants.startingFen;
            fenExtras = {
                turn: StandardTurns.white,
                castling: "KQkq",
                enPassant: null,
                halfMoves: 0,
                fullMoves: 1
            }
        }

        else {
            // Generate fen.

            // Quick fix
            if (this.config.fen === constants.startingFen) {
                fenExtras = {
                    turn: StandardTurns.white,
                    castling: "KQkq",
                    enPassant: null,
                    halfMoves: 0,
                    fullMoves: 1
                }
            }
        }

        // Initalize state.
        this.state = {
            board: FenLogic.FenToBoard(this.config.fen),
            history: {
                fen: [this.config.fen],
                pgn: []
            },
            gameOver: false,    // TODO: check initalizing with a game over fen
            turn: 0,
            fenExtras: fenExtras,
            whiteKingLocation: (this.config.fen === constants["startingFen"]) ? 
                                { row: 7, column: 4} as BoardLocation : FenLogic.GetWhiteKingLocation(this.config.fen),
            blackKingLocation: (this.config.fen === constants["startingFen"]) ? 
                                { row: 0, column: 4} as BoardLocation : FenLogic.GetBlackKingLocation(this.config.fen),
            winner: null
        }

        Errors.checkGameType(this)
        if (this.debug && !this.hideOutput) {
            console.log("Game type: ")
            console.log(this.gameType.toString())
            console.log("Standard game type")
            console.log(GameType.standard)
            console.log("fenExtras: " + JSON.stringify(this.state.fenExtras))
            console.log("GameState initalized\n")
        }
        if (!this.hideOutput)
            BoardPrinter.printBoard(this, StandardTurns.white, this.hideOutput)
    }

    move(move: string) {
        // Check for resignation
        if (move === `resign`) {
            this.resign()
            return {
                whiteKingSideCastle:    false,
                whiteQueenSideCastle:   false,
                blackKingSideCastle:    false,
                blackQueenSideCastle:   false,
                kingLocation:           null,
                movedPiece:             null,	    // If null then the move was a castle.
                movedPieceDest:         null,
                check:                  false,         // An indication if check happened.
                gameIsOver:             true,
                moveIsValid:            false,
                invalidMove:            null
            }
        }


        // Check for game over BEFORE move validation.
    	if (this.state.gameOver === true) {
            return {
                whiteKingSideCastle:    false,
                whiteQueenSideCastle:   false,
                blackKingSideCastle:    false,
                blackQueenSideCastle:   false,
                kingLocation:           null,
                movedPiece:             null,	    // If null then the move was a castle.
                movedPieceDest:         null,
                check:                  false,         // An indication if check happened.
                gameIsOver:             true,
                moveIsValid:            false,
                invalidMove:            ""
            }
        }
        
        // Validate move
        let moveIsValid = true // TODO: validation

        // Return to indicate invalid move.
        // @ts-ignore
        if (moveIsValid === false) {
            return {
                whiteKingSideCastle:    false,
                whiteQueenSideCastle:   false,
                blackKingSideCastle:    false,
                blackQueenSideCastle:   false,
                kingLocation:           null,
                movedPiece:             null,	    // If null then the move was a castle.
                movedPieceDest:         null,
                check:                  false,         // An indication if check happened.
                gameIsOver:             false,
                moveIsValid:            false,
                invalidMove:            move
            }
        }

        if (this.debug && !this.hideOutput)
                console.log("/////////////////////// Turn " + this.state.turn + " ///////////////////////")
        // 1. Print info.
        if (this.gameType === GameType.standard) {
            if (this.debug && !this.hideOutput)
            console.log("   " + this.getTurn() + "'s turn")
        }


        // Execute move (pgn)
        let result = ExecuteTurn(this, move, this.hideOutput, this.debug)

        // Update History
        this.state.history.pgn.push(move)
        this.state.history.fen.push(FenLogic.BoardToFen(this.state.board, this.state.fenExtras))
        
        this.state.turn++

        // Update king location.
        // TODO: Make sure king location is set when using a non-starting fen.
        if (this.getTurn() === StandardTurns.white && result.kingLocation !== null) {
            this.state.whiteKingLocation = result.kingLocation
        }
        else if (result.kingLocation !== null) {
            this.state.blackKingLocation = result.kingLocation
        }

        // Print board if debugging.
        if (this.debug === true && !this.hideOutput)
            BoardPrinter.printBoardDebug(this, this.hideOutput)
        else if (this.debug === false && !this.hideOutput)
            BoardPrinter.printBoard(this, StandardTurns.white, this.hideOutput)
        this.updateFenExtras(result)

        if (result == null) {
            if (!this.hideOutput) {
                console.log("!~!~!~!~!~! No More Moves !~!~!~!~!~!~!")
                console.log("              Game Over")
            }
            this.state.gameOver = true
        }

        if (this.checkForEndOfGame(result)) {
            if (!this.hideOutput)
                console.log("GAME OVER")
            this.state.gameOver = true // For testing purposes
        }

        return result
    }

    // TODO: check if this can be removed.
    getBoardArray() {
        return this.state.board
    }

    getTurn(): StandardTurns {
        switch (this.gameType) {
            /* Standard */
            case GameType.standard:
                return this.state.fenExtras.turn
            default:
                throw new Error("Error, variant not recognized")
        }
    }

    getFen(debug?: boolean): string {
        return FenLogic.BoardToFen(this.state.board, this.state.fenExtras, debug).trim()
    }

    printBoard(debug?: boolean, hideOutput?: boolean): void {
        BoardPrinter.printBoard(this, StandardTurns.white, debug)
    }

    /*
     * Update turn
     */
    updateFenExtras(moveResults: MoveResult) {
        switch (this.gameType) {
            /* Standard */
            case GameType.standard:
                // Toggle turn
                if (this.state.fenExtras.turn === StandardTurns.white) 
                    this.state.fenExtras.turn = StandardTurns.black
                else 
                    this.state.fenExtras.turn = StandardTurns.white

                // Update castling.
                if (moveResults.whiteKingSideCastle || moveResults.whiteQueenSideCastle) {
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("K", "")
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("Q", "")
                }

                else if (moveResults.blackKingSideCastle || moveResults.blackQueenSideCastle) {
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("k", "")
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("q", "")
                }
                
                // Update En Passant
                this.state.fenExtras.enPassant = moveResults.enableEnPassant

                //this.checkForCastling()                 // Update available castling.
                this.state.fenExtras.halfMoves++;             // Increment number of half moves.
                if (this.state.fenExtras.halfMoves === 2) {   // Check to increment full moves.
                    this.state.fenExtras.halfMoves = 0
                    this.state.fenExtras.fullMoves++
                }
                break
            default:
                throw new Error("Variant Not Yet Implemented")
        }
    }

    checkForCastling() {
        if (!this.hideOutput)
            console.log("checkForCastling Not Yet Implemented")
    }

    checkForEnPassant() {
        if (!this.hideOutput)
            console.log("checkForEnPassant Not Yet Implemented")
    }

    checkForEndOfGame(moveResult: MoveResult) {
        if (moveResult.check === true && this.checkForCheckmate(moveResult) === true) {
            if (this.getTurn() === StandardTurns.black)
                this.state.winner = StandardTurns.white
            else 
                this.state.winner = StandardTurns.black
            return true
        }

        //this.checkForStalemate() 
        // TODO: add resign functionality.
        return false
    }

    // NOTE: method is designed for standard sized board
    checkForCheckmate(moveResult: MoveResult): boolean {
        let isCheckmate = false
        // Find the location of the king.
        let kingLocation = (this.getTurn() === StandardTurns.white) ? this.state.whiteKingLocation : this.state.blackKingLocation

        // TODO: add method for searching for king if non-starting fen is provided.
        let kingPiece = (this.getTurn() === StandardTurns.white) ? "K" : "k"

        // A - Avoid
        // Check all the imidiately adjacent and diagonal squares of the king's location.
        for (let squareRulesOfInterest of constants["PieceLogic"]["King"]) {
            if (kingLocation.column + squareRulesOfInterest.column < 8 &&
                kingLocation.column + squareRulesOfInterest.column >= 0 &&
                kingLocation.row + squareRulesOfInterest.row < 8 &&
                kingLocation.row + squareRulesOfInterest.row >= 0) {
                let squareOfIntesest = {
                    row:    kingLocation.column + squareRulesOfInterest.column,
                    column: kingLocation.row + squareRulesOfInterest.row
                }

                // TODO: Replace "X" as the empty space.
                // If any EMPTY squares surrounding the king are safe, it's not a checkmate.
                if (this.getBoardArray()[squareOfIntesest.row][squareOfIntesest.column] !== "X"  &&
                   this.squareIsSafeForKing(squareOfIntesest, this.getTurn(), this.gameType, this.debug) === true) {
                    return false
                }
            }
        }

        // B - Block
        // If knight, unblockable
        if (moveResult.movedPiece !== PieceTypes.Knight) {
            let distance: BoardLocation = {
                row:    moveResult.movedPieceDest.row - kingLocation.row,
                column: moveResult.movedPieceDest.column - kingLocation.column,
            }
            // Only check the path that are between the king and the attacking piece.
            // Find which path by assuming only a Bishop, Rook, Queen, and Pawn can attack.
            //      This means that a piece like pao, or cannon, from Chinese chess isn't 
            //      covered by the following logic.


            let direction: Directions = Directions.Null

//TODO: Be sure to test later
            // If the attacking piece is NorthWest of the King // TODO: make sure this isn't flipped based on the distance variable
            if (distance.row = 0 && distance.row < 8 && distance.column > 0 && distance.column < 8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is SouthEast of the king.")
                direction = Directions.Southeast
            }
            //West
            else if (distance.row === 0 && distance.column >= 0 && distance.column < 8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is East of the king.") 
                direction = Directions.East
            } //SouthWest

            else if (distance.row < 0 && distance.row > -8 && distance.column > 0 && distance.column < 8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is NorthEast of the king.")
                direction = Directions.Northeast
            }

            else if (distance.row < 0 && distance.row > -8 && distance.column === 0) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is North of the king")  
                direction = Directions.North
            } 

            else if (distance.row < 0 && distance.row > -8 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is NorthWest of the king.")
                direction = Directions.Northwest
            }

            else if (distance.row === 0 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is West") 
                direction = Directions.West
            }

            else if (distance.row > 0 && distance.row < 8 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is SouthWest of the king.")
                direction = Directions.Southwest
            }

            else if (distance.row < 0 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is South of King.")
                direction = Directions.South
            }

            if (this.debug && !this.hideOutput)
                console.log(`Attacker is from ${direction.toString()}`)
            // Return false if there is a block that prevents checkmate.
            if (this.checkForBlockableSquares(kingLocation, direction) === false) {
                return false
            }
        }

        // C - Capture
        if (this.debug && !this.hideOutput)
            console.log("---------Checking for capture-------------")

        let resultt = this.squareIsSafeForKing(moveResult.movedPieceDest, (this.getTurn() === StandardTurns.white) ? StandardTurns.black : StandardTurns.white,
                            this.gameType, this.debug)
        
        if (resultt === true) {
            // The piece can't be captured, thus checkmate.
            return true
        }

        return isCheckmate
    }
 
    // Iteratively check all the surrounding squares to see if a square is safe for the king
    squareIsSafeForKing(kingSquare: BoardLocation, color: StandardTurns, gameType: GameType, debug?: boolean): boolean {
        switch (gameType) {
            case GameType.standard:
                // Check Knight squares, Bishop squares, and Rook squares.
                let foo = this.squareIsSafeFromPiece(kingSquare, color, "Knight", debug)
                let bar = this.squareIsSafeFromPiece(kingSquare, color, "Bishop", debug)
                let que = this.squareIsSafeFromPiece(kingSquare, color, "Rook", debug)
                return (foo && bar && que)
            case GameType.bughouse:
                throw new Error("Variant 'Bughouse' is not yet implemented.")
            default:
                throw new Error("Game variant is not recognized.")
        }
    }

    getStatus(): GameStatus {
        let status = {
            gameOver: this.state.gameOver,
            turn: null,
            winner: (this.state.winner === StandardTurns.white) ? "white" : "black",
        } as GameStatus

        if (this.state.winner == null) {
            status.winner = null
        }

        return status
    }

    resign() {
        if (!this.hideOutput)
            console.log("GAME OVER")
        this.state.gameOver = true
        this.state.winner = this.getTurn()  // The turn hasn't updated yet.
    }

    // NOTE: function is not designed for non-standard board sizes.
    private squareIsSafeFromPiece(kingSquare: BoardLocation, color: StandardTurns, pieceName: string, debug?: boolean): boolean {
        let pieceSymbolWhite: string
        let pieceSymbolBlack: string

        // TODO: The problem is that the bishops and rooks don't stop after they find a piece that is in the way.

        if (debug && !this.hideOutput) {
            console.log(kingSquare)
            console.log(color)
            console.log("pieceName: " + pieceName)
        }

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
            case "Pawn":
                if (color === StandardTurns.white) {
                    if ((kingSquare.row - 1) >= 0 && (kingSquare.column - 1) >= 0 && this.getBoardArray()[kingSquare.row - 1][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && this.getBoardArray()[kingSquare.row - 1][kingSquare.column + 1] === "p")
                        return true
                    else 
                        return false
                }
                else {
                    if ((kingSquare.row + 1) < 8 && (kingSquare.column - 1) >= 0 && this.getBoardArray()[kingSquare.row + 8][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && this.getBoardArray()[kingSquare.row + 1][kingSquare.column + 1] === "p")
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
                        if ((this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolWhite ||
                            this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolBlack ||
                            this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== "X") && 
                            pieceName !== "Knight" // Knights are allowed to jump
                            )
                            break

                        // If the correct piece appears, then the square is not safe.
                        if (color === StandardTurns.white && this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolWhite) {
                            return false
                        }
                        else if (color === StandardTurns.black && this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolBlack) {
                            return false
                        }
                    }
            }
        }

        return true
    }

    // Returns false if it's not checkmate because there is a possible block
    // returning true signals nothing definitive.
    private checkForBlockableSquares(kingLocation: BoardLocation, direction: Directions): boolean {
        let rowInc: number 
        let colInc: number

        switch (direction) {
            case Directions.East:
                rowInc = 0
                colInc = -1
                break
            case Directions.Northeast:
                rowInc = -1
                colInc = -1
                break
            case Directions.North:
                rowInc = -1
                colInc = 0
                break
            case Directions.Northwest:
                rowInc = -1
                colInc = 1
                break
            case Directions.West:
                rowInc = 0
                colInc = 1
                break
            case Directions.Southwest:
                rowInc = 1
                colInc = 1
                break
            case Directions.South:
                rowInc = 1
                colInc = 0
                break
            case Directions.Southeast:
                rowInc = 1
                colInc = -1
                break
            default:
                throw new Error("Directional error 1.")
        }

         // Check for open squares
         for (let i = 1; i < 8; i++) {
            // If found empty square
            if (this.getBoardArray()[kingLocation.row + rowInc][kingLocation.column + colInc] === "X") { 
                let tempLoc = {
                    row: kingLocation.row + i,
                    column: kingLocation.column + i
                } as BoardLocation
                // Check to see if a piece can block
                if (!this.squareIsSafeFromPiece(tempLoc, this.getTurn(), "Rook", false) ||
                    !this.squareIsSafeFromPiece(tempLoc, this.getTurn(), "Bishop", false) ||
                    !this.squareIsSafeFromPiece(tempLoc, this.getTurn(), "Knight", false))
                    return false // Not checkmate
            }

            // The attacker was found, no blocking possible
            else {
                if (this.debug && !this.hideOutput)
                    console.log("Blocking checkmate not possible.")
                break
            }

            switch (direction) {
                case Directions.East:
                    colInc--
                    break
                case Directions.Northeast:
                    rowInc--
                    colInc--
                    break
                case Directions.North:
                    rowInc--
                    break
                case Directions.Northwest:
                    rowInc--
                    colInc++
                    break
                case Directions.West:
                    colInc++
                    break
                case Directions.Southwest:
                    rowInc++
                    colInc++
                    break
                case Directions.South:
                    rowInc++
                    break
                case Directions.Southeast:
                    rowInc++
                    colInc--
                    break
                default:
                    throw new Error("Directional error 2.")
            }
        }
        return true
    }









}

 export default ChessState
//module.exports.ChessState = ChessState
exports.ChessState = ChessState;

//export { ChessState }

// module.exports = ChessState
//         return ChessState
//     }
// //@ts-ignore
//     if(typeof(window.ChessState) === 'undefined'){
// //@ts-ignore
//         window.ChessState = myLib()
//     }
// })(window)

// export default null