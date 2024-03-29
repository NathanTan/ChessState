/* boardPrinter.js */
import HelperFunctions from './HelperFunctions'
import ChessState from './ChessState';
import StandardTurns from './Interfaces/Enums/StandardTurns';

class BoardPrinter {

    /* Prints a ascii board based on a standard fen string */
    static printBoard(board: string[][], prospective: StandardTurns, hideOutput: boolean) {
        let boardString = "" // String for printing to the console.

        boardString += "---------------------------------\n"
        let boardForPrinting = null

        if (prospective === StandardTurns.white) {
            boardForPrinting = board
        }

        else if (prospective === StandardTurns.black) {
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
        if (!hideOutput)
            console.log(boardString)
        return boardString // For testing.
    }

    /* Prints an ascii board based on game state for debugging */
    // NOTE: debug print is always from black's perspective
    static printBoardDebug(state: ChessState, hideOutput: boolean) {
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
        if (!hideOutput)
            console.log(boardString)
        return boardString // For testing.
    }

    static printBoardBughouse(board0: string[][], board1: string[][], hands: string[][], prospective: StandardTurns, hideOutput: boolean) {
        let boardString = "" // String for printing to the console.
        const spaceBetweenBoards = `       `
        const rowDividers = `---------------------------------`
        let players = (prospective === StandardTurns.white) ? 
                        [0, 1, 2, 3] : [1, 0, 3, 2]

        boardString += `\t\tPlayer ${players[0]}                                Player ${players[2]}\n`
        boardString += `\t\t${JSON.stringify(hands[players[0]])}\t\t\t\t\t${JSON.stringify(hands[players[2]])}\n`

        boardString += `\n${rowDividers}${spaceBetweenBoards}${rowDividers}\n`
        let boardForPrinting = null
        let boardForPrinting2 = null

        if (prospective === StandardTurns.white) {
            boardForPrinting = board0
            // #javaScriptSafe
            boardForPrinting2 = JSON.parse(JSON.stringify(board1)).reverse()
        }

        else if (prospective === StandardTurns.black) {
            // #javaScriptSafe
            boardForPrinting = JSON.parse(JSON.stringify(board0)).reverse()
            boardForPrinting2 = board1
        }

        let count = 0; // For accessing second board.
        
        boardForPrinting.forEach(function (row) {
            boardString += "|"

            row.forEach(function (piece) {
                // If a number is found, print that many spaces.
                if (HelperFunctions.isNumeric(piece))
                    for (let i = 0; i < +piece; i++)
                        boardString += "   |"
                else if (piece === "X") // Value used for blanck space.
                    boardString += "   |"

                // Else print the piece letter
                else
                    boardString += " " + piece + " |"
            })

            // Just a bit of space between the boards.
            boardString += `${spaceBetweenBoards}|`

            boardForPrinting2[count].forEach(function (piece) {
                // If a number is found, print that many spaces.
                if (HelperFunctions.isNumeric(piece))
                    for (let i = 0; i < +piece; i++)
                        boardString += "   |"
                else if (piece === "X") // Value used for blanck space.
                    boardString += "   |"

                // Else, print the piece letter.
                else
                    boardString += " " + piece + " |"
            })
            count++
            boardString += `\n${rowDividers}${spaceBetweenBoards}${rowDividers}\n`
        })

        boardString += `\n\t\tPlayer ${players[1]}                                Player ${players[3]}\n`
        boardString += `\t\t${JSON.stringify(hands[players[1]])}\t\t\t\t\t${JSON.stringify(hands[players[3]])}\n\n\n`

        if (!hideOutput)
            console.log(boardString)
        return boardString // For testing.
    }
}

export default BoardPrinter