import BoardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import ExecuteTurn from './MoveProcessor'
import FenLogic from './FenLogic'
import State from './Interfaces/State'
import GameType from './Interfaces/Enums'

class ChessState {
    /* Properties */
    private debug: boolean;
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
                turn: "w",
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
            fenExtras: fenExtras
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
            if (this.gameType === constants.GameTypesEnum["standard"]) {
                console.log("   " + this.getTurn() + "'s turn")
            }

            else {
                Error("TODO: add for bughouse")
            }

            let move = ""
            while (!moveIsValid) {
                // 2. Get move from user
                move = HelperFunctions.getMove(this.testGame[this.state.turn]) // TODO: replace with some sort of prompt

                // 3. Check to see if move is valid
                moveIsValid = true // TODO: Implement
            }

            // 4. Execute move (pgn)
            ExecuteTurn(this, move)

            // Update History
            this.state.history.pgn.push(move)
            this.state.history.fen.push(FenLogic.BoardToFen(this.state.board, this.state.fenExtras))

            // 5. Check for end of game
            if (this.state.turn === this.testGame.length) {
                console.log("GAME OVER")
                this.state.gameOver = true // For testing purposes
                break
            }
            this.state.turn++

            if (this.debug === true)
                BoardPrinter.printBoardDebug(this, "b")
            else
                BoardPrinter.printBoard(this, "w")
            this.updateFenExtras()

            if (this.debug) {
                console.log(this.state.fenExtras)
            }
        }
    }

    // /* Gets the board only part of the games fen string. */
    // getModBoard() {
    //     let modedBoard = ""
    //     this.board.split().forEach(row => {
    //         modedBoard += row.split(" ")[0]
    //     })
    //     return modedBoard
    // }

    // TODO: check if this can be removed.
    getBoardArray() {
        return this.state.board
    }

    getTurn() {
        switch (this.gameType) {
            /* Standard */
            case 1:
                return this.state.fenExtras.turn
            default:
                Error("Error, variant not recognized")
                return "Error, variant not recognized" // Should never get here

        }
    }

    getFen() {
        Error("Not Yet Implemented")
    }

    /*
     * Update turn
     */
    updateFenExtras() {
        switch (this.gameType) {
            /* Standard */
            case 1:
                this.state.fenExtras.turn === "w" ?           // Toggle turn.
                    this.state.fenExtras.turn = "b" :
                    this.state.fenExtras.turn = "w"
                this.checkForCastling()                 // Update available castling.
                this.checkForEnPassant()                // Update available En Passant.
                this.state.fenExtras.halfMoves++;             // Increment number of half moves.
                if (this.state.fenExtras.halfMoves === 2) {   // Check to increment full moves.
                    this.state.fenExtras.halfMoves = 0
                    this.state.fenExtras.fullMoves++
                }
                break
            default:
                Error("Variant Not Yet Implemented")
        }
        Error("Not Yet Implemented")
    }

    checkForCastling() {
        console.log("checkForCastling Not Yet Implemented")
    }
    checkForEnPassant() {
        console.log("checkForEnPassant Not Yet Implemented")
    }
}

export default ChessState