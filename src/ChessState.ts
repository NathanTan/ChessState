import BoardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import ExecuteTurn from './MoveProcessor'
import FenLogic from './FenLogic'
import State from './Interfaces/State'
import GameType from './Interfaces/Enums/GameTypes'
import StandardTurns from './Interfaces/Enums/StandardTurns';
import MoveResult from './Interfaces/MoveResult';
import BoardLoaction from './Interfaces/BoardLocation';

class ChessState {
    /* Properties */
    public debug: boolean;
    private testGame: any;  // Object holding pre-set game moves for testing.
                            // TODO: move this out to testing.
    private gameType: GameType;
    private state: State;


    /*
    * Params:
    *      - [OPTIONAL] game variant type
    *      - [OPTIONAL] starting fen position
    *      - [OPTIONAL] flag for debugging printing
    *      - [TESTING] game for testing (as array of pgns)
    * Returns: A new 2d array with 1 piece in a different place
    */
    constructor(gameType: GameType, fen: string, debug: boolean, testGame: any) {
        this.debug = debug;
        this.testGame = testGame;
        this.gameType = gameType;
        let fenExtras;

        // Check for provided fen.
        if (fen == null) {
            // No provided fen string means a default start.
            fen = constants.startingFen;
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
            board: FenLogic.FenToBoard(fen),
            history: {
                fen: [fen],
                pgn: []
            },
            gameOver: false,    // TODO: check initalizing with a game over fen
            turn: 0,
            fenExtras: fenExtras,
            whiteKingLocation: null,
            blackKingLocation: null
        }

        Errors.checkGameType(this)
        if (this.debug) {
            console.log("Game type: ")
            console.log(this.gameType.toString())
            console.log("Standard game type")
            console.log(GameType.standard)
            console.log("fenExtras: " + JSON.stringify(this.state.fenExtras))
            console.log("GameState initalized\n")
        }
        BoardPrinter.printBoard(this, "w")
    }

    play() {
        while (!this.state.gameOver) {
            let moveIsValid = false
            if (this.debug)
                console.log("/////////////////////// Turn " + this.state.turn + " ///////////////////////")

            // 1. Print Info
            if (this.gameType === GameType.standard) {
                console.log("   " + this.getTurn() + "'s turn")
            }

            else {
                Error("TODO: add for bughouse")
            }

            let move = ""
            while (!moveIsValid) {
                // 2. Get move from user as a pgn
                move = HelperFunctions.getMove(this.testGame[this.state.turn]) // TODO: replace with some sort of prompt

                // 3. Check to see if move is valid
                moveIsValid = true // TODO: Implement for pgns
            }

            // 4. Execute move (pgn)
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


            // 5. Check for end of game
            if (this.state.turn === this.testGame.length -1 ) {
                console.log("GAME OVER")
                this.state.gameOver = true // For testing purposes
                break
            }

            if (this.debug) {
                console.log(this.state.fenExtras)
            }
        }
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

    getFen() {
        Error("Not Yet Implemented")
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

    checkForCheckmate() {
        let isCheckmate = false
        // Find the location of the king.
        let kingLocation = (this.getTurn() === StandardTurns.white) ? this.state.whiteKingLocation : this.state.blackKingLocation

        // TODO: add method for searching for king if non-starting fen is provided.
        let i, j = 0
        let kingPiece = (this.getTurn() === StandardTurns.white) ? "K" : "k"






        // A - Avoid
        // Check all the imidiately adjacent and diagonal squares of the king's location.

        // B - Block
        // C - Capture
    }

 
    squareIsSafeForKing(kingSquare: BoardLoaction, color: StandardTurns): boolean {
        // Check the knight squares
        constants.PieceLogic[constants["PiecePGNToName"]["Knight"]].forEach((attackerSquare) => {
            // If the square is within bounds
            if (attackerSquare.column + kingSquare.column < 8 &&
                attackerSquare.column + kingSquare.column >= 0 &&
                attackerSquare.row + kingSquare.row < 8 &&
                attackerSquare.row + kingSquare.row >= 0) {
                    if (color === StandardTurns.white && this.state.board[attackerSquare.row][attackerSquare.column] === "k") {
                        return false
                    }
                    else if (color === StandardTurns.black && this.state.board[attackerSquare.row][attackerSquare.column] === "K") {
                        return false
                    }
                }
        })

        // Check rook squares
        constants.PieceLogic[constants["PiecePGNToName"]["Rook"]].forEach((attackerSquare) => {
            // If the square is within bounds
            if (attackerSquare.column + kingSquare.column < 8 &&
                attackerSquare.column + kingSquare.column >= 0 &&
                attackerSquare.row + kingSquare.row < 8 &&
                attackerSquare.row + kingSquare.row >= 0) {
                    if (color === StandardTurns.white && this.state.board[attackerSquare.row][attackerSquare.column] === "k") {
                        return false
                    }
                    else if (color === StandardTurns.black && this.state.board[attackerSquare.row][attackerSquare.column] === "K") {
                        return false
                    }
                }
        })

        // Check the rook squares

        return true
    }
}

export default ChessState