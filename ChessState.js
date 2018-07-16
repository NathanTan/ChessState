import boardPrinter from './boardPrinter'
import constants from './constants'
import Errors from './Errors'

class ChessState {
    constructor(gameType) {
        this.gameType = constants.GameTypesEnum[gameType]
        // switch(gameType) {
        //     case "standard":
        //         this.gameType = constants.GameTypesEnum.standard
        // }
        //this.gameType = gameType


        this.board = constants.startingFen
    }

    // gameType = () => {
    //     return "    f"
    // }



}


let state = new ChessState("standard")

console.log("The start")
console.log(state.board)
console.log(state.gameType)

//boardPrinter.printBoard(state.board)
Errors.checkGameType(state)
