import boardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import TestGame from './PGNTestGame'
import ExecuteTurn from './MoveProcessor'

class ChessState {
    constructor(gameType) {
        this.gameType = constants.GameTypesEnum[gameType]
        this.board = constants.startingFen // Fen representation of the game
        this.history = {"fen": [constants.startingFen], "pgn": [""]} // History in pgn moves, or fen states
        this.gameOver = false
        this.turn = 0

        Errors.checkGameType(this)
    }

    play() {
        let moveIsValid = false
        while (!this.gameOver) {

            // 1. Print Info
            if (this.gameType === constants.GameTypesEnum["standard"]) {
                console.log("   " + this.getTurn() + "'s turn")
            }

            else {
                console.log("TODO: add for bughouse")
            }
            boardPrinter.printBoard(this)


            let move = ""
            while (!moveIsValid) {
                // 2. Get move
                move = HelperFunctions.getMove(TestGame[this.turn])
                console.log("Move entered: " + move)
                
                // 3. Check to see if move is valid
                moveIsValid = true
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