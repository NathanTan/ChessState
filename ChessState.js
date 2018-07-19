import boardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'

class ChessState {
    constructor(gameType) {
        this.gameType = constants.GameTypesEnum[gameType]
        this.board = constants.startingFen // Fen representation of the game
    }

    /* Gets the board only part of the games fen string. */
    getModBoard() {
        let modedBoard = ""
        this.board.split().forEach(row => {
            modedBoard += row.split(" ")[0]
        })
        return modedBoard
    }
}


let state = new ChessState("standard")

console.log("        ---Game Start---\n")


boardPrinter.printBoard(state)