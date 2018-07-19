/* boardPrinter.js */
import HelperFunctions from './HelperFunctions'

class boardPrinter {

    /* Prints a ascii board based on a standard fen string */
    static printBoard(state) {
        let board = ""
        let fenBoard = state.getModBoard().split("/")
        board += "---------------------------------\n"
        fenBoard.forEach(function (row) {
            board += "|"

            row.split("").forEach(function (piece) {
                // If a number is found, print that many spaces
                if (HelperFunctions.isNumeric(piece))
                    for (let i = 0; i < +piece; i++)
                        board += "   |"
                // Else print the piece letter
                else
                    board += " " + piece + " |"
            })
            board += "\n---------------------------------\n"
        })
        console.log(board)
    }

}

export default boardPrinter