import boardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'

class ChessState {
    constructor(gameType) {
        this.gameType = constants.GameTypesEnum[gameType]
        this.board = constants.startingFen
    }
}


let state = new ChessState("standard")

console.log("The start")


boardPrinter.printBoard(state.board)
