/* boardPrinter.js */
import HelperFunctions from './HelperFunctions'

class boardPrinter {

    /* Prints a ascii board based on a standard fen string */
    static printBoard(fenn) {
        let board = ""
        console.log(JSON.stringify(fenn))
        let fen = fenn.split("/")
        board += "-----------------"
        fen.forEach(function (row) {
            board += "|"

            row.split("").forEach(function (piece) {
                // If a number is found, print that many spaces
                if (HelperFunctions.isNumeric(piece))
                    for (let i = 0; i < +piece; i++)
                        board += " |"
                // Else print the piece letter
                else
                    board += piece + "|"
            })
            board += "\n-----------------"
        })
        console.log(board)
    }

}

export default boardPrinter