import BoardPrinter from './boardPrinter';
import constants from './constants';
import Errors from './Errors';
import HelperFunctions from '../HelperFunctions';
import ExecuteTurn from '../MoveProcessor';
import FenLogic from './FenLogic';
import ExtraFenData from '../models/ExtraFenData';
var ChessState = (function () {
    /*
    * Params:
    *      - [OPTIONAL] game variant type
    *      - [OPTIONAL] starting fen position
    *      - [OPTIONAL] flag for debugging printing
    *      - [TESTING] game for testing (as array of pgns)
    * Returns: A new 2d array with 1 piece in a different place
    */
    function ChessState(gameType, fen, debug, testGame) {
        this.debug = debug;
        this.testGame = testGame;
        if (fen != null) {
            this.fen = FenLogic.FenToBoard(fen);
        }
        this.gameType = constants.GameTypesEnum[gameType];
        this.history = { "fen": [constants.startingFen], "pgn": [""] }; // History in pgn moves, or fen states
        this.gameOver = false;
        this.turn = 0;
        Errors.checkGameType(this);
        switch (this.gameType) {
            case constants.GameTypesEnum["standard"]:
                this.fenExtras = new ExtraFenData("w", "KQkq", "-", "0", "1");
                this.fenExtras = {
                    "turn": "w",
                    "castling": "KQkq",
                    "enPassant": "-",
                    "halfMoves": 0,
                    "fullMoves": 1
                };
                if (this.fen == null)
                    this.board = FenLogic.FenToBoard(constants.startingFen); // Board as a 2d array of chars
                break;
            default:
                this.fenExtras = null;
                this.board = null;
                if (this.debug) {
                    console.log("Game type: ");
                    console.log(this.gameType);
                    console.log("Standard game type");
                    console.log(constants.GameTypesEnum["standard"]);
                }
        }
        if (this.debug) {
            console.log("fenExtras: " + JSON.stringify(this.fenExtras));
            console.log("GameState initalized\n");
        }
        BoardPrinter.printBoard(this, "w");
    }
    ChessState.prototype.play = function () {
        while (!this.gameOver) {
            var moveIsValid = false;
            if (this.debug)
                console.log("/////////////////////// Turn " + this.turn + " ///////////////////////");
            // 1. Print Info
            if (this.gameType === constants.GameTypesEnum["standard"]) {
                console.log("   " + this.getTurn() + "'s turn");
            }
            else {
                Error("TODO: add for bughouse");
            }
            var move = "";
            while (!moveIsValid) {
                // 2. Get move from user
                move = HelperFunctions.getMove(this.testGame[this.turn]); // TODO: replace with some sort of prompt
                // 3. Check to see if move is valid
                moveIsValid = true; // TODO: Implement
            }
            // 4. Execute move (pgn)
            ExecuteTurn(this, move);
            // Update History
            this.history.pgn.push(move);
            this.history.fen.push(this.board);
            // 5. Check for end of game
            if (this.turn === this.testGame.length) {
                console.log("GAME OVER");
                this.gameOver = true; // For testing purposes
                break;
            }
            this.turn++;
            if (this.debug === true)
                BoardPrinter.printBoardDebug(this, "b");
            else
                BoardPrinter.printBoard(this);
            this.updateFenExtras();
            if (this.debug) {
                console.log(this.fenExtras);
            }
        }
    };
    /* Gets the board only part of the games fen string. */
    ChessState.prototype.getModBoard = function () {
        var modedBoard = "";
        this.board.split().forEach(function (row) {
            modedBoard += row.split(" ")[0];
        });
        return modedBoard;
    };
    ChessState.prototype.getBoardArray = function () {
        return this.board;
    };
    ChessState.prototype.getTurn = function () {
        switch (this.gameType) {
            /* Standard */
            case 1:
                return this.fenExtras.turn;
            default:
                Error("Error, variant not recognized");
                return "Error, variant not recognized"; // Should never get here
        }
    };
    ChessState.prototype.getFen = function () {
        Error("Not Yet Implemented");
    };
    /*
     * Update turn
     */
    ChessState.prototype.updateFenExtras = function () {
        switch (this.gameType) {
            /* Standard */
            case 1:
                this.fenExtras.turn === "w" ?
                    this.fenExtras.turn = "b" :
                    this.fenExtras.turn = "w";
                this.checkForCastling(); // Update available castling.
                this.checkForEnPassant(); // Update available En Passant.
                this.fenExtras.halfMoves++; // Increment number of half moves.
                if (this.fenExtras.halfMoves === 2) {
                    this.fenExtras.halfMoves = 0;
                    this.fenExtras.fullMoves++;
                }
                break;
            default:
                Error("Variant Not Yet Implemented");
        }
        Error("Not Yet Implemented");
    };
    ChessState.prototype.checkForCastling = function () {
        console.log("checkForCastling Not Yet Implemented");
    };
    ChessState.prototype.checkForEnPassant = function () {
        console.log("checkForEnPassant Not Yet Implemented");
    };
    return ChessState;
}());
export default ChessState;
