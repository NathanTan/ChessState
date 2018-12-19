/* boardPrinter.js */
import HelperFunctions from './HelperFunctions';
var boardPrinter = (function () {
    function boardPrinter() {
    }
    /* Prints a ascii board based on a standard fen string */
    boardPrinter.printBoard = function (state, prospective) {
        var boardString = ""; // String for printing to the console.
        var board = state.getBoardArray();
        boardString += "---------------------------------\n";
        var boardForPrinting = null;
        if (prospective === "w") {
            boardForPrinting = board;
        }
        else if (prospective === "b") {
            boardForPrinting = board.reverse();
        }
        boardForPrinting.forEach(function (row) {
            boardString += "|";
            row.forEach(function (piece) {
                // If a number is found, print that many spaces
                if (HelperFunctions.isNumeric(piece))
                    for (var i = 0; i < +piece; i++)
                        boardString += "   |";
                else if (piece === "X")
                    boardString += "   |";
                else
                    boardString += " " + piece + " |";
            });
            boardString += "\n---------------------------------\n";
        });
        console.log(boardString);
    };
    /* Prints an ascii board based on game state for debugging */
    // NOTE: debug print is always from black's perspective
    boardPrinter.printBoardDebug = function (state, prospective) {
        var boardString = ""; // String for printing to the console.
        var board = state.getBoardArray();
        boardString += "\n  ---------------------------------\n";
        board.forEach(function (row, i) {
            boardString += (i + " ");
            boardString += "|";
            row.forEach(function (piece) {
                // If a number is found, print that many spaces
                if (HelperFunctions.isNumeric(piece))
                    for (var i_1 = 0; i_1 < +piece; i_1++)
                        boardString += "   |";
                else if (piece === "X")
                    boardString += "   |";
                else
                    boardString += " " + piece + " |";
            });
            boardString += "\n  ---------------------------------\n";
        });
        boardString += "    A   B   C   D   E   F   G   H\n";
        console.log(boardString);
    };
    return boardPrinter;
}());
export default boardPrinter;
