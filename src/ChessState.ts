import BoardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import ExecuteTurn from './MoveProcessor'
import FenLogic from './FenLogic'
import State from './Interfaces/State'
import GameType from './Interfaces/Enums/GameTypes'
import StandardTurns from './Interfaces/Enums/StandardTurns'
import MoveResult from './Interfaces/MoveResult'
import BoardLoaction from './Interfaces/BoardLocation'
import Config from './Interfaces/Config'

class ChessState {
    /* Properties */
    public debug: boolean
    private testGame: any  // Object holding pre-set game moves for testing.
                            // TODO: move this out to testing.
    private gameType: GameType
    private state: State
    private hideOutput: boolean


    /*
    * Params:
    *      - [OPTIONAL] game variant type
    *      - [OPTIONAL] starting fen position
    *      - [OPTIONAL] flag for debugging printing
    *      - [TESTING] game for testing (as array of pgns)
    * Returns: A new 2d array with 1 piece in a different place
    */
    constructor(config: Config) {
        // TODO: validate config object
        
        this.debug = config.debug
        this.testGame = config.testGame
        this.gameType = config.gameType
        this.hideOutput = config.hideOutput
        let fenExtras;

        // Check for provided fen.
        if (config.fen == null) {
            // No provided fen string means a default start.
            config.fen = constants.startingFen;
            fenExtras = {
                turn: StandardTurns.white,
                castling: "KQkq",
                enPassant: "-",
                halfMoves: 0,
                fullMoves: 1
            }
        }

        // Initalize state.
        this.state = {
            board: FenLogic.FenToBoard(config.fen),
            history: {
                fen: [config.fen],
                pgn: []
            },
            gameOver: false,    // TODO: check initalizing with a game over fen
            turn: 0,
            fenExtras: fenExtras,
            whiteKingLocation: null,
            blackKingLocation: null
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
            BoardPrinter.printBoard(this, "w")
    }

    play() {
        while (!this.state.gameOver) {
            let moveIsValid = false
            if (this.debug)
                console.log("/////////////////////// Turn " + this.state.turn + " ///////////////////////")

            // 1. Print info.
            if (this.gameType === GameType.standard) {
                console.log("   " + this.getTurn() + "'s turn")
            }

            else {
                throw new Error("TODO: add for bughouse")
            }

            let move = ""
            while (!moveIsValid) {
                // 2. Get move from user as a pgn.
                move = HelperFunctions.getMove(this.testGame[this.state.turn]) // TODO: replace with some sort of prompt

                // 3. Check to see if move is valid.
                moveIsValid = true // TODO: Implement for pgns
            }

            // 4. Conduct the move.
            this.move(move)

            // 5. Check for end of game.
            this.checkForEndOfGame()
            if (this.state.turn === this.testGame.length -1 ) {
                if (!this.hideOutput)
                    console.log("GAME OVER")
                this.state.gameOver = true // For testing purposes
                break
            }

            if (this.debug) {
                console.log(this.state.fenExtras)
            }
        }
    }

    move(move: string) {
        // Execute move (pgn)
        let result = ExecuteTurn(this, move)

        // Update History
        this.state.history.pgn.push(move)
        this.state.history.fen.push(FenLogic.BoardToFen(this.state.board, this.state.fenExtras))
        
        this.state.turn++

        if (this.debug === true)
            BoardPrinter.printBoardDebug(this, "b")
        else
            BoardPrinter.printBoard(this, "w")
        this.updateFenExtras(result)
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

    getFen(debug?: boolean):string {
        return FenLogic.BoardToFen(this.state.board, this.state.fenExtras, debug)
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
                
                //this.checkForCastling()                 // Update available castling.
                this.checkForEnPassant()                // Update available En Passant.
                this.state.fenExtras.halfMoves++;             // Increment number of half moves.
                if (this.state.fenExtras.halfMoves === 2) {   // Check to increment full moves.
                    this.state.fenExtras.halfMoves = 0
                    this.state.fenExtras.fullMoves++
                }
                break
            default:
                throw new Error("Variant Not Yet Implemented")
        }
        //throw new Error("Not Yet Implemented")
    }

    checkForCastling() {
        console.log("checkForCastling Not Yet Implemented")
    }

    checkForEnPassant() {
        console.log("checkForEnPassant Not Yet Implemented")
    }

    checkForEndOfGame() {
        this.checkForCheckmate()
        //this.checkForStalemate() 
        // TODO: add resign functionality.
    }

    checkForCheckmate() {
        let isCheckmate = false
        // Find the location of the king.
        let kingLocation = (this.getTurn() === StandardTurns.white) ? this.state.whiteKingLocation : this.state.blackKingLocation

        // TODO: add method for searching for king if non-starting fen is provided.
        let i, j = 0
        let kingPiece = (this.getTurn() === StandardTurns.white) ? "K" : "k"






        // A - Avoid
        let foo: BoardLoaction = {
            row:    7,
            column: 3
        } 
        let bar = this.squareIsSafeForKing(foo, StandardTurns.black, GameType.standard)
        // Check all the imidiately adjacent and diagonal squares of the king's location.

        // B - Block
        // C - Capture
    }
 
    // Iteratively check all the surrounding squares to see if a square is safe for the king
    squareIsSafeForKing(kingSquare: BoardLoaction, color: StandardTurns, gameType: GameType, debug?: boolean): boolean {
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

    // NOTE: function is not designed for non-standard board sizes.
    private squareIsSafeFromPiece(kingSquare: BoardLoaction, color: StandardTurns, pieceName: string, debug?: boolean): boolean {
        let pieceSymbolWhite: string
        let pieceSymbolBlack: string

        // TODO: The problem is that the bishops and rooks don't stop after they find a piece that is in the way.

        if (debug && !this.hideOutput) {
            console.log(kingSquare)
            console.log(color)
            console.log("pieceName: " + pieceName)
        }

        let list: BoardLoaction[][] = []
        let sublist: BoardLoaction[] = []

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
}

export default ChessState