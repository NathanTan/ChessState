import boardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import TestGame from './PGNTestGame'

class ChessState {
    constructor(gameType) {
        this.gameType = constants.GameTypesEnum[gameType]
        this.board = constants.startingFen // Fen representation of the game
        this.history = "" // History in pgn moves, or fen states
        this.gameOver = false
        this.turn = 0
    }

    play() {
        while (!this.gameOver) {

            // 1. Print Info
            if (this.gameType === constants.GameTypesEnum["standard"]) {
                console.log("   " + this.getTurn() + "'s turn")
            }

            else {
                console.log("TODO: add for bughouse")
            }
            boardPrinter.printBoard(this)

            // 2. Get move
            let move = HelperFunctions.getMove(TestGame[this.turn])
            console.log("Move entered: " + move)

            // 3. Check to see if move is valid

            // 4. Execute move
            if (this.turn < TestGame.length)
                this.gameOver = true

            boardPrinter.printBoard(this)
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
        switch (this.gameType) {
            /* Standard */
            case 1:
                return this.board.split("/")[7].split(" ")[1]
            default:
                return "Error, variant not recognized" // Should never get here

        }
    }
}

let state = new ChessState("standard")

console.log("        ---Game Start---\n")

state.play()