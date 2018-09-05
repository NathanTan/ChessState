/* boardPrinter.js */
import HelperFunctions from './HelperFunctions'

class boardPrinter {

    /* Prints a ascii board based on a standard fen string */
    static printBoard(state) {
        let boardString = "" // String for printing to the console.
        let board = state.getBoardArray()

        boardString += "---------------------------------\n"
        board.forEach(function (row) {
            boardString += "|"

            row.forEach(function (piece) {
                // If a number is found, print that many spaces
                if (HelperFunctions.isNumeric(piece))
                    for (let i = 0; i < +piece; i++)
                        boardString += "   |"
                else if (piece === "X") // Value used for blanck space
                    boardString += "   |"

                // Else print the piece letter
                else
                    boardString += " " + piece + " |"
            })
            boardString += "\n---------------------------------\n"
        })
        console.log(boardString)
    }

    static printBoardDebug(state) {
        let boardString = "" // String for printing to the console.
        let board = state.getBoardArray()

        boardString += "\n    A   B   C   D   E   F   G   H\n"

        boardString += "  ---------------------------------\n"

        board.forEach(function (row, i) {

            boardString += (i + " ")
            boardString += "|"

            row.forEach(function (piece) {
                // If a number is found, print that many spaces
                if (HelperFunctions.isNumeric(piece))
                    for (let i = 0; i < +piece; i++)
                        boardString += "   |"
                else if (piece === "X") // Value used for blanck space
                    boardString += "   |"

                // Else print the piece letter
                else
                    boardString += " " + piece + " |"
            })
            boardString += "\n  ---------------------------------\n"
        })
        console.log(boardString)
    }

}

export default boardPrinter