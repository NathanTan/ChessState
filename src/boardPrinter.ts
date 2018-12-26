/* boardPrinter.js */
import HelperFunctions from './HelperFunctions'
import ChessState from './ChessState';

class boardPrinter {

    /* Prints a ascii board based on a standard fen string */
    static printBoard(state: ChessState, prospective: string) {
        let boardString = "" // String for printing to the console.
        let board = state.getBoardArray()

        boardString += "---------------------------------\n"
        let boardForPrinting = null

        if (prospective === "w") {
            boardForPrinting = board
        }

        else if (prospective === "b") {
            boardForPrinting = board.reverse()
        }
        
        boardForPrinting.forEach(function (row) {
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

    /* Prints an ascii board based on game state for debugging */
    // NOTE: debug print is always from black's perspective
    static printBoardDebug(state: ChessState, prospective: string) {
        let boardString = "" // String for printing to the console.
        let board = state.getBoardArray()
        let firstRowOnUserFacingBoard = 8;

        boardString += "\n  ---------------------------------\n"

        board.forEach(function (row, i) {
            boardString += (firstRowOnUserFacingBoard.toString() + " " + i + " ")
            boardString += "|"
            firstRowOnUserFacingBoard--

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
        boardString += "      0   1   2   3   4   5   6   7\n"
        boardString += "      A   B   C   D   E   F   G   H\n"
        console.log(boardString)
    }
}

export default boardPrinter