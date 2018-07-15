import boardPrinter from './boardPrinter'
import constants from './constants'

class ChessState {
    constructor() {

        this.board = constants.startingFen
    }



}


let state = new ChessState()

console.log("The start")
console.log(state.board)