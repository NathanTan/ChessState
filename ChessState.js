import boardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import TestGame from './PGNTestGame'
import ExecuteTurn from './MoveProcessor'
import FenLogic from './FenLogic'
import ExtraFenData from './models/ExtraFenData'

class ChessState {
    constructor(gameType) {
        console.log("In ChessState Constructor")
        this.debug = true

        this.gameType = constants.GameTypesEnum[gameType]
        this.history = { "fen": [constants.startingFen], "pgn": [""] } // History in pgn moves, or fen states
        this.gameOver = false
        this.turn = 0


        Errors.checkGameType(this)
        switch (this.gameType) {
            case constants.GameTypesEnum["standard"]:
                this.fenExtras = new ExtraFenData("w", "KQkq", "-", "0", "1")
                this.fenExtras = {
                    "turn": "w",
                    "castling": "KQkq",
                    "enPassant": "-",
                    "halfMoves": 0,
                    "fullMoves": 1
                }
                this.board = FenLogic.FenToBoard(constants.startingFen) // Board as a 2d array of chars
            default:
                this.fenExtras = null
                this.board = null
        }
        console.log("Here yo")
        console.log("fenExtras: " + JSON.stringify(this.fenExtras))
    }

    play() {
        let moveIsValid = false
        while (!this.gameOver) {

            // 1. Print Info
            if (this.gameType === constants.GameTypesEnum["standard"]) {
                console.log("   " + this.getTurn() + "'s turn")
            }

            else {
                Error("TODO: add for bughouse")
            }
            console.log("HEHEHRE")
            boardPrinter.printBoard(this)


            let move = ""
            while (!moveIsValid) {
                // 2. Get move
                move = HelperFunctions.getMove(TestGame[this.turn])

                // 3. Check to see if move is valid
                moveIsValid = true // TODO: Implement
            }

            // 4. Execute move
            ExecuteTurn(this, move)

            // Update History
            this.history.pgn.push(move)
            this.history.fen.push(this.board)

            // 5. Check for end of game
            if (this.turn < TestGame.length)
                this.gameOver = true // For testing purposes

            boardPrinter.printBoard(this)
            this.updateFenExtras()
        }
    }

    /* Gets the board only part of the games fen string. */
    getModBoard() {
        let modedBoard = ""
        this.board.split().forEach(row => {
            modedBoard += row.split(" ")[0]
        })
        return modedBoard
    }

    getTurn() {
        console.log("Getting turn, ")
        switch (this.gameType) {
            /* Standard */
            case 1:
                console.log(this.fenExtras)
                return this.fenExtras.turn
            default:
                return "Error, variant not recognized" // Should never get here

        }
    }

    updateFenExtras() {
        Error("Not Yet Implemented")
    }
}

let state = new ChessState("standard")

console.log("        ---Game Start---\n")

state.play()