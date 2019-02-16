/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./lib/src/Interfaces/Enums/GameTypes.js
var GameTypes;
(function (GameTypes) {
    GameTypes[GameTypes["standard"] = 0] = "standard";
    GameTypes[GameTypes["bughouse"] = 1] = "bughouse";
    GameTypes[GameTypes["plunder"] = 2] = "plunder";
})(GameTypes || (GameTypes = {}));
/* harmony default export */ var Enums_GameTypes = (GameTypes);

// CONCATENATED MODULE: ./lib/src/HelperFunctions.js

/* Helper function */
var HelperFunctions_HelperFunctions = /** @class */ (function () {
    function HelperFunctions() {
    }
    HelperFunctions.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    // Has one optional parameter for testing
    HelperFunctions.getMove = function (opt) {
        if (opt) {
            return opt;
        }
    };
    /*
     * Parameters:
     *      - PGN move
     *      - Which plays turn it is
     *      - game type [OPTIONAL]
     */
    // Use this to find piece start locations
    HelperFunctions.findPieceDestination = function (pgn, turn, gameType, capture, hideOutput, debug) {
        var location = { "row": -1, "column": -1 };
        if (gameType != undefined && gameType !== Enums_GameTypes.standard) {
            console.log("gameType: ");
            console.log(gameType);
            throw new Error("pgnToGridCordinate is not yet implemented for " + gameType.toString() + " variant");
        }
        var pgnColumnIndex = 1;
        var pgnRowIndex = 2;
        if (capture) {
            pgnColumnIndex++;
            pgnRowIndex++;
        }
        // If not a pawn
        if (pgn[0] === "N" || pgn[0] === "B" ||
            pgn[0] === "R" || pgn[0] === "K" ||
            pgn[0] === "Q") {
            location.column = (pgn[pgnColumnIndex].charCodeAt(0) - 97);
            location.row = (8 - +pgn[pgnRowIndex]);
        }
        else {
            if (debug && !hideOutput)
                console.log("==pawn");
            if (!capture) {
                location.column = (pgn[0].charCodeAt(0) - 97);
                location.row = (8 - +pgn[1]);
            }
            else {
                location.column = (pgn[2].charCodeAt(0) - 97);
                location.row = (8 - +pgn[3]);
            }
        }
        return location;
    };
    return HelperFunctions;
}());
/* harmony default export */ var src_HelperFunctions = (HelperFunctions_HelperFunctions);

// CONCATENATED MODULE: ./lib/src/Interfaces/Enums/StandardTurns.js
var StandardTurns;
(function (StandardTurns) {
    StandardTurns[StandardTurns["white"] = 0] = "white";
    StandardTurns[StandardTurns["black"] = 1] = "black";
})(StandardTurns || (StandardTurns = {}));
/* harmony default export */ var Enums_StandardTurns = (StandardTurns);

// CONCATENATED MODULE: ./lib/src/BoardPrinter.js
/* boardPrinter.js */


var BoardPrinter_BoardPrinter = /** @class */ (function () {
    function BoardPrinter() {
    }
    /* Prints a ascii board based on a standard fen string */
    BoardPrinter.printBoard = function (state, prospective, hideOutput) {
        var boardString = ""; // String for printing to the console.
        var board = state.getBoardArray();
        boardString += "---------------------------------\n";
        var boardForPrinting = null;
        if (prospective === Enums_StandardTurns.white) {
            boardForPrinting = board;
        }
        else if (prospective === Enums_StandardTurns.black) {
            boardForPrinting = board.reverse();
        }
        boardForPrinting.forEach(function (row) {
            boardString += "|";
            row.forEach(function (piece) {
                // If a number is found, print that many spaces
                if (src_HelperFunctions.isNumeric(piece))
                    for (var i = 0; i < +piece; i++)
                        boardString += "   |";
                else if (piece === "X") // Value used for blanck space
                    boardString += "   |";
                // Else print the piece letter
                else
                    boardString += " " + piece + " |";
            });
            boardString += "\n---------------------------------\n";
        });
        if (!hideOutput)
            console.log(boardString);
        return boardString; // For testing.
    };
    /* Prints an ascii board based on game state for debugging */
    // NOTE: debug print is always from black's perspective
    BoardPrinter.printBoardDebug = function (state, hideOutput) {
        var boardString = ""; // String for printing to the console.
        var board = state.getBoardArray();
        var firstRowOnUserFacingBoard = 8;
        boardString += "\n  ---------------------------------\n";
        board.forEach(function (row, i) {
            boardString += (firstRowOnUserFacingBoard.toString() + " " + i + " ");
            boardString += "|";
            firstRowOnUserFacingBoard--;
            row.forEach(function (piece) {
                // If a number is found, print that many spaces
                if (src_HelperFunctions.isNumeric(piece))
                    for (var i_1 = 0; i_1 < +piece; i_1++)
                        boardString += "   |";
                else if (piece === "X") // Value used for blanck space
                    boardString += "   |";
                // Else print the piece letter
                else
                    boardString += " " + piece + " |";
            });
            boardString += "\n  ---------------------------------\n";
        });
        boardString += "      0   1   2   3   4   5   6   7\n";
        boardString += "      A   B   C   D   E   F   G   H\n";
        if (!hideOutput)
            console.log(boardString);
        return boardString; // For testing.
    };
    return BoardPrinter;
}());
/* harmony default export */ var src_BoardPrinter = (BoardPrinter_BoardPrinter);

// CONCATENATED MODULE: ./lib/src/constants.js

var constants = {
    /* Default config object */
    defaultConfig: {
        gameType: Enums_GameTypes.standard,
        fen: null,
        debug: false,
        hideOutput: true
    },
    /* Column constants */
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    /* Standard starting fen */
    "startingFen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    /* Only intended for standard games */
    "PieceLogic": {
        "Knight": [
            { "row": 2, "column": -1 },
            { "row": 2, "column": 1 },
            { "row": 1, "column": 2 },
            { "row": -1, "column": 2 },
            { "row": -2, "column": 1 },
            { "row": -2, "column": -1 },
            { "row": -1, "column": -2 },
            { "row": 1, "column": -2 },
        ],
        "Bishop": [
            { "row": -1, "column": -1 },
            { "row": -2, "column": -2 },
            { "row": -3, "column": -3 },
            { "row": -4, "column": -4 },
            { "row": -5, "column": -5 },
            { "row": -6, "column": -6 },
            { "row": -7, "column": -7 },
            { "row": 1, "column": -1 },
            { "row": 2, "column": -2 },
            { "row": 3, "column": -3 },
            { "row": 4, "column": -4 },
            { "row": 5, "column": -5 },
            { "row": 6, "column": -6 },
            { "row": 7, "column": -7 },
            { "row": -1, "column": 1 },
            { "row": -2, "column": 2 },
            { "row": -3, "column": 3 },
            { "row": -4, "column": 4 },
            { "row": -5, "column": 5 },
            { "row": -6, "column": 6 },
            { "row": -7, "column": 7 },
            { "row": 1, "column": 1 },
            { "row": 2, "column": 2 },
            { "row": 3, "column": 3 },
            { "row": 4, "column": 4 },
            { "row": 5, "column": 5 },
            { "row": 6, "column": 6 },
            { "row": 7, "column": 7 },
        ],
        "Rook": [
            { "row": 1, "column": 0 },
            { "row": 2, "column": 0 },
            { "row": 3, "column": 0 },
            { "row": 4, "column": 0 },
            { "row": 5, "column": 0 },
            { "row": 6, "column": 0 },
            { "row": 7, "column": 0 },
            { "row": -1, "column": 0 },
            { "row": -2, "column": 0 },
            { "row": -3, "column": 0 },
            { "row": -4, "column": 0 },
            { "row": -5, "column": 0 },
            { "row": -6, "column": 0 },
            { "row": -7, "column": 0 },
            { "row": 0, "column": 1 },
            { "row": 0, "column": 2 },
            { "row": 0, "column": 3 },
            { "row": 0, "column": 4 },
            { "row": 0, "column": 5 },
            { "row": 0, "column": 6 },
            { "row": 0, "column": 7 },
            { "row": 0, "column": -1 },
            { "row": 0, "column": -2 },
            { "row": 0, "column": -3 },
            { "row": 0, "column": -4 },
            { "row": 0, "column": -5 },
            { "row": 0, "column": -6 },
            { "row": 0, "column": -7 },
        ],
        "King": [
            { "row": -1, "column": -1 },
            { "row": -1, "column": 0 },
            { "row": -1, "column": 1 },
            { "row": 0, "column": 1 },
            { "row": 1, "column": 1 },
            { "row": 1, "column": 0 },
            { "row": 1, "column": -1 },
            { "row": 0, "column": -1 },
        ],
        "Queen": [
            { "row": -1, "column": -1 },
            { "row": -2, "column": -2 },
            { "row": -3, "column": -3 },
            { "row": -4, "column": -4 },
            { "row": -5, "column": -5 },
            { "row": -6, "column": -6 },
            { "row": -7, "column": -7 },
            { "row": -1, "column": 0 },
            { "row": -2, "column": 0 },
            { "row": -3, "column": 0 },
            { "row": -4, "column": 0 },
            { "row": -5, "column": 0 },
            { "row": -6, "column": 0 },
            { "row": -7, "column": 0 },
            { "row": -1, "column": 1 },
            { "row": -2, "column": 2 },
            { "row": -3, "column": 3 },
            { "row": -4, "column": 4 },
            { "row": -5, "column": 5 },
            { "row": -6, "column": 6 },
            { "row": -7, "column": 7 },
            { "row": 0, "column": 1 },
            { "row": 0, "column": 2 },
            { "row": 0, "column": 3 },
            { "row": 0, "column": 4 },
            { "row": 0, "column": 5 },
            { "row": 0, "column": 6 },
            { "row": 0, "column": 7 },
            { "row": 1, "column": 1 },
            { "row": 2, "column": 2 },
            { "row": 3, "column": 3 },
            { "row": 4, "column": 4 },
            { "row": 5, "column": 5 },
            { "row": 6, "column": 6 },
            { "row": 7, "column": 7 },
            { "row": 1, "column": 0 },
            { "row": 2, "column": 0 },
            { "row": 3, "column": 0 },
            { "row": 4, "column": 0 },
            { "row": 5, "column": 0 },
            { "row": 6, "column": 0 },
            { "row": 7, "column": 0 },
            { "row": 1, "column": -1 },
            { "row": 2, "column": -2 },
            { "row": 3, "column": -3 },
            { "row": 4, "column": -4 },
            { "row": 5, "column": -5 },
            { "row": 6, "column": -6 },
            { "row": 7, "column": -7 },
            { "row": 0, "column": -1 },
            { "row": 0, "column": -2 },
            { "row": 0, "column": -3 },
            { "row": 0, "column": -4 },
            { "row": 0, "column": -5 },
            { "row": 0, "column": -6 },
            { "row": 0, "column": -7 },
        ],
    },
    /* Only intended for standard games */
    "BoardWidth": 8,
    "BoardHeight": 8,
    "PiecePGNToName": {
        "p": "Pawn",
        "P": "Pawn",
        "n": "Knight",
        "N": "Knight",
        "b": "Bishop",
        "B": "Bishop",
        "r": "Rook",
        "R": "Rook",
        "q": "Queen",
        "Q": "Queen",
        "k": "King",
        "K": "King",
    },
    // NOTE: 0 is the enum value for white and 1 is for black from the StandardTurns file.
    "PieceNameToPGN": {
        "Pawn": {
            0: "P",
            1: "p"
        },
        "Knight": {
            0: "N",
            1: "n"
        },
        "Bishop": {
            0: "B",
            1: "b"
        },
        "Rook": {
            0: "R",
            1: "r"
        },
        "Queen": {
            0: "Q",
            1: "q"
        },
        "King": {
            0: "K",
            1: "k"
        }
    }
};
/* harmony default export */ var src_constants = (constants);

// CONCATENATED MODULE: ./lib/src/Errors.js
/* Errors.js */
var Errors = /** @class */ (function () {
    function Errors() {
    }
    // TODO: Update this.
    Errors.checkGameType = function (state) {
        if (typeof (state.gameType) === "undefined") {
            console.log("----------------------------------");
            console.log("-Error: Unrecognized variant type-");
            console.log("----------------------------------");
        }
        return null;
    };
    return Errors;
}());
/* harmony default export */ var src_Errors = (Errors);

// CONCATENATED MODULE: ./lib/src/Interfaces/Enums/PieceTypes.js
var PieceTypes;
(function (PieceTypes) {
    PieceTypes[PieceTypes["Pawn"] = 0] = "Pawn";
    PieceTypes[PieceTypes["Knight"] = 1] = "Knight";
    PieceTypes[PieceTypes["Bishop"] = 2] = "Bishop";
    PieceTypes[PieceTypes["Rook"] = 3] = "Rook";
    PieceTypes[PieceTypes["King"] = 4] = "King";
    PieceTypes[PieceTypes["Queen"] = 5] = "Queen";
})(PieceTypes || (PieceTypes = {}));
/* harmony default export */ var Enums_PieceTypes = (PieceTypes);

// CONCATENATED MODULE: ./lib/src/MoveProcessor.js





var ExecuteTurn = function (game, pgn, hideOutput, debug) {
    // During a castle, use for the king.
    var moveCord = {
        source: {
            column: -1,
            row: -1
        },
        dest: {
            column: -1,
            row: -1
        }
    };
    // Used for the rook during a castle.
    var moveCord2 = {
        source: {
            column: -1,
            row: -1
        },
        dest: {
            column: -1,
            row: -1
        }
    };
    if (pgn == null) {
        throw new Error("No pgn provided");
    }
    var result = {
        whiteKingSideCastle: false,
        whiteQueenSideCastle: false,
        blackKingSideCastle: false,
        blackQueenSideCastle: false,
        kingLocation: null,
        movedPiece: null,
        movedPieceDest: null,
        check: (pgn == null) ? null : (pgn.indexOf("+") !== -1),
        gameIsOver: false,
        moveIsInvalid: false,
        invalidMove: null,
        enableEnPassant: null,
        executeEnPassant: false
    };
    // TODO: Manually check for the king getting put in check
    var castle = false;
    if (pgn) {
        var capture = (pgn.indexOf("x") !== -1);
        if (game.debug && !hideOutput)
            console.log("PGN provided: " + pgn);
        // Determine the pgn move
        switch (pgn) {
            case "0-0": // King side castle
                //TODO: add validation
                // Check if castle is legal for the position.
                if ((game.getTurn() === Enums_StandardTurns.white &&
                    game.state.fenExtras.castling.indexOf("K") !== -1) ||
                    (game.getTurn() === Enums_StandardTurns.black &&
                        game.state.fenExtras.castling.indexOf("k") !== -1)) {
                    // Proceed
                    // Set move for king.
                    moveCord.dest = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 6
                    };
                    moveCord.source = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 4
                    };
                    // Set move for rook.
                    moveCord2.dest = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 5
                    };
                    moveCord2.source = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 7
                    };
                }
                else {
                    if (debug) {
                        console.log(game.getTurn().toString());
                        console.log(game.state.fenExtras.castling.indexOf("K") !== -1);
                    }
                    throw new Error("King side castling is not legal in the current state.");
                }
                if (game.getTurn() === Enums_StandardTurns.white) {
                    result.whiteKingSideCastle = true;
                }
                else if (game.getTurn() === Enums_StandardTurns.black) {
                    result.blackKingSideCastle = true;
                }
                castle = true;
                result.kingLocation = moveCord.dest; // Keep track of where the king lands for checking checkmate.
                break;
            case "0-0-0": //Queen side castle
                // Check if castle is legal.
                if ((game.getTurn() === Enums_StandardTurns.white &&
                    game.state.fenExtras.castling.indexOf("Q") !== -1) ||
                    (game.getTurn() === Enums_StandardTurns.black &&
                        game.state.fenExtras.castling.indexOf("q") !== -1)) {
                    // Proceed
                    // Set move for king.
                    moveCord.dest = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 2
                    };
                    moveCord.source = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 4
                    };
                    // Set move for rook.
                    moveCord2.dest = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 3
                    };
                    moveCord2.source = {
                        row: (game.getTurn() === Enums_StandardTurns.white) ? 7 : 0,
                        column: 0
                    };
                }
                else {
                    throw new Error("Queen side castling is not legal in the current state.");
                }
                if (game.getTurn() === Enums_StandardTurns.white) {
                    result.whiteQueenSideCastle = true;
                }
                else if (game.getTurn() === Enums_StandardTurns.black) {
                    result.blackQueenSideCastle = true;
                }
                castle = true;
                result.kingLocation = moveCord.dest; // Keep track of where the king lands for checking checkmate.
                break;
            default: // Normal move  
                var piece = void 0;
                switch (pgn[0]) {
                    case "N": // Knight move
                        piece = (game.getTurn() === Enums_StandardTurns.white) ? 'N' : 'n';
                        moveCord.dest = src_HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture, hideOutput, debug);
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput);
                        result.movedPiece = Enums_PieceTypes.Knight;
                        break;
                    case "B": // Bishop move
                        piece = (game.getTurn() === Enums_StandardTurns.white) ? 'B' : 'b';
                        moveCord.dest = src_HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture, hideOutput, debug);
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput);
                        result.movedPiece = Enums_PieceTypes.Bishop;
                        break;
                    case "R": // Rook move
                        piece = (game.getTurn() === Enums_StandardTurns.white) ? 'R' : 'r';
                        moveCord.dest = src_HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture, hideOutput, debug);
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput);
                        result.movedPiece = Enums_PieceTypes.Rook;
                        break;
                    case "Q": // Queen move
                        piece = (game.getTurn() === Enums_StandardTurns.white) ? 'Q' : 'q';
                        moveCord.dest = src_HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture, hideOutput, debug);
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput);
                        result.movedPiece = Enums_PieceTypes.Queen;
                        break;
                    case "K": // King move
                        piece = (game.getTurn() === Enums_StandardTurns.white) ? 'K' : 'k';
                        moveCord.dest = src_HelperFunctions.findPieceDestination(pgn, game.getTurn(), game.gameType, capture, hideOutput, debug);
                        moveCord.source = findPieceSource(game.state.board, pgn, piece, moveCord.dest, game.gameType, debug, hideOutput);
                        result.kingLocation = moveCord.dest; // Keep track of where the king lands for checking checkmate.
                        result.movedPiece = Enums_PieceTypes.King;
                        break;
                    default: // Pawn move
                        if (game.debug && !hideOutput)
                            console.log("==Pawn Move");
                        moveCord = pgnToCordPawn(game.state.board, pgn, game.getTurn(), game.gameType, hideOutput, debug);
                        result.movedPiece = Enums_PieceTypes.Pawn;
                        // Check to see if a pawn moved 2 spaces
                        if (moveCord.dest.row - moveCord.source.row === 2 ||
                            moveCord.dest.row - moveCord.source.row === -2) {
                            var rowDifference = (game.getTurn() === Enums_StandardTurns.white) ? 1 : -1;
                            result.enableEnPassant = "" + pgn[0] + Math.abs(-pgn[1] + rowDifference); // This should work but ought to be tested TODO:
                        }
                        if (moveCord.dest.column !== moveCord.source.column) {
                            result.executeEnPassant = true;
                        }
                    // TODO: deal with fen's en passant
                }
        }
        result.movedPieceDest = moveCord.dest;
        // TODO: move this function into the gameState such that only the game state can update the board.
        game.state.board = updateBoardByCord(game.state.board, moveCord, result.executeEnPassant, game.getTurn(), game.debug, hideOutput);
        if (castle)
            game.state.board = updateBoardByCord(game.state.board, moveCord2, false, null, game.debug, hideOutput);
    }
    else {
        throw new Error("Error: no pgn provided");
    }
    return result;
};
/* harmony default export */ var MoveProcessor = (ExecuteTurn);
/*
 * Params:
 *      - The board as a 2d array
 *      - an object holding the the source and destination of the move
 *      - [OPTIONAL] flag for debugging printing
 * Returns: A new 2d array with 1 piece in a different place
 */
var updateBoardByCord = function (board, moveCord, enPassant, turn, debug, hideOutput) {
    var newBoard = board;
    if (debug && !hideOutput) {
        console.log(JSON.stringify(moveCord));
        console.log("Executing move: ");
        console.log(board[moveCord.source.row][moveCord.source.column] + " -> "
            + board[moveCord.dest.row][moveCord.dest.column]);
    }
    newBoard[moveCord.dest.row][moveCord.dest.column] = board[moveCord.source.row][moveCord.source.column];
    newBoard[moveCord.source.row][moveCord.source.column] = "X";
    if (enPassant) {
        var rowDifference = (turn === Enums_StandardTurns.white) ? 1 : -1;
        newBoard[moveCord.dest.row + rowDifference][moveCord.dest.column] = "X";
    }
    return newBoard;
};
// Params: - Board as a 2d array
//         - Pgn move
//         - Players turn (w/b)
//         - Game variant type
// Done with pgn, returns cordinates of piece source and desination
// Note: Doesn't work with bug house when finind piece location
// Return: New moded board as a string
var pgnToCordPawn = function (board, pgn, turn, gameType, hideOutput, debug) {
    // console.log(`DEBUG: ${debug}`)
    // console.log(`hideOutput: ${hideOutput}`)
    if (debug && !hideOutput) {
        console.log("~~~pgnToCordPawn");
        console.log("turn: " + Enums_StandardTurns[turn]);
        console.log("pgn: " + pgn);
    }
    var moveObj = {
        source: {
            column: -1,
            row: -1
        },
        dest: {
            column: -1,
            row: -1
        }
    };
    var capture = (pgn.indexOf("x") !== -1);
    var piece = "";
    switch (gameType) {
        case Enums_GameTypes.standard:
            if (turn === Enums_StandardTurns.black) {
                piece = "p";
            }
            else {
                piece = "P";
            }
            break;
        default:
            throw new Error("Game variant '" + gameType + "' not yet implemented.");
    }
    moveObj.dest = src_HelperFunctions.findPieceDestination(pgn, turn, gameType, capture, hideOutput, debug);
    if (piece === "p" || piece === "P")
        moveObj.source = getPieceLocation(board, pgn, piece, gameType, hideOutput);
    else {
        moveObj.source = findPieceSource(board, pgn, piece, moveObj.dest, gameType, debug, hideOutput);
    }
    if (debug && !hideOutput) {
        console.log("Piece's location");
        console.log("(" + moveObj.source.column + "," + moveObj.source.row + ")");
        console.log("Piece's Destination");
        console.log("(" + moveObj.dest.column + "," + moveObj.dest.row + ")");
    }
    return moveObj;
};
/*
 * Parameters:
 *      - Row to insert piece in                as an array
 *      - Piece to place in row                 as a string
 *      - Column that the piece should go in    as a number\?
 * Returns: A row with the piece inserted       as an array
 */
var placePieceInRow = function (row, piece, col) {
    var newRow = [];
    var leftNumber = 0;
    var rightNumber = 0;
    var numberOfPiece = 0;
    if (row === "8") {
        for (var i = 0; i < 8; i++) {
            if (i < col) {
                leftNumber++;
            }
            else if (i > col) {
                rightNumber++;
            }
        }
        newRow.push(leftNumber);
        newRow.push(piece);
        newRow.push(rightNumber);
        //     if (i < col) {
        //         leftNumber++
        //     }
        // if (i 　>= col) {
        //     right
        // }
        //console.log("NEW ROW: " + newRow)
    }
    return newRow;
    //Error("No yet implemented")
};
/*
 * Parameters:
 *      - board as 2d array
 *      - PGN move
 *      - Piece to find
 *      - game type [OPTIONAL]F
 */
// TODO: Deal with situtation where there are 2 pieces in the same column that can move to the same square.
var getPieceLocation = function (board, pgn, piece, gameType, hideOutput, debug) {
    // Get loc
    if (debug && !hideOutput) {
        console.log("getPieceLocation~");
        console.log("piece: " + piece);
    }
    var col = null;
    var possibleCol = [];
    var possibleCords = [];
    // If pawn
    if (piece === "p" || piece === "P") {
        col = getPGNDropColumn(pgn);
        if (debug && !hideOutput)
            console.log("col: " + col + " pgn: " + pgn);
    }
    else {
        // TODO: remove everything in this condition.
        // TODO: add validation to make sure the user didn't input correctly
        // Only one piece that can go to the dest square
        if (pgn.length === 3) {
            var b = { column: -1, row: -1 };
            b.column = charToColumnNumber(pgn[1]);
            //b.column
            b.row = 8 - +pgn[2];
        }
        // Two pieces (in standard) can land on the dest square
        else if (pgn.length === 4) {
        }
        else {
            throw new Error("Something's wrong in the neighborhood. Who you gonna call???");
        }
        col = getPGNDropColumn(pgn);
        var pieceSource = null;
        pieceSource.column = +col;
        pieceSource.row = -1;
    }
    var piecesInCol = [];
    board.forEach(function (row) {
        piecesInCol.push(row[col]);
    });
    var locatedPieceRow = -1;
    var index = 0;
    if (gameType == undefined || gameType === Enums_GameTypes.standard) {
        piecesInCol.forEach(function (p) {
            if (debug && !hideOutput)
                console.log("p: " + p);
            if (p === piece) {
                locatedPieceRow = index;
            }
            index++;
        });
    }
    else {
        throw new Error("ERROR: TODO: Implement for non-standard game variants");
    }
    return {
        "column": col,
        "row": locatedPieceRow
    };
};
var findPieceSource = function (board, pgn, piece, dest, gameType, debug, hideOutput) {
    switch (gameType) {
        case Enums_GameTypes.standard:
            var possibleSources_1 = [];
            // Find all possible sources on the map for the provided piece.
            src_constants.PieceLogic[src_constants["PiecePGNToName"][piece]].forEach(function (square) {
                if (square.column + dest.column < 8 &&
                    square.column + dest.column >= 0 &&
                    square.row + dest.row < 8 &&
                    square.row + dest.row >= 0)
                    possibleSources_1.push({
                        column: square.column + dest.column,
                        row: square.row + dest.row
                    });
            });
            var ans_2 = [];
            // console.log("piece: " + piece)
            // console.log("Dest: " + JSON.stringify(dest))
            // Find which of the possible sources is the real source
            // Special logic for Rooks
            if (piece === "R" || piece === "r") {
                possibleSources_1.forEach(function (possibleSource) {
                    //console.log(board[possibleSource.row][possibleSource.column])
                    if (board[possibleSource.row][possibleSource.column] === piece) {
                        ans_2.push(possibleSource);
                    }
                });
                // Once we have the two possible locations, check the squares between
                // the possible location and the destination square for other pieces.
                for (var _i = 0, ans_1 = ans_2; _i < ans_1.length; _i++) { // TODO: add lots of unit testing here and check for moving rooks in columns
                    var possibleSource = ans_1[_i];
                    var row = possibleSource.row;
                    var offset = 1;
                    for (var i = 0; i < src_constants.BoardWidth; i++) {
                        var col1 = possibleSource.column + offset;
                        var col2 = possibleSource.column - offset;
                        if (board[row][col1] !== undefined && board[row][col1] !== "X") {
                            break; // This is not the one
                        }
                        else if (board[row][col1] !== undefined && board[row][col2] !== "X") {
                            break; // This is not the one
                        }
                        else if ((col1 === dest.column && row === dest.row) ||
                            (col2 === dest.column && row === dest.row)) {
                            // this is the one
                            return possibleSource;
                        }
                        offset++;
                    }
                }
            }
            // Normal rules
            else {
                possibleSources_1.forEach(function (possibleSource) {
                    //console.log(board[possibleSource.row][possibleSource.column])
                    if (board[possibleSource.row][possibleSource.column] === piece) {
                        ans_2.push(possibleSource);
                    }
                });
            }
            // Complex senario
            if (ans_2.length !== 1) {
                var answer_1;
                var count_1 = 0;
                // If there is an extra character in the pgn and it's a letter, thus representing the source column, use that column
                if (pgn.length === 4 && !src_HelperFunctions.isNumeric(pgn[1])) {
                    ans_2.forEach(function (possibleSource) {
                        if (possibleSource.column === charToColumnNumber(pgn[1])) {
                            count_1++;
                            // console.log(possibleSource)
                            answer_1 = possibleSource;
                        }
                    });
                }
                // If there is an extra character in the pgn and it's a number, thus representing the source row, use that row
                else if (pgn.length === 4 && src_HelperFunctions.isNumeric(pgn[1])) {
                    ans_2.forEach(function (possibleSource) {
                        // TODO: unit test this
                        if (possibleSource.row === +pgn[1]) {
                            count_1++;
                            answer_1 = possibleSource;
                            //console.log(possibleSource)
                        }
                    });
                }
                // Just a little bit of error checking 
                if (count_1 <= 0)
                    throw new Error("No piece found capabile of moving to the destination.");
                if (count_1 !== 1)
                    throw new Error("Something went wrong and too many possible piece sources were for this move");
                return answer_1;
            }
            else {
                if (!hideOutput) {
                    console.log(ans_2[0]);
                }
                return ans_2[0];
            }
            //}
            break;
        default:
            throw new Error("Game type " + gameType + " not yet implemented.");
    }
};
/*
 * Parameters:
 *    - pgn notation
 * Returns:
 *    Numeric mapped value corresponding to the letter column of the board
 */
var getPGNDropColumn = function (pgn) {
    // If the first letter of the pgn is upper case, then it is the piece that is moving.
    if (pgn[0] === pgn[0].toUpperCase()) { //Check if is upper case
        // If capture
        if (pgn[1] === "x") {
            return pgn[2].charCodeAt(0) - 97; // Return column as a number ( 'a' mapped to 0)
        }
        // No capture
        else {
            return pgn[1].charCodeAt(0) - 97; // Return column as a number ( 'a' mapped to 0)
        }
    }
    else {
        return pgn[0].charCodeAt(0) - 97; // Return column as a number ( 'a' mapped to 0)
    }
};
var charToColumnNumber = function (char) {
    return char[0].charCodeAt(0) - 97;
};
var testMethod = function () {
    return 1;
};

// CONCATENATED MODULE: ./lib/src/FenLogic.js


// Turns a fen string into a 2d array representation of a board
var FenLogic_FenLogic = /** @class */ (function () {
    function FenLogic() {
    }
    FenLogic.FenToBoard = function (fen) {
        if (fen != null) {
            // TODO: Add fen validation
            var board_1 = Array();
            fen.split("/").forEach(function (row) {
                var rowArr = Array();
                var j = 0;
                row.split("").forEach(function (piece) {
                    if (j < 8) {
                        if (src_HelperFunctions.isNumeric(piece)) {
                            for (var i = 0; i < Number(piece); i++) {
                                rowArr.push("X");
                            }
                        }
                        else {
                            rowArr.push(piece);
                        }
                    }
                    j++;
                });
                board_1.push(rowArr);
            });
            return board_1;
        }
        throw new Error("No Fen Provided");
    };
    /*
     * Params:
     *      - Board as a 2d array
     *      - Extra fen information as an object
     * Returns: A fen string representing the game
     */
    FenLogic.BoardToFen = function (board, extraFenData, debug) {
        var fen = "";
        var rowNum = 0;
        board.forEach(function (row) {
            var fenRow = "";
            var count = 0;
            var rowTail = "";
            row.forEach(function (piece) {
                if (piece !== 'X' && count > 0) {
                    fenRow += count.toString();
                    fenRow += piece;
                    count = 0;
                }
                else if (piece === 'X') {
                    count++;
                }
                else {
                    fenRow += piece;
                }
            });
            if (count > 0) {
                fenRow += count.toString();
            }
            if (rowNum === 7) {
                var turnString = (extraFenData.turn === Enums_StandardTurns.white) ? 'w' : 'b';
                var enPassant = (extraFenData.enPassant == null) ? '-' : extraFenData.enPassant;
                fenRow += " " + turnString + " " + extraFenData.castling + " " + enPassant + " " + extraFenData.halfMoves + " " + extraFenData.fullMoves;
            }
            else {
                rowTail = "/";
            }
            count++;
            rowNum++;
            fenRow += rowTail;
            fen += fenRow;
        });
        if (debug)
            console.log("Built Fen: " + fen);
        return fen;
    };
    /*
     * Params:
     *      - FEN string representing a game
     * Returns: The location of the white king as a BoardLocation object.
     */
    FenLogic.GetWhiteKingLocation = function (fen) {
        if (fen == null)
            return null;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (fen.split("/")[i][j] === "K") {
                    return { row: i, column: j };
                }
            }
        }
    };
    /*
     * Params:
     *      - FEN string representing a game
     * Returns: The location of the black king as a BoardLocation object.
     */
    FenLogic.GetBlackKingLocation = function (fen) {
        if (fen == null)
            return null;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (fen.split("/")[i][j] === "k") {
                    return { row: i, column: j };
                }
            }
        }
    };
    return FenLogic;
}());
/* harmony default export */ var src_FenLogic = (FenLogic_FenLogic);

// CONCATENATED MODULE: ./lib/src/Interfaces/Enums/Directions.js
var Directions;
(function (Directions) {
    Directions[Directions["Northwest"] = 0] = "Northwest";
    Directions[Directions["West"] = 1] = "West";
    Directions[Directions["Southwest"] = 2] = "Southwest";
    Directions[Directions["South"] = 3] = "South";
    Directions[Directions["Southeast"] = 4] = "Southeast";
    Directions[Directions["East"] = 5] = "East";
    Directions[Directions["Northeast"] = 6] = "Northeast";
    Directions[Directions["North"] = 7] = "North";
    Directions[Directions["Null"] = 8] = "Null";
})(Directions || (Directions = {}));
/* harmony default export */ var Enums_Directions = (Directions);
/*
 * Directions based on board
 * 0           N
 * 1
 * 2
 * 3  E                W
 * 4
 * 5
 * 6
 * 7           S
 *   0  1  2  3  4  5  7
 */

// CONCATENATED MODULE: ./lib/src/ChessState.js









// (function(window){
//     const myLib = () => {
var ChessState_ChessState = /** @class */ (function () {
    /*
    * Params:
    *      - [OPTIONAL] game variant type
    *      - [OPTIONAL] starting fen position
    *      - [OPTIONAL] flag for debugging printing
    *      - [TESTING] game for testing (as array of pgns)
    * Returns: A new 2d array with 1 piece in a different place
    */
    function ChessState(config) {
        // TODO: validate config object
        if (config == null) {
            this.config = src_constants.defaultConfig;
        }
        else {
            this.config = config;
        }
        this.debug = this.config.debug;
        this.gameType = this.config.gameType;
        this.hideOutput = this.config.hideOutput;
        var fenExtras;
        // Check for provided fen.
        if (this.config.fen == null) {
            // No provided fen string means a default start.
            this.config.fen = src_constants.startingFen;
            fenExtras = {
                turn: Enums_StandardTurns.white,
                castling: "KQkq",
                enPassant: null,
                halfMoves: 0,
                fullMoves: 1
            };
        }
        else {
            // Generate fen.
            // Quick fix
            if (this.config.fen === src_constants.startingFen) {
                fenExtras = {
                    turn: Enums_StandardTurns.white,
                    castling: "KQkq",
                    enPassant: null,
                    halfMoves: 0,
                    fullMoves: 1
                };
            }
        }
        // Initalize state.
        this.state = {
            board: src_FenLogic.FenToBoard(this.config.fen),
            history: {
                fen: [this.config.fen],
                pgn: []
            },
            gameOver: false,
            turn: 0,
            fenExtras: fenExtras,
            whiteKingLocation: (this.config.fen === src_constants["startingFen"]) ?
                { row: 7, column: 4 } : src_FenLogic.GetWhiteKingLocation(this.config.fen),
            blackKingLocation: (this.config.fen === src_constants["startingFen"]) ?
                { row: 0, column: 4 } : src_FenLogic.GetBlackKingLocation(this.config.fen),
            winner: null
        };
        src_Errors.checkGameType(this);
        if (this.debug && !this.hideOutput) {
            console.log("Game type: ");
            console.log(this.gameType.toString());
            console.log("Standard game type");
            console.log(Enums_GameTypes.standard);
            console.log("fenExtras: " + JSON.stringify(this.state.fenExtras));
            console.log("GameState initalized\n");
        }
        if (!this.hideOutput)
            src_BoardPrinter.printBoard(this, Enums_StandardTurns.white, this.hideOutput);
    }
    ChessState.prototype.move = function (move) {
        // Check for resignation
        if (move === "resign") {
            this.resign();
            return {
                whiteKingSideCastle: false,
                whiteQueenSideCastle: false,
                blackKingSideCastle: false,
                blackQueenSideCastle: false,
                kingLocation: null,
                movedPiece: null,
                movedPieceDest: null,
                check: false,
                gameIsOver: true,
                moveIsValid: false,
                invalidMove: null
            };
        }
        // Check for game over BEFORE move validation.
        if (this.state.gameOver === true) {
            return {
                whiteKingSideCastle: false,
                whiteQueenSideCastle: false,
                blackKingSideCastle: false,
                blackQueenSideCastle: false,
                kingLocation: null,
                movedPiece: null,
                movedPieceDest: null,
                check: false,
                gameIsOver: true,
                moveIsValid: false,
                invalidMove: ""
            };
        }
        // Validate move
        var moveIsValid = true; // TODO: validation
        // Return to indicate invalid move.
        // @ts-ignore
        if (moveIsValid === false) {
            return {
                whiteKingSideCastle: false,
                whiteQueenSideCastle: false,
                blackKingSideCastle: false,
                blackQueenSideCastle: false,
                kingLocation: null,
                movedPiece: null,
                movedPieceDest: null,
                check: false,
                gameIsOver: false,
                moveIsValid: false,
                invalidMove: move
            };
        }
        if (this.debug && !this.hideOutput)
            console.log("/////////////////////// Turn " + this.state.turn + " ///////////////////////");
        // 1. Print info.
        if (this.gameType === Enums_GameTypes.standard) {
            if (this.debug && !this.hideOutput)
                console.log("   " + this.getTurn() + "'s turn");
        }
        // Execute move (pgn)
        var result = MoveProcessor(this, move, this.hideOutput, this.debug);
        // Update History
        this.state.history.pgn.push(move);
        this.state.history.fen.push(src_FenLogic.BoardToFen(this.state.board, this.state.fenExtras));
        this.state.turn++;
        // Update king location.
        // TODO: Make sure king location is set when using a non-starting fen.
        if (this.getTurn() === Enums_StandardTurns.white && result.kingLocation !== null) {
            this.state.whiteKingLocation = result.kingLocation;
        }
        else if (result.kingLocation !== null) {
            this.state.blackKingLocation = result.kingLocation;
        }
        // Print board if debugging.
        if (this.debug === true && !this.hideOutput)
            src_BoardPrinter.printBoardDebug(this, this.hideOutput);
        else if (this.debug === false && !this.hideOutput)
            src_BoardPrinter.printBoard(this, Enums_StandardTurns.white, this.hideOutput);
        this.updateFenExtras(result);
        if (result == null) {
            if (!this.hideOutput) {
                console.log("!~!~!~!~!~! No More Moves !~!~!~!~!~!~!");
                console.log("              Game Over");
            }
            this.state.gameOver = true;
        }
        if (this.checkForEndOfGame(result)) {
            if (!this.hideOutput)
                console.log("GAME OVER");
            this.state.gameOver = true; // For testing purposes
        }
        return result;
    };
    // TODO: check if this can be removed.
    ChessState.prototype.getBoardArray = function () {
        return this.state.board;
    };
    ChessState.prototype.getTurn = function () {
        switch (this.gameType) {
            /* Standard */
            case Enums_GameTypes.standard:
                return this.state.fenExtras.turn;
            default:
                throw new Error("Error, variant not recognized");
        }
    };
    ChessState.prototype.getFen = function (debug) {
        return src_FenLogic.BoardToFen(this.state.board, this.state.fenExtras, debug).trim();
    };
    ChessState.prototype.printBoard = function (debug, hideOutput) {
        src_BoardPrinter.printBoard(this, Enums_StandardTurns.white, debug);
    };
    /*
     * Update turn
     */
    ChessState.prototype.updateFenExtras = function (moveResults) {
        switch (this.gameType) {
            /* Standard */
            case Enums_GameTypes.standard:
                // Toggle turn
                if (this.state.fenExtras.turn === Enums_StandardTurns.white)
                    this.state.fenExtras.turn = Enums_StandardTurns.black;
                else
                    this.state.fenExtras.turn = Enums_StandardTurns.white;
                // Update castling.
                if (moveResults.whiteKingSideCastle || moveResults.whiteQueenSideCastle) {
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("K", "");
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("Q", "");
                }
                else if (moveResults.blackKingSideCastle || moveResults.blackQueenSideCastle) {
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("k", "");
                    this.state.fenExtras.castling = this.state.fenExtras.castling.replace("q", "");
                }
                // Update En Passant
                this.state.fenExtras.enPassant = moveResults.enableEnPassant;
                //this.checkForCastling()                 // Update available castling.
                this.state.fenExtras.halfMoves++; // Increment number of half moves.
                if (this.state.fenExtras.halfMoves === 2) { // Check to increment full moves.
                    this.state.fenExtras.halfMoves = 0;
                    this.state.fenExtras.fullMoves++;
                }
                break;
            default:
                throw new Error("Variant Not Yet Implemented");
        }
    };
    ChessState.prototype.checkForCastling = function () {
        if (!this.hideOutput)
            console.log("checkForCastling Not Yet Implemented");
    };
    ChessState.prototype.checkForEnPassant = function () {
        if (!this.hideOutput)
            console.log("checkForEnPassant Not Yet Implemented");
    };
    ChessState.prototype.checkForEndOfGame = function (moveResult) {
        if (moveResult.check === true && this.checkForCheckmate(moveResult) === true) {
            if (this.getTurn() === Enums_StandardTurns.black)
                this.state.winner = Enums_StandardTurns.white;
            else
                this.state.winner = Enums_StandardTurns.black;
            return true;
        }
        //this.checkForStalemate() 
        // TODO: add resign functionality.
        return false;
    };
    // NOTE: method is designed for standard sized board
    ChessState.prototype.checkForCheckmate = function (moveResult) {
        var isCheckmate = false;
        // Find the location of the king.
        var kingLocation = (this.getTurn() === Enums_StandardTurns.white) ? this.state.whiteKingLocation : this.state.blackKingLocation;
        // TODO: add method for searching for king if non-starting fen is provided.
        var kingPiece = (this.getTurn() === Enums_StandardTurns.white) ? "K" : "k";
        // A - Avoid
        // Check all the imidiately adjacent and diagonal squares of the king's location.
        for (var _i = 0, _a = src_constants["PieceLogic"]["King"]; _i < _a.length; _i++) {
            var squareRulesOfInterest = _a[_i];
            if (kingLocation.column + squareRulesOfInterest.column < 8 &&
                kingLocation.column + squareRulesOfInterest.column >= 0 &&
                kingLocation.row + squareRulesOfInterest.row < 8 &&
                kingLocation.row + squareRulesOfInterest.row >= 0) {
                var squareOfIntesest = {
                    row: kingLocation.column + squareRulesOfInterest.column,
                    column: kingLocation.row + squareRulesOfInterest.row
                };
                // TODO: Replace "X" as the empty space.
                // If any EMPTY squares surrounding the king are safe, it's not a checkmate.
                if (this.getBoardArray()[squareOfIntesest.row][squareOfIntesest.column] !== "X" &&
                    this.squareIsSafeForKing(squareOfIntesest, this.getTurn(), this.gameType, this.debug) === true) {
                    return false;
                }
            }
        }
        // B - Block
        // If knight, unblockable
        if (moveResult.movedPiece !== Enums_PieceTypes.Knight) {
            var distance = {
                row: moveResult.movedPieceDest.row - kingLocation.row,
                column: moveResult.movedPieceDest.column - kingLocation.column,
            };
            // Only check the path that are between the king and the attacking piece.
            // Find which path by assuming only a Bishop, Rook, Queen, and Pawn can attack.
            //      This means that a piece like pao, or cannon, from Chinese chess isn't 
            //      covered by the following logic.
            var direction = Enums_Directions.Null;
            //TODO: Be sure to test later
            // If the attacking piece is NorthWest of the King // TODO: make sure this isn't flipped based on the distance variable
            if (distance.row = 0 && distance.row < 8 && distance.column > 0 && distance.column < 8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is SouthEast of the king.");
                direction = Enums_Directions.Southeast;
            }
            //West
            else if (distance.row === 0 && distance.column >= 0 && distance.column < 8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is East of the king.");
                direction = Enums_Directions.East;
            } //SouthWest
            else if (distance.row < 0 && distance.row > -8 && distance.column > 0 && distance.column < 8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is NorthEast of the king.");
                direction = Enums_Directions.Northeast;
            }
            else if (distance.row < 0 && distance.row > -8 && distance.column === 0) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is North of the king");
                direction = Enums_Directions.North;
            }
            else if (distance.row < 0 && distance.row > -8 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is NorthWest of the king.");
                direction = Enums_Directions.Northwest;
            }
            else if (distance.row === 0 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is West");
                direction = Enums_Directions.West;
            }
            else if (distance.row > 0 && distance.row < 8 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is SouthWest of the king.");
                direction = Enums_Directions.Southwest;
            }
            else if (distance.row < 0 && distance.column < 0 && distance.column > -8) {
                if (this.debug && !this.hideOutput)
                    console.log("Attacker is South of King.");
                direction = Enums_Directions.South;
            }
            if (this.debug && !this.hideOutput)
                console.log("Attacker is from " + direction.toString());
            // Return false if there is a block that prevents checkmate.
            if (this.checkForBlockableSquares(kingLocation, direction) === false) {
                return false;
            }
        }
        // C - Capture
        if (this.debug && !this.hideOutput)
            console.log("---------Checking for capture-------------");
        var resultt = this.squareIsSafeForKing(moveResult.movedPieceDest, (this.getTurn() === Enums_StandardTurns.white) ? Enums_StandardTurns.black : Enums_StandardTurns.white, this.gameType, this.debug);
        if (resultt === true) {
            // The piece can't be captured, thus checkmate.
            return true;
        }
        return isCheckmate;
    };
    // Iteratively check all the surrounding squares to see if a square is safe for the king
    ChessState.prototype.squareIsSafeForKing = function (kingSquare, color, gameType, debug) {
        switch (gameType) {
            case Enums_GameTypes.standard:
                // Check Knight squares, Bishop squares, and Rook squares.
                var foo = this.squareIsSafeFromPiece(kingSquare, color, "Knight", debug);
                var bar = this.squareIsSafeFromPiece(kingSquare, color, "Bishop", debug);
                var que = this.squareIsSafeFromPiece(kingSquare, color, "Rook", debug);
                return (foo && bar && que);
            case Enums_GameTypes.bughouse:
                throw new Error("Variant 'Bughouse' is not yet implemented.");
            default:
                throw new Error("Game variant is not recognized.");
        }
    };
    ChessState.prototype.getStatus = function () {
        var status = {
            gameOver: this.state.gameOver,
            turn: null,
            winner: (this.state.winner === Enums_StandardTurns.white) ? "white" : "black",
        };
        if (this.state.winner == null) {
            status.winner = null;
        }
        return status;
    };
    ChessState.prototype.resign = function () {
        if (!this.hideOutput)
            console.log("GAME OVER");
        this.state.gameOver = true;
        this.state.winner = this.getTurn(); // The turn hasn't updated yet.
    };
    // NOTE: function is not designed for non-standard board sizes.
    ChessState.prototype.squareIsSafeFromPiece = function (kingSquare, color, pieceName, debug) {
        var pieceSymbolWhite;
        var pieceSymbolBlack;
        // TODO: The problem is that the bishops and rooks don't stop after they find a piece that is in the way.
        if (debug && !this.hideOutput) {
            console.log(kingSquare);
            console.log(color);
            console.log("pieceName: " + pieceName);
        }
        var list = [];
        var sublist = [];
        // Only needs to check against Rooks, Knights, and Bishops.
        switch (pieceName) {
            case "Rook":
                pieceSymbolWhite = src_constants["PieceNameToPGN"]["Rook"][Enums_StandardTurns.white];
                pieceSymbolBlack = src_constants["PieceNameToPGN"]["Rook"][Enums_StandardTurns.black];
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 7; j++) {
                        sublist.push(src_constants.PieceLogic[pieceName][i * j]);
                    }
                    list.push(sublist);
                    sublist = [];
                }
                break;
            case "Knight":
                pieceSymbolWhite = src_constants["PieceNameToPGN"]["Knight"][Enums_StandardTurns.white];
                pieceSymbolBlack = src_constants["PieceNameToPGN"]["Knight"][Enums_StandardTurns.black];
                // Just stuff it the list.
                for (var j = 0; j < 8; j++) {
                    sublist.push(src_constants.PieceLogic[pieceName][j]);
                }
                list.push(sublist);
                break;
            case "Bishop":
                pieceSymbolWhite = src_constants["PieceNameToPGN"]["Bishop"][Enums_StandardTurns.white];
                pieceSymbolBlack = src_constants["PieceNameToPGN"]["Bishop"][Enums_StandardTurns.black];
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 7; j++) {
                        sublist.push(src_constants.PieceLogic[pieceName][i * j]);
                    }
                    list.push(sublist);
                    sublist = [];
                }
                break;
            case "Pawn":
                if (color === Enums_StandardTurns.white) {
                    if ((kingSquare.row - 1) >= 0 && (kingSquare.column - 1) >= 0 && this.getBoardArray()[kingSquare.row - 1][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && this.getBoardArray()[kingSquare.row - 1][kingSquare.column + 1] === "p")
                        return true;
                    else
                        return false;
                }
                else {
                    if ((kingSquare.row + 1) < 8 && (kingSquare.column - 1) >= 0 && this.getBoardArray()[kingSquare.row + 8][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && this.getBoardArray()[kingSquare.row + 1][kingSquare.column + 1] === "p")
                        return true;
                    else
                        return false;
                }
            default:
                throw new Error("'squareIsSafeFromPiece' function is working unexpectedly.");
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var sublist_2 = list_1[_i];
            for (var _a = 0, sublist_1 = sublist_2; _a < sublist_1.length; _a++) {
                var attackerSquare = sublist_1[_a];
                // If the square is within bounds
                if (attackerSquare.column + kingSquare.column < 8 &&
                    attackerSquare.column + kingSquare.column >= 0 &&
                    attackerSquare.row + kingSquare.row < 8 &&
                    attackerSquare.row + kingSquare.row >= 0) {
                    // This break will require there to be a clear path for non-jumping pieces to be a threat.
                    if ((this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolWhite ||
                        this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolBlack ||
                        this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== "X") &&
                        pieceName !== "Knight" // Knights are allowed to jump
                    )
                        break;
                    // If the correct piece appears, then the square is not safe.
                    if (color === Enums_StandardTurns.white && this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolWhite) {
                        return false;
                    }
                    else if (color === Enums_StandardTurns.black && this.state.board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolBlack) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // Returns false if it's not checkmate because there is a possible block
    // returning true signals nothing definitive.
    ChessState.prototype.checkForBlockableSquares = function (kingLocation, direction) {
        var rowInc;
        var colInc;
        switch (direction) {
            case Enums_Directions.East:
                rowInc = 0;
                colInc = -1;
                break;
            case Enums_Directions.Northeast:
                rowInc = -1;
                colInc = -1;
                break;
            case Enums_Directions.North:
                rowInc = -1;
                colInc = 0;
                break;
            case Enums_Directions.Northwest:
                rowInc = -1;
                colInc = 1;
                break;
            case Enums_Directions.West:
                rowInc = 0;
                colInc = 1;
                break;
            case Enums_Directions.Southwest:
                rowInc = 1;
                colInc = 1;
                break;
            case Enums_Directions.South:
                rowInc = 1;
                colInc = 0;
                break;
            case Enums_Directions.Southeast:
                rowInc = 1;
                colInc = -1;
                break;
            default:
                throw new Error("Directional error 1.");
        }
        // Check for open squares
        for (var i = 1; i < 8; i++) {
            // If found empty square
            if (this.getBoardArray()[kingLocation.row + rowInc][kingLocation.column + colInc] === "X") {
                var tempLoc = {
                    row: kingLocation.row + i,
                    column: kingLocation.column + i
                };
                // Check to see if a piece can block
                if (!this.squareIsSafeFromPiece(tempLoc, this.getTurn(), "Rook", false) ||
                    !this.squareIsSafeFromPiece(tempLoc, this.getTurn(), "Bishop", false) ||
                    !this.squareIsSafeFromPiece(tempLoc, this.getTurn(), "Knight", false))
                    return false; // Not checkmate
            }
            // The attacker was found, no blocking possible
            else {
                if (this.debug && !this.hideOutput)
                    console.log("Blocking checkmate not possible.");
                break;
            }
            switch (direction) {
                case Enums_Directions.East:
                    colInc--;
                    break;
                case Enums_Directions.Northeast:
                    rowInc--;
                    colInc--;
                    break;
                case Enums_Directions.North:
                    rowInc--;
                    break;
                case Enums_Directions.Northwest:
                    rowInc--;
                    colInc++;
                    break;
                case Enums_Directions.West:
                    colInc++;
                    break;
                case Enums_Directions.Southwest:
                    rowInc++;
                    colInc++;
                    break;
                case Enums_Directions.South:
                    rowInc++;
                    break;
                case Enums_Directions.Southeast:
                    rowInc++;
                    colInc--;
                    break;
                default:
                    throw new Error("Directional error 2.");
            }
        }
        return true;
    };
    return ChessState;
}());
/* harmony default export */ var src_ChessState = __webpack_exports__["default"] = (ChessState_ChessState);
//module.exports.ChessState = ChessState
exports.ChessState = ChessState_ChessState;
//export { ChessState }
// module.exports = ChessState
//         return ChessState
//     }
// //@ts-ignore
//     if(typeof(window.ChessState) === 'undefined'){
// //@ts-ignore
//         window.ChessState = myLib()
//     }
// })(window)
// export default null


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9JbnRlcmZhY2VzL0VudW1zL0dhbWVUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0ludGVyZmFjZXMvRW51bXMvU3RhbmRhcmRUdXJucy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0JvYXJkUHJpbnRlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0ludGVyZmFjZXMvRW51bXMvUGllY2VUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL01vdmVQcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NyYy9GZW5Mb2dpYy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0ludGVyZmFjZXMvRW51bXMvRGlyZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvc3JjL0NoZXNzU3RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9COzs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0NBQXNDO0FBQ3ZDOzs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSwwQkFBMEI7QUFDdkMsYUFBYSwwQkFBMEI7QUFDdkMsYUFBYSx5QkFBeUI7QUFDdEM7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLHlCQUF5QjtBQUN0QztBQUNBO0FBQ0EsYUFBYSwwQkFBMEI7QUFDdkMsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSx3QkFBd0I7QUFDckMsYUFBYSx5QkFBeUI7QUFDdEMsYUFBYSx5QkFBeUI7QUFDdEM7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEsMEJBQTBCO0FBQ3ZDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEsd0JBQXdCO0FBQ3JDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDOzs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxR0FBcUc7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixNQUFNO0FBQ25DLGtDQUFrQyxXQUFXO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsK0NBQStDLG1CQUFtQixRQUFRO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw4QkFBMEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNWZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG1CQUFtQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQThELGdCQUFnQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE9BQU87QUFDdEMsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixPQUFPO0FBQ3RDLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQSxtREFBbUQsdUJBQXVCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0oiLCJmaWxlIjoiQ2hlc3NTdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInZhciBHYW1lVHlwZXM7XHJcbihmdW5jdGlvbiAoR2FtZVR5cGVzKSB7XHJcbiAgICBHYW1lVHlwZXNbR2FtZVR5cGVzW1wic3RhbmRhcmRcIl0gPSAwXSA9IFwic3RhbmRhcmRcIjtcclxuICAgIEdhbWVUeXBlc1tHYW1lVHlwZXNbXCJidWdob3VzZVwiXSA9IDFdID0gXCJidWdob3VzZVwiO1xyXG4gICAgR2FtZVR5cGVzW0dhbWVUeXBlc1tcInBsdW5kZXJcIl0gPSAyXSA9IFwicGx1bmRlclwiO1xyXG59KShHYW1lVHlwZXMgfHwgKEdhbWVUeXBlcyA9IHt9KSk7XHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVUeXBlcztcclxuIiwiaW1wb3J0IEdhbWVUeXBlcyBmcm9tIFwiLi9JbnRlcmZhY2VzL0VudW1zL0dhbWVUeXBlc1wiO1xyXG4vKiBIZWxwZXIgZnVuY3Rpb24gKi9cclxudmFyIEhlbHBlckZ1bmN0aW9ucyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEhlbHBlckZ1bmN0aW9ucygpIHtcclxuICAgIH1cclxuICAgIEhlbHBlckZ1bmN0aW9ucy5pc051bWVyaWMgPSBmdW5jdGlvbiAobikge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XHJcbiAgICB9O1xyXG4gICAgLy8gSGFzIG9uZSBvcHRpb25hbCBwYXJhbWV0ZXIgZm9yIHRlc3RpbmdcclxuICAgIEhlbHBlckZ1bmN0aW9ucy5nZXRNb3ZlID0gZnVuY3Rpb24gKG9wdCkge1xyXG4gICAgICAgIGlmIChvcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLypcclxuICAgICAqIFBhcmFtZXRlcnM6XHJcbiAgICAgKiAgICAgIC0gUEdOIG1vdmVcclxuICAgICAqICAgICAgLSBXaGljaCBwbGF5cyB0dXJuIGl0IGlzXHJcbiAgICAgKiAgICAgIC0gZ2FtZSB0eXBlIFtPUFRJT05BTF1cclxuICAgICAqL1xyXG4gICAgLy8gVXNlIHRoaXMgdG8gZmluZCBwaWVjZSBzdGFydCBsb2NhdGlvbnNcclxuICAgIEhlbHBlckZ1bmN0aW9ucy5maW5kUGllY2VEZXN0aW5hdGlvbiA9IGZ1bmN0aW9uIChwZ24sIHR1cm4sIGdhbWVUeXBlLCBjYXB0dXJlLCBoaWRlT3V0cHV0LCBkZWJ1Zykge1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHsgXCJyb3dcIjogLTEsIFwiY29sdW1uXCI6IC0xIH07XHJcbiAgICAgICAgaWYgKGdhbWVUeXBlICE9IHVuZGVmaW5lZCAmJiBnYW1lVHlwZSAhPT0gR2FtZVR5cGVzLnN0YW5kYXJkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FtZVR5cGU6IFwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZVR5cGUpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwZ25Ub0dyaWRDb3JkaW5hdGUgaXMgbm90IHlldCBpbXBsZW1lbnRlZCBmb3IgXCIgKyBnYW1lVHlwZS50b1N0cmluZygpICsgXCIgdmFyaWFudFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBnbkNvbHVtbkluZGV4ID0gMTtcclxuICAgICAgICB2YXIgcGduUm93SW5kZXggPSAyO1xyXG4gICAgICAgIGlmIChjYXB0dXJlKSB7XHJcbiAgICAgICAgICAgIHBnbkNvbHVtbkluZGV4Kys7XHJcbiAgICAgICAgICAgIHBnblJvd0luZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIG5vdCBhIHBhd25cclxuICAgICAgICBpZiAocGduWzBdID09PSBcIk5cIiB8fCBwZ25bMF0gPT09IFwiQlwiIHx8XHJcbiAgICAgICAgICAgIHBnblswXSA9PT0gXCJSXCIgfHwgcGduWzBdID09PSBcIktcIiB8fFxyXG4gICAgICAgICAgICBwZ25bMF0gPT09IFwiUVwiKSB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmNvbHVtbiA9IChwZ25bcGduQ29sdW1uSW5kZXhdLmNoYXJDb2RlQXQoMCkgLSA5Nyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJvdyA9ICg4IC0gK3BnbltwZ25Sb3dJbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGRlYnVnICYmICFoaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PXBhd25cIik7XHJcbiAgICAgICAgICAgIGlmICghY2FwdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uY29sdW1uID0gKHBnblswXS5jaGFyQ29kZUF0KDApIC0gOTcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucm93ID0gKDggLSArcGduWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmNvbHVtbiA9IChwZ25bMl0uY2hhckNvZGVBdCgwKSAtIDk3KTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJvdyA9ICg4IC0gK3BnblszXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIZWxwZXJGdW5jdGlvbnM7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IEhlbHBlckZ1bmN0aW9ucztcclxuIiwidmFyIFN0YW5kYXJkVHVybnM7XHJcbihmdW5jdGlvbiAoU3RhbmRhcmRUdXJucykge1xyXG4gICAgU3RhbmRhcmRUdXJuc1tTdGFuZGFyZFR1cm5zW1wid2hpdGVcIl0gPSAwXSA9IFwid2hpdGVcIjtcclxuICAgIFN0YW5kYXJkVHVybnNbU3RhbmRhcmRUdXJuc1tcImJsYWNrXCJdID0gMV0gPSBcImJsYWNrXCI7XHJcbn0pKFN0YW5kYXJkVHVybnMgfHwgKFN0YW5kYXJkVHVybnMgPSB7fSkpO1xyXG5leHBvcnQgZGVmYXVsdCBTdGFuZGFyZFR1cm5zO1xyXG4iLCIvKiBib2FyZFByaW50ZXIuanMgKi9cclxuaW1wb3J0IEhlbHBlckZ1bmN0aW9ucyBmcm9tICcuL0hlbHBlckZ1bmN0aW9ucyc7XHJcbmltcG9ydCBTdGFuZGFyZFR1cm5zIGZyb20gJy4vSW50ZXJmYWNlcy9FbnVtcy9TdGFuZGFyZFR1cm5zJztcclxudmFyIEJvYXJkUHJpbnRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJvYXJkUHJpbnRlcigpIHtcclxuICAgIH1cclxuICAgIC8qIFByaW50cyBhIGFzY2lpIGJvYXJkIGJhc2VkIG9uIGEgc3RhbmRhcmQgZmVuIHN0cmluZyAqL1xyXG4gICAgQm9hcmRQcmludGVyLnByaW50Qm9hcmQgPSBmdW5jdGlvbiAoc3RhdGUsIHByb3NwZWN0aXZlLCBoaWRlT3V0cHV0KSB7XHJcbiAgICAgICAgdmFyIGJvYXJkU3RyaW5nID0gXCJcIjsgLy8gU3RyaW5nIGZvciBwcmludGluZyB0byB0aGUgY29uc29sZS5cclxuICAgICAgICB2YXIgYm9hcmQgPSBzdGF0ZS5nZXRCb2FyZEFycmF5KCk7XHJcbiAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIjtcclxuICAgICAgICB2YXIgYm9hcmRGb3JQcmludGluZyA9IG51bGw7XHJcbiAgICAgICAgaWYgKHByb3NwZWN0aXZlID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSB7XHJcbiAgICAgICAgICAgIGJvYXJkRm9yUHJpbnRpbmcgPSBib2FyZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvc3BlY3RpdmUgPT09IFN0YW5kYXJkVHVybnMuYmxhY2spIHtcclxuICAgICAgICAgICAgYm9hcmRGb3JQcmludGluZyA9IGJvYXJkLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9hcmRGb3JQcmludGluZy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCJ8XCI7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChwaWVjZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgYSBudW1iZXIgaXMgZm91bmQsIHByaW50IHRoYXQgbWFueSBzcGFjZXNcclxuICAgICAgICAgICAgICAgIGlmIChIZWxwZXJGdW5jdGlvbnMuaXNOdW1lcmljKHBpZWNlKSlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICtwaWVjZTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2FyZFN0cmluZyArPSBcIiAgIHxcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBpZWNlID09PSBcIlhcIikgLy8gVmFsdWUgdXNlZCBmb3IgYmxhbmNrIHNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCIgICB8XCI7XHJcbiAgICAgICAgICAgICAgICAvLyBFbHNlIHByaW50IHRoZSBwaWVjZSBsZXR0ZXJcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBib2FyZFN0cmluZyArPSBcIiBcIiArIHBpZWNlICsgXCIgfFwiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCJcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvYXJkU3RyaW5nKTtcclxuICAgICAgICByZXR1cm4gYm9hcmRTdHJpbmc7IC8vIEZvciB0ZXN0aW5nLlxyXG4gICAgfTtcclxuICAgIC8qIFByaW50cyBhbiBhc2NpaSBib2FyZCBiYXNlZCBvbiBnYW1lIHN0YXRlIGZvciBkZWJ1Z2dpbmcgKi9cclxuICAgIC8vIE5PVEU6IGRlYnVnIHByaW50IGlzIGFsd2F5cyBmcm9tIGJsYWNrJ3MgcGVyc3BlY3RpdmVcclxuICAgIEJvYXJkUHJpbnRlci5wcmludEJvYXJkRGVidWcgPSBmdW5jdGlvbiAoc3RhdGUsIGhpZGVPdXRwdXQpIHtcclxuICAgICAgICB2YXIgYm9hcmRTdHJpbmcgPSBcIlwiOyAvLyBTdHJpbmcgZm9yIHByaW50aW5nIHRvIHRoZSBjb25zb2xlLlxyXG4gICAgICAgIHZhciBib2FyZCA9IHN0YXRlLmdldEJvYXJkQXJyYXkoKTtcclxuICAgICAgICB2YXIgZmlyc3RSb3dPblVzZXJGYWNpbmdCb2FyZCA9IDg7XHJcbiAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCJcXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiO1xyXG4gICAgICAgIGJvYXJkLmZvckVhY2goZnVuY3Rpb24gKHJvdywgaSkge1xyXG4gICAgICAgICAgICBib2FyZFN0cmluZyArPSAoZmlyc3RSb3dPblVzZXJGYWNpbmdCb2FyZC50b1N0cmluZygpICsgXCIgXCIgKyBpICsgXCIgXCIpO1xyXG4gICAgICAgICAgICBib2FyZFN0cmluZyArPSBcInxcIjtcclxuICAgICAgICAgICAgZmlyc3RSb3dPblVzZXJGYWNpbmdCb2FyZC0tO1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaChmdW5jdGlvbiAocGllY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIGEgbnVtYmVyIGlzIGZvdW5kLCBwcmludCB0aGF0IG1hbnkgc3BhY2VzXHJcbiAgICAgICAgICAgICAgICBpZiAoSGVscGVyRnVuY3Rpb25zLmlzTnVtZXJpYyhwaWVjZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgK3BpZWNlOyBpXzErKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCIgICB8XCI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwaWVjZSA9PT0gXCJYXCIpIC8vIFZhbHVlIHVzZWQgZm9yIGJsYW5jayBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkU3RyaW5nICs9IFwiICAgfFwiO1xyXG4gICAgICAgICAgICAgICAgLy8gRWxzZSBwcmludCB0aGUgcGllY2UgbGV0dGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCIgXCIgKyBwaWVjZSArIFwiIHxcIjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJvYXJkU3RyaW5nICs9IFwiXFxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5cIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBib2FyZFN0cmluZyArPSBcIiAgICAgIDAgICAxICAgMiAgIDMgICA0ICAgNSAgIDYgICA3XFxuXCI7XHJcbiAgICAgICAgYm9hcmRTdHJpbmcgKz0gXCIgICAgICBBICAgQiAgIEMgICBEICAgRSAgIEYgICBHICAgSFxcblwiO1xyXG4gICAgICAgIGlmICghaGlkZU91dHB1dClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYm9hcmRTdHJpbmcpO1xyXG4gICAgICAgIHJldHVybiBib2FyZFN0cmluZzsgLy8gRm9yIHRlc3RpbmcuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEJvYXJkUHJpbnRlcjtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgQm9hcmRQcmludGVyO1xyXG4iLCJpbXBvcnQgR2FtZVR5cGVzIGZyb20gXCIuL0ludGVyZmFjZXMvRW51bXMvR2FtZVR5cGVzXCI7XHJcbnZhciBjb25zdGFudHMgPSB7XHJcbiAgICAvKiBEZWZhdWx0IGNvbmZpZyBvYmplY3QgKi9cclxuICAgIGRlZmF1bHRDb25maWc6IHtcclxuICAgICAgICBnYW1lVHlwZTogR2FtZVR5cGVzLnN0YW5kYXJkLFxyXG4gICAgICAgIGZlbjogbnVsbCxcclxuICAgICAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICAgICAgaGlkZU91dHB1dDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8qIENvbHVtbiBjb25zdGFudHMgKi9cclxuICAgIFwiYVwiOiAwLFxyXG4gICAgXCJiXCI6IDEsXHJcbiAgICBcImNcIjogMixcclxuICAgIFwiZFwiOiAzLFxyXG4gICAgXCJlXCI6IDQsXHJcbiAgICBcImZcIjogNSxcclxuICAgIFwiZ1wiOiA2LFxyXG4gICAgXCJoXCI6IDcsXHJcbiAgICAvKiBTdGFuZGFyZCBzdGFydGluZyBmZW4gKi9cclxuICAgIFwic3RhcnRpbmdGZW5cIjogXCJybmJxa2Juci9wcHBwcHBwcC84LzgvOC84L1BQUFBQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMVwiLFxyXG4gICAgLyogT25seSBpbnRlbmRlZCBmb3Igc3RhbmRhcmQgZ2FtZXMgKi9cclxuICAgIFwiUGllY2VMb2dpY1wiOiB7XHJcbiAgICAgICAgXCJLbmlnaHRcIjogW1xyXG4gICAgICAgICAgICB7IFwicm93XCI6IDIsIFwiY29sdW1uXCI6IC0xIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMiwgXCJjb2x1bW5cIjogMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDEsIFwiY29sdW1uXCI6IDIgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMSwgXCJjb2x1bW5cIjogMiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0yLCBcImNvbHVtblwiOiAxIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTIsIFwiY29sdW1uXCI6IC0xIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTEsIFwiY29sdW1uXCI6IC0yIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMSwgXCJjb2x1bW5cIjogLTIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiQmlzaG9wXCI6IFtcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMSwgXCJjb2x1bW5cIjogLTEgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMiwgXCJjb2x1bW5cIjogLTIgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMywgXCJjb2x1bW5cIjogLTMgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNCwgXCJjb2x1bW5cIjogLTQgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNSwgXCJjb2x1bW5cIjogLTUgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNiwgXCJjb2x1bW5cIjogLTYgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNywgXCJjb2x1bW5cIjogLTcgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAxLCBcImNvbHVtblwiOiAtMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDIsIFwiY29sdW1uXCI6IC0yIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMywgXCJjb2x1bW5cIjogLTMgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA0LCBcImNvbHVtblwiOiAtNCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDUsIFwiY29sdW1uXCI6IC01IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNiwgXCJjb2x1bW5cIjogLTYgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA3LCBcImNvbHVtblwiOiAtNyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0xLCBcImNvbHVtblwiOiAxIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTIsIFwiY29sdW1uXCI6IDIgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMywgXCJjb2x1bW5cIjogMyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC00LCBcImNvbHVtblwiOiA0IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTUsIFwiY29sdW1uXCI6IDUgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNiwgXCJjb2x1bW5cIjogNiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC03LCBcImNvbHVtblwiOiA3IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMSwgXCJjb2x1bW5cIjogMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDIsIFwiY29sdW1uXCI6IDIgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAzLCBcImNvbHVtblwiOiAzIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNCwgXCJjb2x1bW5cIjogNCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDUsIFwiY29sdW1uXCI6IDUgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA2LCBcImNvbHVtblwiOiA2IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNywgXCJjb2x1bW5cIjogNyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJSb29rXCI6IFtcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAxLCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMiwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDMsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA0LCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNSwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDYsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA3LCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTEsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMiwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0zLCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTQsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNSwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC02LCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTcsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiAxIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogMiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IDMgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiA0IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogNSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IDYgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiA3IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogLTEgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiAtMiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IC0zIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogLTQgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiAtNSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IC02IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogLTcgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiS2luZ1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTEsIFwiY29sdW1uXCI6IC0xIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTEsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMSwgXCJjb2x1bW5cIjogMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IDEgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAxLCBcImNvbHVtblwiOiAxIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMSwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDEsIFwiY29sdW1uXCI6IC0xIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogLTEgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiUXVlZW5cIjogW1xyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0xLCBcImNvbHVtblwiOiAtMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0yLCBcImNvbHVtblwiOiAtMiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0zLCBcImNvbHVtblwiOiAtMyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC00LCBcImNvbHVtblwiOiAtNCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC01LCBcImNvbHVtblwiOiAtNSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC02LCBcImNvbHVtblwiOiAtNiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC03LCBcImNvbHVtblwiOiAtNyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0xLCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTIsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMywgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC00LCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTUsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNiwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC03LCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTEsIFwiY29sdW1uXCI6IDEgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtMiwgXCJjb2x1bW5cIjogMiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC0zLCBcImNvbHVtblwiOiAzIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTQsIFwiY29sdW1uXCI6IDQgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAtNSwgXCJjb2x1bW5cIjogNSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IC02LCBcImNvbHVtblwiOiA2IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogLTcsIFwiY29sdW1uXCI6IDcgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiAxIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogMiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IDMgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiA0IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogNSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IDYgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiA3IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMSwgXCJjb2x1bW5cIjogMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDIsIFwiY29sdW1uXCI6IDIgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAzLCBcImNvbHVtblwiOiAzIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNCwgXCJjb2x1bW5cIjogNCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDUsIFwiY29sdW1uXCI6IDUgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA2LCBcImNvbHVtblwiOiA2IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNywgXCJjb2x1bW5cIjogNyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDEsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAyLCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMywgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDQsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA1LCBcImNvbHVtblwiOiAwIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNiwgXCJjb2x1bW5cIjogMCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDcsIFwiY29sdW1uXCI6IDAgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAxLCBcImNvbHVtblwiOiAtMSB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDIsIFwiY29sdW1uXCI6IC0yIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMywgXCJjb2x1bW5cIjogLTMgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA0LCBcImNvbHVtblwiOiAtNCB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDUsIFwiY29sdW1uXCI6IC01IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogNiwgXCJjb2x1bW5cIjogLTYgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiA3LCBcImNvbHVtblwiOiAtNyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IC0xIH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogLTIgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiAtMyB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IC00IH0sXHJcbiAgICAgICAgICAgIHsgXCJyb3dcIjogMCwgXCJjb2x1bW5cIjogLTUgfSxcclxuICAgICAgICAgICAgeyBcInJvd1wiOiAwLCBcImNvbHVtblwiOiAtNiB9LFxyXG4gICAgICAgICAgICB7IFwicm93XCI6IDAsIFwiY29sdW1uXCI6IC03IH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbiAgICAvKiBPbmx5IGludGVuZGVkIGZvciBzdGFuZGFyZCBnYW1lcyAqL1xyXG4gICAgXCJCb2FyZFdpZHRoXCI6IDgsXHJcbiAgICBcIkJvYXJkSGVpZ2h0XCI6IDgsXHJcbiAgICBcIlBpZWNlUEdOVG9OYW1lXCI6IHtcclxuICAgICAgICBcInBcIjogXCJQYXduXCIsXHJcbiAgICAgICAgXCJQXCI6IFwiUGF3blwiLFxyXG4gICAgICAgIFwiblwiOiBcIktuaWdodFwiLFxyXG4gICAgICAgIFwiTlwiOiBcIktuaWdodFwiLFxyXG4gICAgICAgIFwiYlwiOiBcIkJpc2hvcFwiLFxyXG4gICAgICAgIFwiQlwiOiBcIkJpc2hvcFwiLFxyXG4gICAgICAgIFwiclwiOiBcIlJvb2tcIixcclxuICAgICAgICBcIlJcIjogXCJSb29rXCIsXHJcbiAgICAgICAgXCJxXCI6IFwiUXVlZW5cIixcclxuICAgICAgICBcIlFcIjogXCJRdWVlblwiLFxyXG4gICAgICAgIFwia1wiOiBcIktpbmdcIixcclxuICAgICAgICBcIktcIjogXCJLaW5nXCIsXHJcbiAgICB9LFxyXG4gICAgLy8gTk9URTogMCBpcyB0aGUgZW51bSB2YWx1ZSBmb3Igd2hpdGUgYW5kIDEgaXMgZm9yIGJsYWNrIGZyb20gdGhlIFN0YW5kYXJkVHVybnMgZmlsZS5cclxuICAgIFwiUGllY2VOYW1lVG9QR05cIjoge1xyXG4gICAgICAgIFwiUGF3blwiOiB7XHJcbiAgICAgICAgICAgIDA6IFwiUFwiLFxyXG4gICAgICAgICAgICAxOiBcInBcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJLbmlnaHRcIjoge1xyXG4gICAgICAgICAgICAwOiBcIk5cIixcclxuICAgICAgICAgICAgMTogXCJuXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiQmlzaG9wXCI6IHtcclxuICAgICAgICAgICAgMDogXCJCXCIsXHJcbiAgICAgICAgICAgIDE6IFwiYlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIlJvb2tcIjoge1xyXG4gICAgICAgICAgICAwOiBcIlJcIixcclxuICAgICAgICAgICAgMTogXCJyXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiUXVlZW5cIjoge1xyXG4gICAgICAgICAgICAwOiBcIlFcIixcclxuICAgICAgICAgICAgMTogXCJxXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiS2luZ1wiOiB7XHJcbiAgICAgICAgICAgIDA6IFwiS1wiLFxyXG4gICAgICAgICAgICAxOiBcImtcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgY29uc3RhbnRzO1xyXG4iLCIvKiBFcnJvcnMuanMgKi9cclxudmFyIEVycm9ycyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEVycm9ycygpIHtcclxuICAgIH1cclxuICAgIC8vIFRPRE86IFVwZGF0ZSB0aGlzLlxyXG4gICAgRXJyb3JzLmNoZWNrR2FtZVR5cGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIChzdGF0ZS5nYW1lVHlwZSkgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi1FcnJvcjogVW5yZWNvZ25pemVkIHZhcmlhbnQgdHlwZS1cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEVycm9ycztcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgRXJyb3JzO1xyXG4iLCJ2YXIgUGllY2VUeXBlcztcclxuKGZ1bmN0aW9uIChQaWVjZVR5cGVzKSB7XHJcbiAgICBQaWVjZVR5cGVzW1BpZWNlVHlwZXNbXCJQYXduXCJdID0gMF0gPSBcIlBhd25cIjtcclxuICAgIFBpZWNlVHlwZXNbUGllY2VUeXBlc1tcIktuaWdodFwiXSA9IDFdID0gXCJLbmlnaHRcIjtcclxuICAgIFBpZWNlVHlwZXNbUGllY2VUeXBlc1tcIkJpc2hvcFwiXSA9IDJdID0gXCJCaXNob3BcIjtcclxuICAgIFBpZWNlVHlwZXNbUGllY2VUeXBlc1tcIlJvb2tcIl0gPSAzXSA9IFwiUm9va1wiO1xyXG4gICAgUGllY2VUeXBlc1tQaWVjZVR5cGVzW1wiS2luZ1wiXSA9IDRdID0gXCJLaW5nXCI7XHJcbiAgICBQaWVjZVR5cGVzW1BpZWNlVHlwZXNbXCJRdWVlblwiXSA9IDVdID0gXCJRdWVlblwiO1xyXG59KShQaWVjZVR5cGVzIHx8IChQaWVjZVR5cGVzID0ge30pKTtcclxuZXhwb3J0IGRlZmF1bHQgUGllY2VUeXBlcztcclxuIiwiaW1wb3J0IGNvbnN0YW50cyBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBIZWxwZXJGdW5jdGlvbnMgZnJvbSAnLi9IZWxwZXJGdW5jdGlvbnMnO1xyXG5pbXBvcnQgR2FtZVR5cGVzIGZyb20gJy4vSW50ZXJmYWNlcy9FbnVtcy9HYW1lVHlwZXMnO1xyXG5pbXBvcnQgU3RhbmRhcmRUdXJucyBmcm9tICcuL0ludGVyZmFjZXMvRW51bXMvU3RhbmRhcmRUdXJucyc7XHJcbmltcG9ydCBQaWVjZVR5cGVzIGZyb20gJy4vSW50ZXJmYWNlcy9FbnVtcy9QaWVjZVR5cGVzJztcclxudmFyIEV4ZWN1dGVUdXJuID0gZnVuY3Rpb24gKGdhbWUsIHBnbiwgaGlkZU91dHB1dCwgZGVidWcpIHtcclxuICAgIC8vIER1cmluZyBhIGNhc3RsZSwgdXNlIGZvciB0aGUga2luZy5cclxuICAgIHZhciBtb3ZlQ29yZCA9IHtcclxuICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgY29sdW1uOiAtMSxcclxuICAgICAgICAgICAgcm93OiAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVzdDoge1xyXG4gICAgICAgICAgICBjb2x1bW46IC0xLFxyXG4gICAgICAgICAgICByb3c6IC0xXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIFVzZWQgZm9yIHRoZSByb29rIGR1cmluZyBhIGNhc3RsZS5cclxuICAgIHZhciBtb3ZlQ29yZDIgPSB7XHJcbiAgICAgICAgc291cmNlOiB7XHJcbiAgICAgICAgICAgIGNvbHVtbjogLTEsXHJcbiAgICAgICAgICAgIHJvdzogLTFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc3Q6IHtcclxuICAgICAgICAgICAgY29sdW1uOiAtMSxcclxuICAgICAgICAgICAgcm93OiAtMVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAocGduID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBwZ24gcHJvdmlkZWRcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIHdoaXRlS2luZ1NpZGVDYXN0bGU6IGZhbHNlLFxyXG4gICAgICAgIHdoaXRlUXVlZW5TaWRlQ2FzdGxlOiBmYWxzZSxcclxuICAgICAgICBibGFja0tpbmdTaWRlQ2FzdGxlOiBmYWxzZSxcclxuICAgICAgICBibGFja1F1ZWVuU2lkZUNhc3RsZTogZmFsc2UsXHJcbiAgICAgICAga2luZ0xvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgIG1vdmVkUGllY2U6IG51bGwsXHJcbiAgICAgICAgbW92ZWRQaWVjZURlc3Q6IG51bGwsXHJcbiAgICAgICAgY2hlY2s6IChwZ24gPT0gbnVsbCkgPyBudWxsIDogKHBnbi5pbmRleE9mKFwiK1wiKSAhPT0gLTEpLFxyXG4gICAgICAgIGdhbWVJc092ZXI6IGZhbHNlLFxyXG4gICAgICAgIG1vdmVJc0ludmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIGludmFsaWRNb3ZlOiBudWxsLFxyXG4gICAgICAgIGVuYWJsZUVuUGFzc2FudDogbnVsbCxcclxuICAgICAgICBleGVjdXRlRW5QYXNzYW50OiBmYWxzZVxyXG4gICAgfTtcclxuICAgIC8vIFRPRE86IE1hbnVhbGx5IGNoZWNrIGZvciB0aGUga2luZyBnZXR0aW5nIHB1dCBpbiBjaGVja1xyXG4gICAgdmFyIGNhc3RsZSA9IGZhbHNlO1xyXG4gICAgaWYgKHBnbikge1xyXG4gICAgICAgIHZhciBjYXB0dXJlID0gKHBnbi5pbmRleE9mKFwieFwiKSAhPT0gLTEpO1xyXG4gICAgICAgIGlmIChnYW1lLmRlYnVnICYmICFoaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBHTiBwcm92aWRlZDogXCIgKyBwZ24pO1xyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgcGduIG1vdmVcclxuICAgICAgICBzd2l0Y2ggKHBnbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiMC0wXCI6IC8vIEtpbmcgc2lkZSBjYXN0bGVcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogYWRkIHZhbGlkYXRpb25cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGNhc3RsZSBpcyBsZWdhbCBmb3IgdGhlIHBvc2l0aW9uLlxyXG4gICAgICAgICAgICAgICAgaWYgKChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuc3RhdGUuZmVuRXh0cmFzLmNhc3RsaW5nLmluZGV4T2YoXCJLXCIpICE9PSAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoZ2FtZS5nZXRUdXJuKCkgPT09IFN0YW5kYXJkVHVybnMuYmxhY2sgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5zdGF0ZS5mZW5FeHRyYXMuY2FzdGxpbmcuaW5kZXhPZihcImtcIikgIT09IC0xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2NlZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgbW92ZSBmb3Iga2luZy5cclxuICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZC5kZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c6IChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyA3IDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiA2XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZC5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IDRcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBtb3ZlIGZvciByb29rLlxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkMi5kZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c6IChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyA3IDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiA1XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZDIuc291cmNlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c6IChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyA3IDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiA3XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lLmdldFR1cm4oKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZS5zdGF0ZS5mZW5FeHRyYXMuY2FzdGxpbmcuaW5kZXhPZihcIktcIikgIT09IC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiS2luZyBzaWRlIGNhc3RsaW5nIGlzIG5vdCBsZWdhbCBpbiB0aGUgY3VycmVudCBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRUdXJuKCkgPT09IFN0YW5kYXJkVHVybnMud2hpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQud2hpdGVLaW5nU2lkZUNhc3RsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy5ibGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ibGFja0tpbmdTaWRlQ2FzdGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc3RsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQua2luZ0xvY2F0aW9uID0gbW92ZUNvcmQuZGVzdDsgLy8gS2VlcCB0cmFjayBvZiB3aGVyZSB0aGUga2luZyBsYW5kcyBmb3IgY2hlY2tpbmcgY2hlY2ttYXRlLlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwLTAtMFwiOiAvL1F1ZWVuIHNpZGUgY2FzdGxlXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBjYXN0bGUgaXMgbGVnYWwuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5zdGF0ZS5mZW5FeHRyYXMuY2FzdGxpbmcuaW5kZXhPZihcIlFcIikgIT09IC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy5ibGFjayAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnN0YXRlLmZlbkV4dHJhcy5jYXN0bGluZy5pbmRleE9mKFwicVwiKSAhPT0gLTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBtb3ZlIGZvciBraW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkLmRlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IDJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkLnNvdXJjZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93OiAoZ2FtZS5nZXRUdXJuKCkgPT09IFN0YW5kYXJkVHVybnMud2hpdGUpID8gNyA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogNFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IG1vdmUgZm9yIHJvb2suXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZUNvcmQyLmRlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IDNcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkMi5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IDBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUXVlZW4gc2lkZSBjYXN0bGluZyBpcyBub3QgbGVnYWwgaW4gdGhlIGN1cnJlbnQgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LndoaXRlUXVlZW5TaWRlQ2FzdGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLmJsYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJsYWNrUXVlZW5TaWRlQ2FzdGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc3RsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQua2luZ0xvY2F0aW9uID0gbW92ZUNvcmQuZGVzdDsgLy8gS2VlcCB0cmFjayBvZiB3aGVyZSB0aGUga2luZyBsYW5kcyBmb3IgY2hlY2tpbmcgY2hlY2ttYXRlLlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIE5vcm1hbCBtb3ZlICBcclxuICAgICAgICAgICAgICAgIHZhciBwaWVjZSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGduWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk5cIjogLy8gS25pZ2h0IG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UgPSAoZ2FtZS5nZXRUdXJuKCkgPT09IFN0YW5kYXJkVHVybnMud2hpdGUpID8gJ04nIDogJ24nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZC5kZXN0ID0gSGVscGVyRnVuY3Rpb25zLmZpbmRQaWVjZURlc3RpbmF0aW9uKHBnbiwgZ2FtZS5nZXRUdXJuKCksIGdhbWUuZ2FtZVR5cGUsIGNhcHR1cmUsIGhpZGVPdXRwdXQsIGRlYnVnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNvcmQuc291cmNlID0gZmluZFBpZWNlU291cmNlKGdhbWUuc3RhdGUuYm9hcmQsIHBnbiwgcGllY2UsIG1vdmVDb3JkLmRlc3QsIGdhbWUuZ2FtZVR5cGUsIGRlYnVnLCBoaWRlT3V0cHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1vdmVkUGllY2UgPSBQaWVjZVR5cGVzLktuaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkJcIjogLy8gQmlzaG9wIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UgPSAoZ2FtZS5nZXRUdXJuKCkgPT09IFN0YW5kYXJkVHVybnMud2hpdGUpID8gJ0InIDogJ2InO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZC5kZXN0ID0gSGVscGVyRnVuY3Rpb25zLmZpbmRQaWVjZURlc3RpbmF0aW9uKHBnbiwgZ2FtZS5nZXRUdXJuKCksIGdhbWUuZ2FtZVR5cGUsIGNhcHR1cmUsIGhpZGVPdXRwdXQsIGRlYnVnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNvcmQuc291cmNlID0gZmluZFBpZWNlU291cmNlKGdhbWUuc3RhdGUuYm9hcmQsIHBnbiwgcGllY2UsIG1vdmVDb3JkLmRlc3QsIGdhbWUuZ2FtZVR5cGUsIGRlYnVnLCBoaWRlT3V0cHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1vdmVkUGllY2UgPSBQaWVjZVR5cGVzLkJpc2hvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJcIjogLy8gUm9vayBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlID0gKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/ICdSJyA6ICdyJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNvcmQuZGVzdCA9IEhlbHBlckZ1bmN0aW9ucy5maW5kUGllY2VEZXN0aW5hdGlvbihwZ24sIGdhbWUuZ2V0VHVybigpLCBnYW1lLmdhbWVUeXBlLCBjYXB0dXJlLCBoaWRlT3V0cHV0LCBkZWJ1Zyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkLnNvdXJjZSA9IGZpbmRQaWVjZVNvdXJjZShnYW1lLnN0YXRlLmJvYXJkLCBwZ24sIHBpZWNlLCBtb3ZlQ29yZC5kZXN0LCBnYW1lLmdhbWVUeXBlLCBkZWJ1ZywgaGlkZU91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb3ZlZFBpZWNlID0gUGllY2VUeXBlcy5Sb29rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUVwiOiAvLyBRdWVlbiBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlID0gKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/ICdRJyA6ICdxJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNvcmQuZGVzdCA9IEhlbHBlckZ1bmN0aW9ucy5maW5kUGllY2VEZXN0aW5hdGlvbihwZ24sIGdhbWUuZ2V0VHVybigpLCBnYW1lLmdhbWVUeXBlLCBjYXB0dXJlLCBoaWRlT3V0cHV0LCBkZWJ1Zyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkLnNvdXJjZSA9IGZpbmRQaWVjZVNvdXJjZShnYW1lLnN0YXRlLmJvYXJkLCBwZ24sIHBpZWNlLCBtb3ZlQ29yZC5kZXN0LCBnYW1lLmdhbWVUeXBlLCBkZWJ1ZywgaGlkZU91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb3ZlZFBpZWNlID0gUGllY2VUeXBlcy5RdWVlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIktcIjogLy8gS2luZyBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlID0gKGdhbWUuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/ICdLJyA6ICdrJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUNvcmQuZGVzdCA9IEhlbHBlckZ1bmN0aW9ucy5maW5kUGllY2VEZXN0aW5hdGlvbihwZ24sIGdhbWUuZ2V0VHVybigpLCBnYW1lLmdhbWVUeXBlLCBjYXB0dXJlLCBoaWRlT3V0cHV0LCBkZWJ1Zyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVDb3JkLnNvdXJjZSA9IGZpbmRQaWVjZVNvdXJjZShnYW1lLnN0YXRlLmJvYXJkLCBwZ24sIHBpZWNlLCBtb3ZlQ29yZC5kZXN0LCBnYW1lLmdhbWVUeXBlLCBkZWJ1ZywgaGlkZU91dHB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5raW5nTG9jYXRpb24gPSBtb3ZlQ29yZC5kZXN0OyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSBraW5nIGxhbmRzIGZvciBjaGVja2luZyBjaGVja21hdGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb3ZlZFBpZWNlID0gUGllY2VUeXBlcy5LaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAvLyBQYXduIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWUuZGVidWcgJiYgIWhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj09UGF3biBNb3ZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZCA9IHBnblRvQ29yZFBhd24oZ2FtZS5zdGF0ZS5ib2FyZCwgcGduLCBnYW1lLmdldFR1cm4oKSwgZ2FtZS5nYW1lVHlwZSwgaGlkZU91dHB1dCwgZGVidWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubW92ZWRQaWVjZSA9IFBpZWNlVHlwZXMuUGF3bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGEgcGF3biBtb3ZlZCAyIHNwYWNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW92ZUNvcmQuZGVzdC5yb3cgLSBtb3ZlQ29yZC5zb3VyY2Uucm93ID09PSAyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlQ29yZC5kZXN0LnJvdyAtIG1vdmVDb3JkLnNvdXJjZS5yb3cgPT09IC0yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93RGlmZmVyZW5jZSA9IChnYW1lLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyAxIDogLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZW5hYmxlRW5QYXNzYW50ID0gXCJcIiArIHBnblswXSArIE1hdGguYWJzKC1wZ25bMV0gKyByb3dEaWZmZXJlbmNlKTsgLy8gVGhpcyBzaG91bGQgd29yayBidXQgb3VnaHQgdG8gYmUgdGVzdGVkIFRPRE86XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vdmVDb3JkLmRlc3QuY29sdW1uICE9PSBtb3ZlQ29yZC5zb3VyY2UuY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZXhlY3V0ZUVuUGFzc2FudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkZWFsIHdpdGggZmVuJ3MgZW4gcGFzc2FudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQubW92ZWRQaWVjZURlc3QgPSBtb3ZlQ29yZC5kZXN0O1xyXG4gICAgICAgIC8vIFRPRE86IG1vdmUgdGhpcyBmdW5jdGlvbiBpbnRvIHRoZSBnYW1lU3RhdGUgc3VjaCB0aGF0IG9ubHkgdGhlIGdhbWUgc3RhdGUgY2FuIHVwZGF0ZSB0aGUgYm9hcmQuXHJcbiAgICAgICAgZ2FtZS5zdGF0ZS5ib2FyZCA9IHVwZGF0ZUJvYXJkQnlDb3JkKGdhbWUuc3RhdGUuYm9hcmQsIG1vdmVDb3JkLCByZXN1bHQuZXhlY3V0ZUVuUGFzc2FudCwgZ2FtZS5nZXRUdXJuKCksIGdhbWUuZGVidWcsIGhpZGVPdXRwdXQpO1xyXG4gICAgICAgIGlmIChjYXN0bGUpXHJcbiAgICAgICAgICAgIGdhbWUuc3RhdGUuYm9hcmQgPSB1cGRhdGVCb2FyZEJ5Q29yZChnYW1lLnN0YXRlLmJvYXJkLCBtb3ZlQ29yZDIsIGZhbHNlLCBudWxsLCBnYW1lLmRlYnVnLCBoaWRlT3V0cHV0KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBubyBwZ24gcHJvdmlkZWRcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBFeGVjdXRlVHVybjtcclxuLypcclxuICogUGFyYW1zOlxyXG4gKiAgICAgIC0gVGhlIGJvYXJkIGFzIGEgMmQgYXJyYXlcclxuICogICAgICAtIGFuIG9iamVjdCBob2xkaW5nIHRoZSB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBvZiB0aGUgbW92ZVxyXG4gKiAgICAgIC0gW09QVElPTkFMXSBmbGFnIGZvciBkZWJ1Z2dpbmcgcHJpbnRpbmdcclxuICogUmV0dXJuczogQSBuZXcgMmQgYXJyYXkgd2l0aCAxIHBpZWNlIGluIGEgZGlmZmVyZW50IHBsYWNlXHJcbiAqL1xyXG52YXIgdXBkYXRlQm9hcmRCeUNvcmQgPSBmdW5jdGlvbiAoYm9hcmQsIG1vdmVDb3JkLCBlblBhc3NhbnQsIHR1cm4sIGRlYnVnLCBoaWRlT3V0cHV0KSB7XHJcbiAgICB2YXIgbmV3Qm9hcmQgPSBib2FyZDtcclxuICAgIGlmIChkZWJ1ZyAmJiAhaGlkZU91dHB1dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1vdmVDb3JkKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFeGVjdXRpbmcgbW92ZTogXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGJvYXJkW21vdmVDb3JkLnNvdXJjZS5yb3ddW21vdmVDb3JkLnNvdXJjZS5jb2x1bW5dICsgXCIgLT4gXCJcclxuICAgICAgICAgICAgKyBib2FyZFttb3ZlQ29yZC5kZXN0LnJvd11bbW92ZUNvcmQuZGVzdC5jb2x1bW5dKTtcclxuICAgIH1cclxuICAgIG5ld0JvYXJkW21vdmVDb3JkLmRlc3Qucm93XVttb3ZlQ29yZC5kZXN0LmNvbHVtbl0gPSBib2FyZFttb3ZlQ29yZC5zb3VyY2Uucm93XVttb3ZlQ29yZC5zb3VyY2UuY29sdW1uXTtcclxuICAgIG5ld0JvYXJkW21vdmVDb3JkLnNvdXJjZS5yb3ddW21vdmVDb3JkLnNvdXJjZS5jb2x1bW5dID0gXCJYXCI7XHJcbiAgICBpZiAoZW5QYXNzYW50KSB7XHJcbiAgICAgICAgdmFyIHJvd0RpZmZlcmVuY2UgPSAodHVybiA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyAxIDogLTE7XHJcbiAgICAgICAgbmV3Qm9hcmRbbW92ZUNvcmQuZGVzdC5yb3cgKyByb3dEaWZmZXJlbmNlXVttb3ZlQ29yZC5kZXN0LmNvbHVtbl0gPSBcIlhcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdCb2FyZDtcclxufTtcclxuLy8gUGFyYW1zOiAtIEJvYXJkIGFzIGEgMmQgYXJyYXlcclxuLy8gICAgICAgICAtIFBnbiBtb3ZlXHJcbi8vICAgICAgICAgLSBQbGF5ZXJzIHR1cm4gKHcvYilcclxuLy8gICAgICAgICAtIEdhbWUgdmFyaWFudCB0eXBlXHJcbi8vIERvbmUgd2l0aCBwZ24sIHJldHVybnMgY29yZGluYXRlcyBvZiBwaWVjZSBzb3VyY2UgYW5kIGRlc2luYXRpb25cclxuLy8gTm90ZTogRG9lc24ndCB3b3JrIHdpdGggYnVnIGhvdXNlIHdoZW4gZmluaW5kIHBpZWNlIGxvY2F0aW9uXHJcbi8vIFJldHVybjogTmV3IG1vZGVkIGJvYXJkIGFzIGEgc3RyaW5nXHJcbnZhciBwZ25Ub0NvcmRQYXduID0gZnVuY3Rpb24gKGJvYXJkLCBwZ24sIHR1cm4sIGdhbWVUeXBlLCBoaWRlT3V0cHV0LCBkZWJ1Zykge1xyXG4gICAgLy8gY29uc29sZS5sb2coYERFQlVHOiAke2RlYnVnfWApXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgaGlkZU91dHB1dDogJHtoaWRlT3V0cHV0fWApXHJcbiAgICBpZiAoZGVidWcgJiYgIWhpZGVPdXRwdXQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIn5+fnBnblRvQ29yZFBhd25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0dXJuOiBcIiArIFN0YW5kYXJkVHVybnNbdHVybl0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGduOiBcIiArIHBnbik7XHJcbiAgICB9XHJcbiAgICB2YXIgbW92ZU9iaiA9IHtcclxuICAgICAgICBzb3VyY2U6IHtcclxuICAgICAgICAgICAgY29sdW1uOiAtMSxcclxuICAgICAgICAgICAgcm93OiAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVzdDoge1xyXG4gICAgICAgICAgICBjb2x1bW46IC0xLFxyXG4gICAgICAgICAgICByb3c6IC0xXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZhciBjYXB0dXJlID0gKHBnbi5pbmRleE9mKFwieFwiKSAhPT0gLTEpO1xyXG4gICAgdmFyIHBpZWNlID0gXCJcIjtcclxuICAgIHN3aXRjaCAoZ2FtZVR5cGUpIHtcclxuICAgICAgICBjYXNlIEdhbWVUeXBlcy5zdGFuZGFyZDpcclxuICAgICAgICAgICAgaWYgKHR1cm4gPT09IFN0YW5kYXJkVHVybnMuYmxhY2spIHtcclxuICAgICAgICAgICAgICAgIHBpZWNlID0gXCJwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwaWVjZSA9IFwiUFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdhbWUgdmFyaWFudCAnXCIgKyBnYW1lVHlwZSArIFwiJyBub3QgeWV0IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIG1vdmVPYmouZGVzdCA9IEhlbHBlckZ1bmN0aW9ucy5maW5kUGllY2VEZXN0aW5hdGlvbihwZ24sIHR1cm4sIGdhbWVUeXBlLCBjYXB0dXJlLCBoaWRlT3V0cHV0LCBkZWJ1Zyk7XHJcbiAgICBpZiAocGllY2UgPT09IFwicFwiIHx8IHBpZWNlID09PSBcIlBcIilcclxuICAgICAgICBtb3ZlT2JqLnNvdXJjZSA9IGdldFBpZWNlTG9jYXRpb24oYm9hcmQsIHBnbiwgcGllY2UsIGdhbWVUeXBlLCBoaWRlT3V0cHV0KTtcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG1vdmVPYmouc291cmNlID0gZmluZFBpZWNlU291cmNlKGJvYXJkLCBwZ24sIHBpZWNlLCBtb3ZlT2JqLmRlc3QsIGdhbWVUeXBlLCBkZWJ1ZywgaGlkZU91dHB1dCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVidWcgJiYgIWhpZGVPdXRwdXQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBpZWNlJ3MgbG9jYXRpb25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIoXCIgKyBtb3ZlT2JqLnNvdXJjZS5jb2x1bW4gKyBcIixcIiArIG1vdmVPYmouc291cmNlLnJvdyArIFwiKVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBpZWNlJ3MgRGVzdGluYXRpb25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIoXCIgKyBtb3ZlT2JqLmRlc3QuY29sdW1uICsgXCIsXCIgKyBtb3ZlT2JqLmRlc3Qucm93ICsgXCIpXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vdmVPYmo7XHJcbn07XHJcbi8qXHJcbiAqIFBhcmFtZXRlcnM6XHJcbiAqICAgICAgLSBSb3cgdG8gaW5zZXJ0IHBpZWNlIGluICAgICAgICAgICAgICAgIGFzIGFuIGFycmF5XHJcbiAqICAgICAgLSBQaWVjZSB0byBwbGFjZSBpbiByb3cgICAgICAgICAgICAgICAgIGFzIGEgc3RyaW5nXHJcbiAqICAgICAgLSBDb2x1bW4gdGhhdCB0aGUgcGllY2Ugc2hvdWxkIGdvIGluICAgIGFzIGEgbnVtYmVyXFw/XHJcbiAqIFJldHVybnM6IEEgcm93IHdpdGggdGhlIHBpZWNlIGluc2VydGVkICAgICAgIGFzIGFuIGFycmF5XHJcbiAqL1xyXG52YXIgcGxhY2VQaWVjZUluUm93ID0gZnVuY3Rpb24gKHJvdywgcGllY2UsIGNvbCkge1xyXG4gICAgdmFyIG5ld1JvdyA9IFtdO1xyXG4gICAgdmFyIGxlZnROdW1iZXIgPSAwO1xyXG4gICAgdmFyIHJpZ2h0TnVtYmVyID0gMDtcclxuICAgIHZhciBudW1iZXJPZlBpZWNlID0gMDtcclxuICAgIGlmIChyb3cgPT09IFwiOFwiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPCBjb2wpIHtcclxuICAgICAgICAgICAgICAgIGxlZnROdW1iZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpID4gY29sKSB7XHJcbiAgICAgICAgICAgICAgICByaWdodE51bWJlcisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1Jvdy5wdXNoKGxlZnROdW1iZXIpO1xyXG4gICAgICAgIG5ld1Jvdy5wdXNoKHBpZWNlKTtcclxuICAgICAgICBuZXdSb3cucHVzaChyaWdodE51bWJlcik7XHJcbiAgICAgICAgLy8gICAgIGlmIChpIDwgY29sKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZWZ0TnVtYmVyKytcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIGlmIChpIOOAgD49IGNvbCkge1xyXG4gICAgICAgIC8vICAgICByaWdodFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTkVXIFJPVzogXCIgKyBuZXdSb3cpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3Um93O1xyXG4gICAgLy9FcnJvcihcIk5vIHlldCBpbXBsZW1lbnRlZFwiKVxyXG59O1xyXG4vKlxyXG4gKiBQYXJhbWV0ZXJzOlxyXG4gKiAgICAgIC0gYm9hcmQgYXMgMmQgYXJyYXlcclxuICogICAgICAtIFBHTiBtb3ZlXHJcbiAqICAgICAgLSBQaWVjZSB0byBmaW5kXHJcbiAqICAgICAgLSBnYW1lIHR5cGUgW09QVElPTkFMXUZcclxuICovXHJcbi8vIFRPRE86IERlYWwgd2l0aCBzaXR1dGF0aW9uIHdoZXJlIHRoZXJlIGFyZSAyIHBpZWNlcyBpbiB0aGUgc2FtZSBjb2x1bW4gdGhhdCBjYW4gbW92ZSB0byB0aGUgc2FtZSBzcXVhcmUuXHJcbnZhciBnZXRQaWVjZUxvY2F0aW9uID0gZnVuY3Rpb24gKGJvYXJkLCBwZ24sIHBpZWNlLCBnYW1lVHlwZSwgaGlkZU91dHB1dCwgZGVidWcpIHtcclxuICAgIC8vIEdldCBsb2NcclxuICAgIGlmIChkZWJ1ZyAmJiAhaGlkZU91dHB1dCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0UGllY2VMb2NhdGlvbn5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJwaWVjZTogXCIgKyBwaWVjZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgY29sID0gbnVsbDtcclxuICAgIHZhciBwb3NzaWJsZUNvbCA9IFtdO1xyXG4gICAgdmFyIHBvc3NpYmxlQ29yZHMgPSBbXTtcclxuICAgIC8vIElmIHBhd25cclxuICAgIGlmIChwaWVjZSA9PT0gXCJwXCIgfHwgcGllY2UgPT09IFwiUFwiKSB7XHJcbiAgICAgICAgY29sID0gZ2V0UEdORHJvcENvbHVtbihwZ24pO1xyXG4gICAgICAgIGlmIChkZWJ1ZyAmJiAhaGlkZU91dHB1dClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb2w6IFwiICsgY29sICsgXCIgcGduOiBcIiArIHBnbik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPOiByZW1vdmUgZXZlcnl0aGluZyBpbiB0aGlzIGNvbmRpdGlvbi5cclxuICAgICAgICAvLyBUT0RPOiBhZGQgdmFsaWRhdGlvbiB0byBtYWtlIHN1cmUgdGhlIHVzZXIgZGlkbid0IGlucHV0IGNvcnJlY3RseVxyXG4gICAgICAgIC8vIE9ubHkgb25lIHBpZWNlIHRoYXQgY2FuIGdvIHRvIHRoZSBkZXN0IHNxdWFyZVxyXG4gICAgICAgIGlmIChwZ24ubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgIHZhciBiID0geyBjb2x1bW46IC0xLCByb3c6IC0xIH07XHJcbiAgICAgICAgICAgIGIuY29sdW1uID0gY2hhclRvQ29sdW1uTnVtYmVyKHBnblsxXSk7XHJcbiAgICAgICAgICAgIC8vYi5jb2x1bW5cclxuICAgICAgICAgICAgYi5yb3cgPSA4IC0gK3BnblsyXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVHdvIHBpZWNlcyAoaW4gc3RhbmRhcmQpIGNhbiBsYW5kIG9uIHRoZSBkZXN0IHNxdWFyZVxyXG4gICAgICAgIGVsc2UgaWYgKHBnbi5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNvbWV0aGluZydzIHdyb25nIGluIHRoZSBuZWlnaGJvcmhvb2QuIFdobyB5b3UgZ29ubmEgY2FsbD8/P1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29sID0gZ2V0UEdORHJvcENvbHVtbihwZ24pO1xyXG4gICAgICAgIHZhciBwaWVjZVNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgcGllY2VTb3VyY2UuY29sdW1uID0gK2NvbDtcclxuICAgICAgICBwaWVjZVNvdXJjZS5yb3cgPSAtMTtcclxuICAgIH1cclxuICAgIHZhciBwaWVjZXNJbkNvbCA9IFtdO1xyXG4gICAgYm9hcmQuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgcGllY2VzSW5Db2wucHVzaChyb3dbY29sXSk7XHJcbiAgICB9KTtcclxuICAgIHZhciBsb2NhdGVkUGllY2VSb3cgPSAtMTtcclxuICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICBpZiAoZ2FtZVR5cGUgPT0gdW5kZWZpbmVkIHx8IGdhbWVUeXBlID09PSBHYW1lVHlwZXMuc3RhbmRhcmQpIHtcclxuICAgICAgICBwaWVjZXNJbkNvbC5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICAgIGlmIChkZWJ1ZyAmJiAhaGlkZU91dHB1dClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicDogXCIgKyBwKTtcclxuICAgICAgICAgICAgaWYgKHAgPT09IHBpZWNlKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGVkUGllY2VSb3cgPSBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRVJST1I6IFRPRE86IEltcGxlbWVudCBmb3Igbm9uLXN0YW5kYXJkIGdhbWUgdmFyaWFudHNcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFwiY29sdW1uXCI6IGNvbCxcclxuICAgICAgICBcInJvd1wiOiBsb2NhdGVkUGllY2VSb3dcclxuICAgIH07XHJcbn07XHJcbnZhciBmaW5kUGllY2VTb3VyY2UgPSBmdW5jdGlvbiAoYm9hcmQsIHBnbiwgcGllY2UsIGRlc3QsIGdhbWVUeXBlLCBkZWJ1ZywgaGlkZU91dHB1dCkge1xyXG4gICAgc3dpdGNoIChnYW1lVHlwZSkge1xyXG4gICAgICAgIGNhc2UgR2FtZVR5cGVzLnN0YW5kYXJkOlxyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTb3VyY2VzXzEgPSBbXTtcclxuICAgICAgICAgICAgLy8gRmluZCBhbGwgcG9zc2libGUgc291cmNlcyBvbiB0aGUgbWFwIGZvciB0aGUgcHJvdmlkZWQgcGllY2UuXHJcbiAgICAgICAgICAgIGNvbnN0YW50cy5QaWVjZUxvZ2ljW2NvbnN0YW50c1tcIlBpZWNlUEdOVG9OYW1lXCJdW3BpZWNlXV0uZm9yRWFjaChmdW5jdGlvbiAoc3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3F1YXJlLmNvbHVtbiArIGRlc3QuY29sdW1uIDwgOCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZS5jb2x1bW4gKyBkZXN0LmNvbHVtbiA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLnJvdyArIGRlc3Qucm93IDwgOCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZS5yb3cgKyBkZXN0LnJvdyA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlU291cmNlc18xLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IHNxdWFyZS5jb2x1bW4gKyBkZXN0LmNvbHVtbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBzcXVhcmUucm93ICsgZGVzdC5yb3dcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBhbnNfMiA9IFtdO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInBpZWNlOiBcIiArIHBpZWNlKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRlc3Q6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGVzdCkpXHJcbiAgICAgICAgICAgIC8vIEZpbmQgd2hpY2ggb2YgdGhlIHBvc3NpYmxlIHNvdXJjZXMgaXMgdGhlIHJlYWwgc291cmNlXHJcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgbG9naWMgZm9yIFJvb2tzXHJcbiAgICAgICAgICAgIGlmIChwaWVjZSA9PT0gXCJSXCIgfHwgcGllY2UgPT09IFwiclwiKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZVNvdXJjZXNfMS5mb3JFYWNoKGZ1bmN0aW9uIChwb3NzaWJsZVNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYm9hcmRbcG9zc2libGVTb3VyY2Uucm93XVtwb3NzaWJsZVNvdXJjZS5jb2x1bW5dKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtwb3NzaWJsZVNvdXJjZS5yb3ddW3Bvc3NpYmxlU291cmNlLmNvbHVtbl0gPT09IHBpZWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc18yLnB1c2gocG9zc2libGVTb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gT25jZSB3ZSBoYXZlIHRoZSB0d28gcG9zc2libGUgbG9jYXRpb25zLCBjaGVjayB0aGUgc3F1YXJlcyBiZXR3ZWVuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgcG9zc2libGUgbG9jYXRpb24gYW5kIHRoZSBkZXN0aW5hdGlvbiBzcXVhcmUgZm9yIG90aGVyIHBpZWNlcy5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgYW5zXzEgPSBhbnNfMjsgX2kgPCBhbnNfMS5sZW5ndGg7IF9pKyspIHsgLy8gVE9ETzogYWRkIGxvdHMgb2YgdW5pdCB0ZXN0aW5nIGhlcmUgYW5kIGNoZWNrIGZvciBtb3Zpbmcgcm9va3MgaW4gY29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZVNvdXJjZSA9IGFuc18xW19pXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcG9zc2libGVTb3VyY2Uucm93O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uc3RhbnRzLkJvYXJkV2lkdGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sMSA9IHBvc3NpYmxlU291cmNlLmNvbHVtbiArIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbDIgPSBwb3NzaWJsZVNvdXJjZS5jb2x1bW4gLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtyb3ddW2NvbDFdICE9PSB1bmRlZmluZWQgJiYgYm9hcmRbcm93XVtjb2wxXSAhPT0gXCJYXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBUaGlzIGlzIG5vdCB0aGUgb25lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYm9hcmRbcm93XVtjb2wxXSAhPT0gdW5kZWZpbmVkICYmIGJvYXJkW3Jvd11bY29sMl0gIT09IFwiWFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gVGhpcyBpcyBub3QgdGhlIG9uZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChjb2wxID09PSBkZXN0LmNvbHVtbiAmJiByb3cgPT09IGRlc3Qucm93KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbDIgPT09IGRlc3QuY29sdW1uICYmIHJvdyA9PT0gZGVzdC5yb3cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3NzaWJsZVNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTm9ybWFsIHJ1bGVzXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9zc2libGVTb3VyY2VzXzEuZm9yRWFjaChmdW5jdGlvbiAocG9zc2libGVTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGJvYXJkW3Bvc3NpYmxlU291cmNlLnJvd11bcG9zc2libGVTb3VyY2UuY29sdW1uXSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbcG9zc2libGVTb3VyY2Uucm93XVtwb3NzaWJsZVNvdXJjZS5jb2x1bW5dID09PSBwaWVjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnNfMi5wdXNoKHBvc3NpYmxlU291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDb21wbGV4IHNlbmFyaW9cclxuICAgICAgICAgICAgaWYgKGFuc18yLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuc3dlcl8xO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50XzEgPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXh0cmEgY2hhcmFjdGVyIGluIHRoZSBwZ24gYW5kIGl0J3MgYSBsZXR0ZXIsIHRodXMgcmVwcmVzZW50aW5nIHRoZSBzb3VyY2UgY29sdW1uLCB1c2UgdGhhdCBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmIChwZ24ubGVuZ3RoID09PSA0ICYmICFIZWxwZXJGdW5jdGlvbnMuaXNOdW1lcmljKHBnblsxXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbnNfMi5mb3JFYWNoKGZ1bmN0aW9uIChwb3NzaWJsZVNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVTb3VyY2UuY29sdW1uID09PSBjaGFyVG9Db2x1bW5OdW1iZXIocGduWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRfMSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocG9zc2libGVTb3VyY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJfMSA9IHBvc3NpYmxlU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBleHRyYSBjaGFyYWN0ZXIgaW4gdGhlIHBnbiBhbmQgaXQncyBhIG51bWJlciwgdGh1cyByZXByZXNlbnRpbmcgdGhlIHNvdXJjZSByb3csIHVzZSB0aGF0IHJvd1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGduLmxlbmd0aCA9PT0gNCAmJiBIZWxwZXJGdW5jdGlvbnMuaXNOdW1lcmljKHBnblsxXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbnNfMi5mb3JFYWNoKGZ1bmN0aW9uIChwb3NzaWJsZVNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1bml0IHRlc3QgdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zc2libGVTb3VyY2Uucm93ID09PSArcGduWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudF8xKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJfMSA9IHBvc3NpYmxlU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwb3NzaWJsZVNvdXJjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSnVzdCBhIGxpdHRsZSBiaXQgb2YgZXJyb3IgY2hlY2tpbmcgXHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnRfMSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHBpZWNlIGZvdW5kIGNhcGFiaWxlIG9mIG1vdmluZyB0byB0aGUgZGVzdGluYXRpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50XzEgIT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU29tZXRoaW5nIHdlbnQgd3JvbmcgYW5kIHRvbyBtYW55IHBvc3NpYmxlIHBpZWNlIHNvdXJjZXMgd2VyZSBmb3IgdGhpcyBtb3ZlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcl8xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoaWRlT3V0cHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYW5zXzJbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc18yWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHYW1lIHR5cGUgXCIgKyBnYW1lVHlwZSArIFwiIG5vdCB5ZXQgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG59O1xyXG4vKlxyXG4gKiBQYXJhbWV0ZXJzOlxyXG4gKiAgICAtIHBnbiBub3RhdGlvblxyXG4gKiBSZXR1cm5zOlxyXG4gKiAgICBOdW1lcmljIG1hcHBlZCB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBsZXR0ZXIgY29sdW1uIG9mIHRoZSBib2FyZFxyXG4gKi9cclxudmFyIGdldFBHTkRyb3BDb2x1bW4gPSBmdW5jdGlvbiAocGduKSB7XHJcbiAgICAvLyBJZiB0aGUgZmlyc3QgbGV0dGVyIG9mIHRoZSBwZ24gaXMgdXBwZXIgY2FzZSwgdGhlbiBpdCBpcyB0aGUgcGllY2UgdGhhdCBpcyBtb3ZpbmcuXHJcbiAgICBpZiAocGduWzBdID09PSBwZ25bMF0udG9VcHBlckNhc2UoKSkgeyAvL0NoZWNrIGlmIGlzIHVwcGVyIGNhc2VcclxuICAgICAgICAvLyBJZiBjYXB0dXJlXHJcbiAgICAgICAgaWYgKHBnblsxXSA9PT0gXCJ4XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBnblsyXS5jaGFyQ29kZUF0KDApIC0gOTc7IC8vIFJldHVybiBjb2x1bW4gYXMgYSBudW1iZXIgKCAnYScgbWFwcGVkIHRvIDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5vIGNhcHR1cmVcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBnblsxXS5jaGFyQ29kZUF0KDApIC0gOTc7IC8vIFJldHVybiBjb2x1bW4gYXMgYSBudW1iZXIgKCAnYScgbWFwcGVkIHRvIDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBnblswXS5jaGFyQ29kZUF0KDApIC0gOTc7IC8vIFJldHVybiBjb2x1bW4gYXMgYSBudW1iZXIgKCAnYScgbWFwcGVkIHRvIDApXHJcbiAgICB9XHJcbn07XHJcbnZhciBjaGFyVG9Db2x1bW5OdW1iZXIgPSBmdW5jdGlvbiAoY2hhcikge1xyXG4gICAgcmV0dXJuIGNoYXJbMF0uY2hhckNvZGVBdCgwKSAtIDk3O1xyXG59O1xyXG52YXIgdGVzdE1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAxO1xyXG59O1xyXG4iLCJpbXBvcnQgSGVscGVyRnVuY3Rpb25zIGZyb20gJy4vSGVscGVyRnVuY3Rpb25zJztcclxuaW1wb3J0IFN0YW5kYXJkVHVybnMgZnJvbSAnLi9JbnRlcmZhY2VzL0VudW1zL1N0YW5kYXJkVHVybnMnO1xyXG4vLyBUdXJucyBhIGZlbiBzdHJpbmcgaW50byBhIDJkIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIGEgYm9hcmRcclxudmFyIEZlbkxvZ2ljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmVuTG9naWMoKSB7XHJcbiAgICB9XHJcbiAgICBGZW5Mb2dpYy5GZW5Ub0JvYXJkID0gZnVuY3Rpb24gKGZlbikge1xyXG4gICAgICAgIGlmIChmZW4gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgZmVuIHZhbGlkYXRpb25cclxuICAgICAgICAgICAgdmFyIGJvYXJkXzEgPSBBcnJheSgpO1xyXG4gICAgICAgICAgICBmZW4uc3BsaXQoXCIvXCIpLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvd0FyciA9IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICByb3cuc3BsaXQoXCJcIikuZm9yRWFjaChmdW5jdGlvbiAocGllY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaiA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEhlbHBlckZ1bmN0aW9ucy5pc051bWVyaWMocGllY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE51bWJlcihwaWVjZSk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0Fyci5wdXNoKFwiWFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0Fyci5wdXNoKHBpZWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJvYXJkXzEucHVzaChyb3dBcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGJvYXJkXzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIEZlbiBQcm92aWRlZFwiKTtcclxuICAgIH07XHJcbiAgICAvKlxyXG4gICAgICogUGFyYW1zOlxyXG4gICAgICogICAgICAtIEJvYXJkIGFzIGEgMmQgYXJyYXlcclxuICAgICAqICAgICAgLSBFeHRyYSBmZW4gaW5mb3JtYXRpb24gYXMgYW4gb2JqZWN0XHJcbiAgICAgKiBSZXR1cm5zOiBBIGZlbiBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBnYW1lXHJcbiAgICAgKi9cclxuICAgIEZlbkxvZ2ljLkJvYXJkVG9GZW4gPSBmdW5jdGlvbiAoYm9hcmQsIGV4dHJhRmVuRGF0YSwgZGVidWcpIHtcclxuICAgICAgICB2YXIgZmVuID0gXCJcIjtcclxuICAgICAgICB2YXIgcm93TnVtID0gMDtcclxuICAgICAgICBib2FyZC5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgdmFyIGZlblJvdyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHZhciByb3dUYWlsID0gXCJcIjtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goZnVuY3Rpb24gKHBpZWNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGllY2UgIT09ICdYJyAmJiBjb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmZW5Sb3cgKz0gY291bnQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBmZW5Sb3cgKz0gcGllY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGllY2UgPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmZW5Sb3cgKz0gcGllY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmZW5Sb3cgKz0gY291bnQudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocm93TnVtID09PSA3KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHVyblN0cmluZyA9IChleHRyYUZlbkRhdGEudHVybiA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyAndycgOiAnYic7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5QYXNzYW50ID0gKGV4dHJhRmVuRGF0YS5lblBhc3NhbnQgPT0gbnVsbCkgPyAnLScgOiBleHRyYUZlbkRhdGEuZW5QYXNzYW50O1xyXG4gICAgICAgICAgICAgICAgZmVuUm93ICs9IFwiIFwiICsgdHVyblN0cmluZyArIFwiIFwiICsgZXh0cmFGZW5EYXRhLmNhc3RsaW5nICsgXCIgXCIgKyBlblBhc3NhbnQgKyBcIiBcIiArIGV4dHJhRmVuRGF0YS5oYWxmTW92ZXMgKyBcIiBcIiArIGV4dHJhRmVuRGF0YS5mdWxsTW92ZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3dUYWlsID0gXCIvXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgcm93TnVtKys7XHJcbiAgICAgICAgICAgIGZlblJvdyArPSByb3dUYWlsO1xyXG4gICAgICAgICAgICBmZW4gKz0gZmVuUm93O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChkZWJ1ZylcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCdWlsdCBGZW46IFwiICsgZmVuKTtcclxuICAgICAgICByZXR1cm4gZmVuO1xyXG4gICAgfTtcclxuICAgIC8qXHJcbiAgICAgKiBQYXJhbXM6XHJcbiAgICAgKiAgICAgIC0gRkVOIHN0cmluZyByZXByZXNlbnRpbmcgYSBnYW1lXHJcbiAgICAgKiBSZXR1cm5zOiBUaGUgbG9jYXRpb24gb2YgdGhlIHdoaXRlIGtpbmcgYXMgYSBCb2FyZExvY2F0aW9uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgRmVuTG9naWMuR2V0V2hpdGVLaW5nTG9jYXRpb24gPSBmdW5jdGlvbiAoZmVuKSB7XHJcbiAgICAgICAgaWYgKGZlbiA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZlbi5zcGxpdChcIi9cIilbaV1bal0gPT09IFwiS1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcm93OiBpLCBjb2x1bW46IGogfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKlxyXG4gICAgICogUGFyYW1zOlxyXG4gICAgICogICAgICAtIEZFTiBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZ2FtZVxyXG4gICAgICogUmV0dXJuczogVGhlIGxvY2F0aW9uIG9mIHRoZSBibGFjayBraW5nIGFzIGEgQm9hcmRMb2NhdGlvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIEZlbkxvZ2ljLkdldEJsYWNrS2luZ0xvY2F0aW9uID0gZnVuY3Rpb24gKGZlbikge1xyXG4gICAgICAgIGlmIChmZW4gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChmZW4uc3BsaXQoXCIvXCIpW2ldW2pdID09PSBcImtcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHJvdzogaSwgY29sdW1uOiBqIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEZlbkxvZ2ljO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBGZW5Mb2dpYztcclxuIiwidmFyIERpcmVjdGlvbnM7XHJcbihmdW5jdGlvbiAoRGlyZWN0aW9ucykge1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiTm9ydGh3ZXN0XCJdID0gMF0gPSBcIk5vcnRod2VzdFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiV2VzdFwiXSA9IDFdID0gXCJXZXN0XCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJTb3V0aHdlc3RcIl0gPSAyXSA9IFwiU291dGh3ZXN0XCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJTb3V0aFwiXSA9IDNdID0gXCJTb3V0aFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiU291dGhlYXN0XCJdID0gNF0gPSBcIlNvdXRoZWFzdFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiRWFzdFwiXSA9IDVdID0gXCJFYXN0XCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJOb3J0aGVhc3RcIl0gPSA2XSA9IFwiTm9ydGhlYXN0XCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJOb3J0aFwiXSA9IDddID0gXCJOb3J0aFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiTnVsbFwiXSA9IDhdID0gXCJOdWxsXCI7XHJcbn0pKERpcmVjdGlvbnMgfHwgKERpcmVjdGlvbnMgPSB7fSkpO1xyXG5leHBvcnQgZGVmYXVsdCBEaXJlY3Rpb25zO1xyXG4vKlxyXG4gKiBEaXJlY3Rpb25zIGJhc2VkIG9uIGJvYXJkXHJcbiAqIDAgICAgICAgICAgIE5cclxuICogMVxyXG4gKiAyXHJcbiAqIDMgIEUgICAgICAgICAgICAgICAgV1xyXG4gKiA0XHJcbiAqIDVcclxuICogNlxyXG4gKiA3ICAgICAgICAgICBTXHJcbiAqICAgMCAgMSAgMiAgMyAgNCAgNSAgN1xyXG4gKi9cclxuIiwiaW1wb3J0IEJvYXJkUHJpbnRlciBmcm9tICcuL0JvYXJkUHJpbnRlcic7XHJcbmltcG9ydCBjb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgRXJyb3JzIGZyb20gJy4vRXJyb3JzJztcclxuaW1wb3J0IEV4ZWN1dGVUdXJuIGZyb20gJy4vTW92ZVByb2Nlc3Nvcic7XHJcbmltcG9ydCBGZW5Mb2dpYyBmcm9tICcuL0ZlbkxvZ2ljJztcclxuaW1wb3J0IEdhbWVUeXBlIGZyb20gJy4vSW50ZXJmYWNlcy9FbnVtcy9HYW1lVHlwZXMnO1xyXG5pbXBvcnQgU3RhbmRhcmRUdXJucyBmcm9tICcuL0ludGVyZmFjZXMvRW51bXMvU3RhbmRhcmRUdXJucyc7XHJcbmltcG9ydCBQaWVjZVR5cGVzIGZyb20gJy4vSW50ZXJmYWNlcy9FbnVtcy9QaWVjZVR5cGVzJztcclxuaW1wb3J0IERpcmVjdGlvbnMgZnJvbSAnLi9JbnRlcmZhY2VzL0VudW1zL0RpcmVjdGlvbnMnO1xyXG4vLyAoZnVuY3Rpb24od2luZG93KXtcclxuLy8gICAgIGNvbnN0IG15TGliID0gKCkgPT4ge1xyXG52YXIgQ2hlc3NTdGF0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qXHJcbiAgICAqIFBhcmFtczpcclxuICAgICogICAgICAtIFtPUFRJT05BTF0gZ2FtZSB2YXJpYW50IHR5cGVcclxuICAgICogICAgICAtIFtPUFRJT05BTF0gc3RhcnRpbmcgZmVuIHBvc2l0aW9uXHJcbiAgICAqICAgICAgLSBbT1BUSU9OQUxdIGZsYWcgZm9yIGRlYnVnZ2luZyBwcmludGluZ1xyXG4gICAgKiAgICAgIC0gW1RFU1RJTkddIGdhbWUgZm9yIHRlc3RpbmcgKGFzIGFycmF5IG9mIHBnbnMpXHJcbiAgICAqIFJldHVybnM6IEEgbmV3IDJkIGFycmF5IHdpdGggMSBwaWVjZSBpbiBhIGRpZmZlcmVudCBwbGFjZVxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIENoZXNzU3RhdGUoY29uZmlnKSB7XHJcbiAgICAgICAgLy8gVE9ETzogdmFsaWRhdGUgY29uZmlnIG9iamVjdFxyXG4gICAgICAgIGlmIChjb25maWcgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbnN0YW50cy5kZWZhdWx0Q29uZmlnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVidWcgPSB0aGlzLmNvbmZpZy5kZWJ1ZztcclxuICAgICAgICB0aGlzLmdhbWVUeXBlID0gdGhpcy5jb25maWcuZ2FtZVR5cGU7XHJcbiAgICAgICAgdGhpcy5oaWRlT3V0cHV0ID0gdGhpcy5jb25maWcuaGlkZU91dHB1dDtcclxuICAgICAgICB2YXIgZmVuRXh0cmFzO1xyXG4gICAgICAgIC8vIENoZWNrIGZvciBwcm92aWRlZCBmZW4uXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZlbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHByb3ZpZGVkIGZlbiBzdHJpbmcgbWVhbnMgYSBkZWZhdWx0IHN0YXJ0LlxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5mZW4gPSBjb25zdGFudHMuc3RhcnRpbmdGZW47XHJcbiAgICAgICAgICAgIGZlbkV4dHJhcyA9IHtcclxuICAgICAgICAgICAgICAgIHR1cm46IFN0YW5kYXJkVHVybnMud2hpdGUsXHJcbiAgICAgICAgICAgICAgICBjYXN0bGluZzogXCJLUWtxXCIsXHJcbiAgICAgICAgICAgICAgICBlblBhc3NhbnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBoYWxmTW92ZXM6IDAsXHJcbiAgICAgICAgICAgICAgICBmdWxsTW92ZXM6IDFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIGZlbi5cclxuICAgICAgICAgICAgLy8gUXVpY2sgZml4XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5mZW4gPT09IGNvbnN0YW50cy5zdGFydGluZ0Zlbikge1xyXG4gICAgICAgICAgICAgICAgZmVuRXh0cmFzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR1cm46IFN0YW5kYXJkVHVybnMud2hpdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzdGxpbmc6IFwiS1FrcVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuUGFzc2FudDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBoYWxmTW92ZXM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVsbE1vdmVzOiAxXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEluaXRhbGl6ZSBzdGF0ZS5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBib2FyZDogRmVuTG9naWMuRmVuVG9Cb2FyZCh0aGlzLmNvbmZpZy5mZW4pLFxyXG4gICAgICAgICAgICBoaXN0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICBmZW46IFt0aGlzLmNvbmZpZy5mZW5dLFxyXG4gICAgICAgICAgICAgICAgcGduOiBbXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnYW1lT3ZlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHR1cm46IDAsXHJcbiAgICAgICAgICAgIGZlbkV4dHJhczogZmVuRXh0cmFzLFxyXG4gICAgICAgICAgICB3aGl0ZUtpbmdMb2NhdGlvbjogKHRoaXMuY29uZmlnLmZlbiA9PT0gY29uc3RhbnRzW1wic3RhcnRpbmdGZW5cIl0pID9cclxuICAgICAgICAgICAgICAgIHsgcm93OiA3LCBjb2x1bW46IDQgfSA6IEZlbkxvZ2ljLkdldFdoaXRlS2luZ0xvY2F0aW9uKHRoaXMuY29uZmlnLmZlbiksXHJcbiAgICAgICAgICAgIGJsYWNrS2luZ0xvY2F0aW9uOiAodGhpcy5jb25maWcuZmVuID09PSBjb25zdGFudHNbXCJzdGFydGluZ0ZlblwiXSkgP1xyXG4gICAgICAgICAgICAgICAgeyByb3c6IDAsIGNvbHVtbjogNCB9IDogRmVuTG9naWMuR2V0QmxhY2tLaW5nTG9jYXRpb24odGhpcy5jb25maWcuZmVuKSxcclxuICAgICAgICAgICAgd2lubmVyOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBFcnJvcnMuY2hlY2tHYW1lVHlwZSh0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1ZyAmJiAhdGhpcy5oaWRlT3V0cHV0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSB0eXBlOiBcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2FtZVR5cGUudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhbmRhcmQgZ2FtZSB0eXBlXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhHYW1lVHlwZS5zdGFuZGFyZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmVuRXh0cmFzOiBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuZmVuRXh0cmFzKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZVN0YXRlIGluaXRhbGl6ZWRcXG5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICBCb2FyZFByaW50ZXIucHJpbnRCb2FyZCh0aGlzLCBTdGFuZGFyZFR1cm5zLndoaXRlLCB0aGlzLmhpZGVPdXRwdXQpO1xyXG4gICAgfVxyXG4gICAgQ2hlc3NTdGF0ZS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIChtb3ZlKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJlc2lnbmF0aW9uXHJcbiAgICAgICAgaWYgKG1vdmUgPT09IFwicmVzaWduXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNpZ24oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHdoaXRlS2luZ1NpZGVDYXN0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd2hpdGVRdWVlblNpZGVDYXN0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYmxhY2tLaW5nU2lkZUNhc3RsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBibGFja1F1ZWVuU2lkZUNhc3RsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBraW5nTG9jYXRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBtb3ZlZFBpZWNlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbW92ZWRQaWVjZURlc3Q6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBjaGVjazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBnYW1lSXNPdmVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbW92ZUlzVmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW52YWxpZE1vdmU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGdhbWUgb3ZlciBCRUZPUkUgbW92ZSB2YWxpZGF0aW9uLlxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmdhbWVPdmVyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aGl0ZUtpbmdTaWRlQ2FzdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHdoaXRlUXVlZW5TaWRlQ2FzdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJsYWNrS2luZ1NpZGVDYXN0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYmxhY2tRdWVlblNpZGVDYXN0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAga2luZ0xvY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbW92ZWRQaWVjZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIG1vdmVkUGllY2VEZXN0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgY2hlY2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZ2FtZUlzT3ZlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vdmVJc1ZhbGlkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGludmFsaWRNb3ZlOiBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFZhbGlkYXRlIG1vdmVcclxuICAgICAgICB2YXIgbW92ZUlzVmFsaWQgPSB0cnVlOyAvLyBUT0RPOiB2YWxpZGF0aW9uXHJcbiAgICAgICAgLy8gUmV0dXJuIHRvIGluZGljYXRlIGludmFsaWQgbW92ZS5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKG1vdmVJc1ZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgd2hpdGVLaW5nU2lkZUNhc3RsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB3aGl0ZVF1ZWVuU2lkZUNhc3RsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBibGFja0tpbmdTaWRlQ2FzdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJsYWNrUXVlZW5TaWRlQ2FzdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGtpbmdMb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIG1vdmVkUGllY2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBtb3ZlZFBpZWNlRGVzdDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGNoZWNrOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGdhbWVJc092ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbW92ZUlzVmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaW52YWxpZE1vdmU6IG1vdmVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGVidWcgJiYgIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBUdXJuIFwiICsgdGhpcy5zdGF0ZS50dXJuICsgXCIgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cIik7XHJcbiAgICAgICAgLy8gMS4gUHJpbnQgaW5mby5cclxuICAgICAgICBpZiAodGhpcy5nYW1lVHlwZSA9PT0gR2FtZVR5cGUuc3RhbmRhcmQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcgJiYgIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiICAgXCIgKyB0aGlzLmdldFR1cm4oKSArIFwiJ3MgdHVyblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRXhlY3V0ZSBtb3ZlIChwZ24pXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IEV4ZWN1dGVUdXJuKHRoaXMsIG1vdmUsIHRoaXMuaGlkZU91dHB1dCwgdGhpcy5kZWJ1Zyk7XHJcbiAgICAgICAgLy8gVXBkYXRlIEhpc3RvcnlcclxuICAgICAgICB0aGlzLnN0YXRlLmhpc3RvcnkucGduLnB1c2gobW92ZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5oaXN0b3J5LmZlbi5wdXNoKEZlbkxvZ2ljLkJvYXJkVG9GZW4odGhpcy5zdGF0ZS5ib2FyZCwgdGhpcy5zdGF0ZS5mZW5FeHRyYXMpKTtcclxuICAgICAgICB0aGlzLnN0YXRlLnR1cm4rKztcclxuICAgICAgICAvLyBVcGRhdGUga2luZyBsb2NhdGlvbi5cclxuICAgICAgICAvLyBUT0RPOiBNYWtlIHN1cmUga2luZyBsb2NhdGlvbiBpcyBzZXQgd2hlbiB1c2luZyBhIG5vbi1zdGFydGluZyBmZW4uXHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlICYmIHJlc3VsdC5raW5nTG9jYXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS53aGl0ZUtpbmdMb2NhdGlvbiA9IHJlc3VsdC5raW5nTG9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdC5raW5nTG9jYXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5ibGFja0tpbmdMb2NhdGlvbiA9IHJlc3VsdC5raW5nTG9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFByaW50IGJvYXJkIGlmIGRlYnVnZ2luZy5cclxuICAgICAgICBpZiAodGhpcy5kZWJ1ZyA9PT0gdHJ1ZSAmJiAhdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICBCb2FyZFByaW50ZXIucHJpbnRCb2FyZERlYnVnKHRoaXMsIHRoaXMuaGlkZU91dHB1dCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5kZWJ1ZyA9PT0gZmFsc2UgJiYgIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgQm9hcmRQcmludGVyLnByaW50Qm9hcmQodGhpcywgU3RhbmRhcmRUdXJucy53aGl0ZSwgdGhpcy5oaWRlT3V0cHV0KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZlbkV4dHJhcyhyZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGlkZU91dHB1dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIhfiF+IX4hfiF+ISBObyBNb3JlIE1vdmVzICF+IX4hfiF+IX4hfiFcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiAgICAgICAgICAgICAgR2FtZSBPdmVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jaGVja0ZvckVuZE9mR2FtZShyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHQU1FIE9WRVJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2FtZU92ZXIgPSB0cnVlOyAvLyBGb3IgdGVzdGluZyBwdXJwb3Nlc1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIC8vIFRPRE86IGNoZWNrIGlmIHRoaXMgY2FuIGJlIHJlbW92ZWQuXHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5nZXRCb2FyZEFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmJvYXJkO1xyXG4gICAgfTtcclxuICAgIENoZXNzU3RhdGUucHJvdG90eXBlLmdldFR1cm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmdhbWVUeXBlKSB7XHJcbiAgICAgICAgICAgIC8qIFN0YW5kYXJkICovXHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVR5cGUuc3RhbmRhcmQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5mZW5FeHRyYXMudHVybjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yLCB2YXJpYW50IG5vdCByZWNvZ25pemVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5nZXRGZW4gPSBmdW5jdGlvbiAoZGVidWcpIHtcclxuICAgICAgICByZXR1cm4gRmVuTG9naWMuQm9hcmRUb0Zlbih0aGlzLnN0YXRlLmJvYXJkLCB0aGlzLnN0YXRlLmZlbkV4dHJhcywgZGVidWcpLnRyaW0oKTtcclxuICAgIH07XHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5wcmludEJvYXJkID0gZnVuY3Rpb24gKGRlYnVnLCBoaWRlT3V0cHV0KSB7XHJcbiAgICAgICAgQm9hcmRQcmludGVyLnByaW50Qm9hcmQodGhpcywgU3RhbmRhcmRUdXJucy53aGl0ZSwgZGVidWcpO1xyXG4gICAgfTtcclxuICAgIC8qXHJcbiAgICAgKiBVcGRhdGUgdHVyblxyXG4gICAgICovXHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS51cGRhdGVGZW5FeHRyYXMgPSBmdW5jdGlvbiAobW92ZVJlc3VsdHMpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2FtZVR5cGUpIHtcclxuICAgICAgICAgICAgLyogU3RhbmRhcmQgKi9cclxuICAgICAgICAgICAgY2FzZSBHYW1lVHlwZS5zdGFuZGFyZDpcclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB0dXJuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5mZW5FeHRyYXMudHVybiA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZlbkV4dHJhcy50dXJuID0gU3RhbmRhcmRUdXJucy5ibGFjaztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZlbkV4dHJhcy50dXJuID0gU3RhbmRhcmRUdXJucy53aGl0ZTtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjYXN0bGluZy5cclxuICAgICAgICAgICAgICAgIGlmIChtb3ZlUmVzdWx0cy53aGl0ZUtpbmdTaWRlQ2FzdGxlIHx8IG1vdmVSZXN1bHRzLndoaXRlUXVlZW5TaWRlQ2FzdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mZW5FeHRyYXMuY2FzdGxpbmcgPSB0aGlzLnN0YXRlLmZlbkV4dHJhcy5jYXN0bGluZy5yZXBsYWNlKFwiS1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZlbkV4dHJhcy5jYXN0bGluZyA9IHRoaXMuc3RhdGUuZmVuRXh0cmFzLmNhc3RsaW5nLnJlcGxhY2UoXCJRXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobW92ZVJlc3VsdHMuYmxhY2tLaW5nU2lkZUNhc3RsZSB8fCBtb3ZlUmVzdWx0cy5ibGFja1F1ZWVuU2lkZUNhc3RsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZmVuRXh0cmFzLmNhc3RsaW5nID0gdGhpcy5zdGF0ZS5mZW5FeHRyYXMuY2FzdGxpbmcucmVwbGFjZShcImtcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mZW5FeHRyYXMuY2FzdGxpbmcgPSB0aGlzLnN0YXRlLmZlbkV4dHJhcy5jYXN0bGluZy5yZXBsYWNlKFwicVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBFbiBQYXNzYW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZlbkV4dHJhcy5lblBhc3NhbnQgPSBtb3ZlUmVzdWx0cy5lbmFibGVFblBhc3NhbnQ7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2hlY2tGb3JDYXN0bGluZygpICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgYXZhaWxhYmxlIGNhc3RsaW5nLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mZW5FeHRyYXMuaGFsZk1vdmVzKys7IC8vIEluY3JlbWVudCBudW1iZXIgb2YgaGFsZiBtb3Zlcy5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmZlbkV4dHJhcy5oYWxmTW92ZXMgPT09IDIpIHsgLy8gQ2hlY2sgdG8gaW5jcmVtZW50IGZ1bGwgbW92ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mZW5FeHRyYXMuaGFsZk1vdmVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmZlbkV4dHJhcy5mdWxsTW92ZXMrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmFyaWFudCBOb3QgWWV0IEltcGxlbWVudGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5jaGVja0ZvckNhc3RsaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNrRm9yQ2FzdGxpbmcgTm90IFlldCBJbXBsZW1lbnRlZFwiKTtcclxuICAgIH07XHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5jaGVja0ZvckVuUGFzc2FudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGVja0ZvckVuUGFzc2FudCBOb3QgWWV0IEltcGxlbWVudGVkXCIpO1xyXG4gICAgfTtcclxuICAgIENoZXNzU3RhdGUucHJvdG90eXBlLmNoZWNrRm9yRW5kT2ZHYW1lID0gZnVuY3Rpb24gKG1vdmVSZXN1bHQpIHtcclxuICAgICAgICBpZiAobW92ZVJlc3VsdC5jaGVjayA9PT0gdHJ1ZSAmJiB0aGlzLmNoZWNrRm9yQ2hlY2ttYXRlKG1vdmVSZXN1bHQpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy5ibGFjaylcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUud2lubmVyID0gU3RhbmRhcmRUdXJucy53aGl0ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS53aW5uZXIgPSBTdGFuZGFyZFR1cm5zLmJsYWNrO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLmNoZWNrRm9yU3RhbGVtYXRlKCkgXHJcbiAgICAgICAgLy8gVE9ETzogYWRkIHJlc2lnbiBmdW5jdGlvbmFsaXR5LlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvLyBOT1RFOiBtZXRob2QgaXMgZGVzaWduZWQgZm9yIHN0YW5kYXJkIHNpemVkIGJvYXJkXHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5jaGVja0ZvckNoZWNrbWF0ZSA9IGZ1bmN0aW9uIChtb3ZlUmVzdWx0KSB7XHJcbiAgICAgICAgdmFyIGlzQ2hlY2ttYXRlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gRmluZCB0aGUgbG9jYXRpb24gb2YgdGhlIGtpbmcuXHJcbiAgICAgICAgdmFyIGtpbmdMb2NhdGlvbiA9ICh0aGlzLmdldFR1cm4oKSA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyB0aGlzLnN0YXRlLndoaXRlS2luZ0xvY2F0aW9uIDogdGhpcy5zdGF0ZS5ibGFja0tpbmdMb2NhdGlvbjtcclxuICAgICAgICAvLyBUT0RPOiBhZGQgbWV0aG9kIGZvciBzZWFyY2hpbmcgZm9yIGtpbmcgaWYgbm9uLXN0YXJ0aW5nIGZlbiBpcyBwcm92aWRlZC5cclxuICAgICAgICB2YXIga2luZ1BpZWNlID0gKHRoaXMuZ2V0VHVybigpID09PSBTdGFuZGFyZFR1cm5zLndoaXRlKSA/IFwiS1wiIDogXCJrXCI7XHJcbiAgICAgICAgLy8gQSAtIEF2b2lkXHJcbiAgICAgICAgLy8gQ2hlY2sgYWxsIHRoZSBpbWlkaWF0ZWx5IGFkamFjZW50IGFuZCBkaWFnb25hbCBzcXVhcmVzIG9mIHRoZSBraW5nJ3MgbG9jYXRpb24uXHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGNvbnN0YW50c1tcIlBpZWNlTG9naWNcIl1bXCJLaW5nXCJdOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgc3F1YXJlUnVsZXNPZkludGVyZXN0ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAoa2luZ0xvY2F0aW9uLmNvbHVtbiArIHNxdWFyZVJ1bGVzT2ZJbnRlcmVzdC5jb2x1bW4gPCA4ICYmXHJcbiAgICAgICAgICAgICAgICBraW5nTG9jYXRpb24uY29sdW1uICsgc3F1YXJlUnVsZXNPZkludGVyZXN0LmNvbHVtbiA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICBraW5nTG9jYXRpb24ucm93ICsgc3F1YXJlUnVsZXNPZkludGVyZXN0LnJvdyA8IDggJiZcclxuICAgICAgICAgICAgICAgIGtpbmdMb2NhdGlvbi5yb3cgKyBzcXVhcmVSdWxlc09mSW50ZXJlc3Qucm93ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcXVhcmVPZkludGVzZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdzoga2luZ0xvY2F0aW9uLmNvbHVtbiArIHNxdWFyZVJ1bGVzT2ZJbnRlcmVzdC5jb2x1bW4sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBraW5nTG9jYXRpb24ucm93ICsgc3F1YXJlUnVsZXNPZkludGVyZXN0LnJvd1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFJlcGxhY2UgXCJYXCIgYXMgdGhlIGVtcHR5IHNwYWNlLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgYW55IEVNUFRZIHNxdWFyZXMgc3Vycm91bmRpbmcgdGhlIGtpbmcgYXJlIHNhZmUsIGl0J3Mgbm90IGEgY2hlY2ttYXRlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Qm9hcmRBcnJheSgpW3NxdWFyZU9mSW50ZXNlc3Qucm93XVtzcXVhcmVPZkludGVzZXN0LmNvbHVtbl0gIT09IFwiWFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcXVhcmVJc1NhZmVGb3JLaW5nKHNxdWFyZU9mSW50ZXNlc3QsIHRoaXMuZ2V0VHVybigpLCB0aGlzLmdhbWVUeXBlLCB0aGlzLmRlYnVnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIC0gQmxvY2tcclxuICAgICAgICAvLyBJZiBrbmlnaHQsIHVuYmxvY2thYmxlXHJcbiAgICAgICAgaWYgKG1vdmVSZXN1bHQubW92ZWRQaWVjZSAhPT0gUGllY2VUeXBlcy5LbmlnaHQpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgcm93OiBtb3ZlUmVzdWx0Lm1vdmVkUGllY2VEZXN0LnJvdyAtIGtpbmdMb2NhdGlvbi5yb3csXHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IG1vdmVSZXN1bHQubW92ZWRQaWVjZURlc3QuY29sdW1uIC0ga2luZ0xvY2F0aW9uLmNvbHVtbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gT25seSBjaGVjayB0aGUgcGF0aCB0aGF0IGFyZSBiZXR3ZWVuIHRoZSBraW5nIGFuZCB0aGUgYXR0YWNraW5nIHBpZWNlLlxyXG4gICAgICAgICAgICAvLyBGaW5kIHdoaWNoIHBhdGggYnkgYXNzdW1pbmcgb25seSBhIEJpc2hvcCwgUm9vaywgUXVlZW4sIGFuZCBQYXduIGNhbiBhdHRhY2suXHJcbiAgICAgICAgICAgIC8vICAgICAgVGhpcyBtZWFucyB0aGF0IGEgcGllY2UgbGlrZSBwYW8sIG9yIGNhbm5vbiwgZnJvbSBDaGluZXNlIGNoZXNzIGlzbid0IFxyXG4gICAgICAgICAgICAvLyAgICAgIGNvdmVyZWQgYnkgdGhlIGZvbGxvd2luZyBsb2dpYy5cclxuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IERpcmVjdGlvbnMuTnVsbDtcclxuICAgICAgICAgICAgLy9UT0RPOiBCZSBzdXJlIHRvIHRlc3QgbGF0ZXJcclxuICAgICAgICAgICAgLy8gSWYgdGhlIGF0dGFja2luZyBwaWVjZSBpcyBOb3J0aFdlc3Qgb2YgdGhlIEtpbmcgLy8gVE9ETzogbWFrZSBzdXJlIHRoaXMgaXNuJ3QgZmxpcHBlZCBiYXNlZCBvbiB0aGUgZGlzdGFuY2UgdmFyaWFibGVcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlLnJvdyA9IDAgJiYgZGlzdGFuY2Uucm93IDwgOCAmJiBkaXN0YW5jZS5jb2x1bW4gPiAwICYmIGRpc3RhbmNlLmNvbHVtbiA8IDgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnICYmICF0aGlzLmhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2tlciBpcyBTb3V0aEVhc3Qgb2YgdGhlIGtpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gRGlyZWN0aW9ucy5Tb3V0aGVhc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9XZXN0XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpc3RhbmNlLnJvdyA9PT0gMCAmJiBkaXN0YW5jZS5jb2x1bW4gPj0gMCAmJiBkaXN0YW5jZS5jb2x1bW4gPCA4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1ZyAmJiAhdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrZXIgaXMgRWFzdCBvZiB0aGUga2luZy5cIik7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBEaXJlY3Rpb25zLkVhc3Q7XHJcbiAgICAgICAgICAgIH0gLy9Tb3V0aFdlc3RcclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzdGFuY2Uucm93IDwgMCAmJiBkaXN0YW5jZS5yb3cgPiAtOCAmJiBkaXN0YW5jZS5jb2x1bW4gPiAwICYmIGRpc3RhbmNlLmNvbHVtbiA8IDgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnICYmICF0aGlzLmhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2tlciBpcyBOb3J0aEVhc3Qgb2YgdGhlIGtpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gRGlyZWN0aW9ucy5Ob3J0aGVhc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzdGFuY2Uucm93IDwgMCAmJiBkaXN0YW5jZS5yb3cgPiAtOCAmJiBkaXN0YW5jZS5jb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnICYmICF0aGlzLmhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2tlciBpcyBOb3J0aCBvZiB0aGUga2luZ1wiKTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERpcmVjdGlvbnMuTm9ydGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzdGFuY2Uucm93IDwgMCAmJiBkaXN0YW5jZS5yb3cgPiAtOCAmJiBkaXN0YW5jZS5jb2x1bW4gPCAwICYmIGRpc3RhbmNlLmNvbHVtbiA+IC04KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1ZyAmJiAhdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrZXIgaXMgTm9ydGhXZXN0IG9mIHRoZSBraW5nLlwiKTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERpcmVjdGlvbnMuTm9ydGh3ZXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpc3RhbmNlLnJvdyA9PT0gMCAmJiBkaXN0YW5jZS5jb2x1bW4gPCAwICYmIGRpc3RhbmNlLmNvbHVtbiA+IC04KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWJ1ZyAmJiAhdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrZXIgaXMgV2VzdFwiKTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERpcmVjdGlvbnMuV2VzdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXN0YW5jZS5yb3cgPiAwICYmIGRpc3RhbmNlLnJvdyA8IDggJiYgZGlzdGFuY2UuY29sdW1uIDwgMCAmJiBkaXN0YW5jZS5jb2x1bW4gPiAtOCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcgJiYgIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF0dGFja2VyIGlzIFNvdXRoV2VzdCBvZiB0aGUga2luZy5cIik7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBEaXJlY3Rpb25zLlNvdXRod2VzdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXN0YW5jZS5yb3cgPCAwICYmIGRpc3RhbmNlLmNvbHVtbiA8IDAgJiYgZGlzdGFuY2UuY29sdW1uID4gLTgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnICYmICF0aGlzLmhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2tlciBpcyBTb3V0aCBvZiBLaW5nLlwiKTtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IERpcmVjdGlvbnMuU291dGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcgJiYgIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrZXIgaXMgZnJvbSBcIiArIGRpcmVjdGlvbi50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIGZhbHNlIGlmIHRoZXJlIGlzIGEgYmxvY2sgdGhhdCBwcmV2ZW50cyBjaGVja21hdGUuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yQmxvY2thYmxlU3F1YXJlcyhraW5nTG9jYXRpb24sIGRpcmVjdGlvbikgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQyAtIENhcHR1cmVcclxuICAgICAgICBpZiAodGhpcy5kZWJ1ZyAmJiAhdGhpcy5oaWRlT3V0cHV0KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLUNoZWNraW5nIGZvciBjYXB0dXJlLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICB2YXIgcmVzdWx0dCA9IHRoaXMuc3F1YXJlSXNTYWZlRm9yS2luZyhtb3ZlUmVzdWx0Lm1vdmVkUGllY2VEZXN0LCAodGhpcy5nZXRUdXJuKCkgPT09IFN0YW5kYXJkVHVybnMud2hpdGUpID8gU3RhbmRhcmRUdXJucy5ibGFjayA6IFN0YW5kYXJkVHVybnMud2hpdGUsIHRoaXMuZ2FtZVR5cGUsIHRoaXMuZGVidWcpO1xyXG4gICAgICAgIGlmIChyZXN1bHR0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBwaWVjZSBjYW4ndCBiZSBjYXB0dXJlZCwgdGh1cyBjaGVja21hdGUuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDaGVja21hdGU7XHJcbiAgICB9O1xyXG4gICAgLy8gSXRlcmF0aXZlbHkgY2hlY2sgYWxsIHRoZSBzdXJyb3VuZGluZyBzcXVhcmVzIHRvIHNlZSBpZiBhIHNxdWFyZSBpcyBzYWZlIGZvciB0aGUga2luZ1xyXG4gICAgQ2hlc3NTdGF0ZS5wcm90b3R5cGUuc3F1YXJlSXNTYWZlRm9yS2luZyA9IGZ1bmN0aW9uIChraW5nU3F1YXJlLCBjb2xvciwgZ2FtZVR5cGUsIGRlYnVnKSB7XHJcbiAgICAgICAgc3dpdGNoIChnYW1lVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVUeXBlLnN0YW5kYXJkOlxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgS25pZ2h0IHNxdWFyZXMsIEJpc2hvcCBzcXVhcmVzLCBhbmQgUm9vayBzcXVhcmVzLlxyXG4gICAgICAgICAgICAgICAgdmFyIGZvbyA9IHRoaXMuc3F1YXJlSXNTYWZlRnJvbVBpZWNlKGtpbmdTcXVhcmUsIGNvbG9yLCBcIktuaWdodFwiLCBkZWJ1Zyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmFyID0gdGhpcy5zcXVhcmVJc1NhZmVGcm9tUGllY2Uoa2luZ1NxdWFyZSwgY29sb3IsIFwiQmlzaG9wXCIsIGRlYnVnKTtcclxuICAgICAgICAgICAgICAgIHZhciBxdWUgPSB0aGlzLnNxdWFyZUlzU2FmZUZyb21QaWVjZShraW5nU3F1YXJlLCBjb2xvciwgXCJSb29rXCIsIGRlYnVnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZm9vICYmIGJhciAmJiBxdWUpO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVUeXBlLmJ1Z2hvdXNlOlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmFyaWFudCAnQnVnaG91c2UnIGlzIG5vdCB5ZXQgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2FtZSB2YXJpYW50IGlzIG5vdCByZWNvZ25pemVkLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgQ2hlc3NTdGF0ZS5wcm90b3R5cGUuZ2V0U3RhdHVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGdhbWVPdmVyOiB0aGlzLnN0YXRlLmdhbWVPdmVyLFxyXG4gICAgICAgICAgICB0dXJuOiBudWxsLFxyXG4gICAgICAgICAgICB3aW5uZXI6ICh0aGlzLnN0YXRlLndpbm5lciA9PT0gU3RhbmRhcmRUdXJucy53aGl0ZSkgPyBcIndoaXRlXCIgOiBcImJsYWNrXCIsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS53aW5uZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdGF0dXMud2lubmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcclxuICAgIH07XHJcbiAgICBDaGVzc1N0YXRlLnByb3RvdHlwZS5yZXNpZ24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhpZGVPdXRwdXQpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR0FNRSBPVkVSXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUuZ2FtZU92ZXIgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RhdGUud2lubmVyID0gdGhpcy5nZXRUdXJuKCk7IC8vIFRoZSB0dXJuIGhhc24ndCB1cGRhdGVkIHlldC5cclxuICAgIH07XHJcbiAgICAvLyBOT1RFOiBmdW5jdGlvbiBpcyBub3QgZGVzaWduZWQgZm9yIG5vbi1zdGFuZGFyZCBib2FyZCBzaXplcy5cclxuICAgIENoZXNzU3RhdGUucHJvdG90eXBlLnNxdWFyZUlzU2FmZUZyb21QaWVjZSA9IGZ1bmN0aW9uIChraW5nU3F1YXJlLCBjb2xvciwgcGllY2VOYW1lLCBkZWJ1Zykge1xyXG4gICAgICAgIHZhciBwaWVjZVN5bWJvbFdoaXRlO1xyXG4gICAgICAgIHZhciBwaWVjZVN5bWJvbEJsYWNrO1xyXG4gICAgICAgIC8vIFRPRE86IFRoZSBwcm9ibGVtIGlzIHRoYXQgdGhlIGJpc2hvcHMgYW5kIHJvb2tzIGRvbid0IHN0b3AgYWZ0ZXIgdGhleSBmaW5kIGEgcGllY2UgdGhhdCBpcyBpbiB0aGUgd2F5LlxyXG4gICAgICAgIGlmIChkZWJ1ZyAmJiAhdGhpcy5oaWRlT3V0cHV0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGtpbmdTcXVhcmUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb2xvcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGllY2VOYW1lOiBcIiArIHBpZWNlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsaXN0ID0gW107XHJcbiAgICAgICAgdmFyIHN1Ymxpc3QgPSBbXTtcclxuICAgICAgICAvLyBPbmx5IG5lZWRzIHRvIGNoZWNrIGFnYWluc3QgUm9va3MsIEtuaWdodHMsIGFuZCBCaXNob3BzLlxyXG4gICAgICAgIHN3aXRjaCAocGllY2VOYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSb29rXCI6XHJcbiAgICAgICAgICAgICAgICBwaWVjZVN5bWJvbFdoaXRlID0gY29uc3RhbnRzW1wiUGllY2VOYW1lVG9QR05cIl1bXCJSb29rXCJdW1N0YW5kYXJkVHVybnMud2hpdGVdO1xyXG4gICAgICAgICAgICAgICAgcGllY2VTeW1ib2xCbGFjayA9IGNvbnN0YW50c1tcIlBpZWNlTmFtZVRvUEdOXCJdW1wiUm9va1wiXVtTdGFuZGFyZFR1cm5zLmJsYWNrXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5wdXNoKGNvbnN0YW50cy5QaWVjZUxvZ2ljW3BpZWNlTmFtZV1baSAqIGpdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHN1Ymxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiS25pZ2h0XCI6XHJcbiAgICAgICAgICAgICAgICBwaWVjZVN5bWJvbFdoaXRlID0gY29uc3RhbnRzW1wiUGllY2VOYW1lVG9QR05cIl1bXCJLbmlnaHRcIl1bU3RhbmRhcmRUdXJucy53aGl0ZV07XHJcbiAgICAgICAgICAgICAgICBwaWVjZVN5bWJvbEJsYWNrID0gY29uc3RhbnRzW1wiUGllY2VOYW1lVG9QR05cIl1bXCJLbmlnaHRcIl1bU3RhbmRhcmRUdXJucy5ibGFja107XHJcbiAgICAgICAgICAgICAgICAvLyBKdXN0IHN0dWZmIGl0IHRoZSBsaXN0LlxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnB1c2goY29uc3RhbnRzLlBpZWNlTG9naWNbcGllY2VOYW1lXVtqXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goc3VibGlzdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkJpc2hvcFwiOlxyXG4gICAgICAgICAgICAgICAgcGllY2VTeW1ib2xXaGl0ZSA9IGNvbnN0YW50c1tcIlBpZWNlTmFtZVRvUEdOXCJdW1wiQmlzaG9wXCJdW1N0YW5kYXJkVHVybnMud2hpdGVdO1xyXG4gICAgICAgICAgICAgICAgcGllY2VTeW1ib2xCbGFjayA9IGNvbnN0YW50c1tcIlBpZWNlTmFtZVRvUEdOXCJdW1wiQmlzaG9wXCJdW1N0YW5kYXJkVHVybnMuYmxhY2tdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnB1c2goY29uc3RhbnRzLlBpZWNlTG9naWNbcGllY2VOYW1lXVtpICogal0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goc3VibGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJQYXduXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09IFN0YW5kYXJkVHVybnMud2hpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGtpbmdTcXVhcmUucm93IC0gMSkgPj0gMCAmJiAoa2luZ1NxdWFyZS5jb2x1bW4gLSAxKSA+PSAwICYmIHRoaXMuZ2V0Qm9hcmRBcnJheSgpW2tpbmdTcXVhcmUucm93IC0gMV1ba2luZ1NxdWFyZS5jb2x1bW4gLSAxXSAhPT0gXCJwXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGtpbmdTcXVhcmUuY29sdW1uICsgMSkgPCA4ICYmIHRoaXMuZ2V0Qm9hcmRBcnJheSgpW2tpbmdTcXVhcmUucm93IC0gMV1ba2luZ1NxdWFyZS5jb2x1bW4gKyAxXSA9PT0gXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChraW5nU3F1YXJlLnJvdyArIDEpIDwgOCAmJiAoa2luZ1NxdWFyZS5jb2x1bW4gLSAxKSA+PSAwICYmIHRoaXMuZ2V0Qm9hcmRBcnJheSgpW2tpbmdTcXVhcmUucm93ICsgOF1ba2luZ1NxdWFyZS5jb2x1bW4gLSAxXSAhPT0gXCJwXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGtpbmdTcXVhcmUuY29sdW1uICsgMSkgPCA4ICYmIHRoaXMuZ2V0Qm9hcmRBcnJheSgpW2tpbmdTcXVhcmUucm93ICsgMV1ba2luZ1NxdWFyZS5jb2x1bW4gKyAxXSA9PT0gXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3NxdWFyZUlzU2FmZUZyb21QaWVjZScgZnVuY3Rpb24gaXMgd29ya2luZyB1bmV4cGVjdGVkbHkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGxpc3RfMSA9IGxpc3Q7IF9pIDwgbGlzdF8xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgc3VibGlzdF8yID0gbGlzdF8xW19pXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBzdWJsaXN0XzEgPSBzdWJsaXN0XzI7IF9hIDwgc3VibGlzdF8xLmxlbmd0aDsgX2ErKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dGFja2VyU3F1YXJlID0gc3VibGlzdF8xW19hXTtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzcXVhcmUgaXMgd2l0aGluIGJvdW5kc1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja2VyU3F1YXJlLmNvbHVtbiArIGtpbmdTcXVhcmUuY29sdW1uIDwgOCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFja2VyU3F1YXJlLmNvbHVtbiArIGtpbmdTcXVhcmUuY29sdW1uID49IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlclNxdWFyZS5yb3cgKyBraW5nU3F1YXJlLnJvdyA8IDggJiZcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2tlclNxdWFyZS5yb3cgKyBraW5nU3F1YXJlLnJvdyA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBicmVhayB3aWxsIHJlcXVpcmUgdGhlcmUgdG8gYmUgYSBjbGVhciBwYXRoIGZvciBub24tanVtcGluZyBwaWVjZXMgdG8gYmUgYSB0aHJlYXQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGlzLnN0YXRlLmJvYXJkW2F0dGFja2VyU3F1YXJlLnJvdyArIGtpbmdTcXVhcmUucm93XVthdHRhY2tlclNxdWFyZS5jb2x1bW4gKyBraW5nU3F1YXJlLmNvbHVtbl0gIT09IHBpZWNlU3ltYm9sV2hpdGUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ib2FyZFthdHRhY2tlclNxdWFyZS5yb3cgKyBraW5nU3F1YXJlLnJvd11bYXR0YWNrZXJTcXVhcmUuY29sdW1uICsga2luZ1NxdWFyZS5jb2x1bW5dICE9PSBwaWVjZVN5bWJvbEJsYWNrIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYm9hcmRbYXR0YWNrZXJTcXVhcmUucm93ICsga2luZ1NxdWFyZS5yb3ddW2F0dGFja2VyU3F1YXJlLmNvbHVtbiArIGtpbmdTcXVhcmUuY29sdW1uXSAhPT0gXCJYXCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlTmFtZSAhPT0gXCJLbmlnaHRcIiAvLyBLbmlnaHRzIGFyZSBhbGxvd2VkIHRvIGp1bXBcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjb3JyZWN0IHBpZWNlIGFwcGVhcnMsIHRoZW4gdGhlIHNxdWFyZSBpcyBub3Qgc2FmZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sb3IgPT09IFN0YW5kYXJkVHVybnMud2hpdGUgJiYgdGhpcy5zdGF0ZS5ib2FyZFthdHRhY2tlclNxdWFyZS5yb3cgKyBraW5nU3F1YXJlLnJvd11bYXR0YWNrZXJTcXVhcmUuY29sdW1uICsga2luZ1NxdWFyZS5jb2x1bW5dID09PSBwaWVjZVN5bWJvbFdoaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sb3IgPT09IFN0YW5kYXJkVHVybnMuYmxhY2sgJiYgdGhpcy5zdGF0ZS5ib2FyZFthdHRhY2tlclNxdWFyZS5yb3cgKyBraW5nU3F1YXJlLnJvd11bYXR0YWNrZXJTcXVhcmUuY29sdW1uICsga2luZ1NxdWFyZS5jb2x1bW5dID09PSBwaWVjZVN5bWJvbEJsYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgLy8gUmV0dXJucyBmYWxzZSBpZiBpdCdzIG5vdCBjaGVja21hdGUgYmVjYXVzZSB0aGVyZSBpcyBhIHBvc3NpYmxlIGJsb2NrXHJcbiAgICAvLyByZXR1cm5pbmcgdHJ1ZSBzaWduYWxzIG5vdGhpbmcgZGVmaW5pdGl2ZS5cclxuICAgIENoZXNzU3RhdGUucHJvdG90eXBlLmNoZWNrRm9yQmxvY2thYmxlU3F1YXJlcyA9IGZ1bmN0aW9uIChraW5nTG9jYXRpb24sIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHZhciByb3dJbmM7XHJcbiAgICAgICAgdmFyIGNvbEluYztcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuRWFzdDpcclxuICAgICAgICAgICAgICAgIHJvd0luYyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb2xJbmMgPSAtMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuTm9ydGhlYXN0OlxyXG4gICAgICAgICAgICAgICAgcm93SW5jID0gLTE7XHJcbiAgICAgICAgICAgICAgICBjb2xJbmMgPSAtMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuTm9ydGg6XHJcbiAgICAgICAgICAgICAgICByb3dJbmMgPSAtMTtcclxuICAgICAgICAgICAgICAgIGNvbEluYyA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb25zLk5vcnRod2VzdDpcclxuICAgICAgICAgICAgICAgIHJvd0luYyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgY29sSW5jID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuV2VzdDpcclxuICAgICAgICAgICAgICAgIHJvd0luYyA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb2xJbmMgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9ucy5Tb3V0aHdlc3Q6XHJcbiAgICAgICAgICAgICAgICByb3dJbmMgPSAxO1xyXG4gICAgICAgICAgICAgICAgY29sSW5jID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuU291dGg6XHJcbiAgICAgICAgICAgICAgICByb3dJbmMgPSAxO1xyXG4gICAgICAgICAgICAgICAgY29sSW5jID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuU291dGhlYXN0OlxyXG4gICAgICAgICAgICAgICAgcm93SW5jID0gMTtcclxuICAgICAgICAgICAgICAgIGNvbEluYyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEaXJlY3Rpb25hbCBlcnJvciAxLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIG9wZW4gc3F1YXJlc1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGZvdW5kIGVtcHR5IHNxdWFyZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRCb2FyZEFycmF5KClba2luZ0xvY2F0aW9uLnJvdyArIHJvd0luY11ba2luZ0xvY2F0aW9uLmNvbHVtbiArIGNvbEluY10gPT09IFwiWFwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcExvYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICByb3c6IGtpbmdMb2NhdGlvbi5yb3cgKyBpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjoga2luZ0xvY2F0aW9uLmNvbHVtbiArIGlcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgYSBwaWVjZSBjYW4gYmxvY2tcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zcXVhcmVJc1NhZmVGcm9tUGllY2UodGVtcExvYywgdGhpcy5nZXRUdXJuKCksIFwiUm9va1wiLCBmYWxzZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5zcXVhcmVJc1NhZmVGcm9tUGllY2UodGVtcExvYywgdGhpcy5nZXRUdXJuKCksIFwiQmlzaG9wXCIsIGZhbHNlKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF0aGlzLnNxdWFyZUlzU2FmZUZyb21QaWVjZSh0ZW1wTG9jLCB0aGlzLmdldFR1cm4oKSwgXCJLbmlnaHRcIiwgZmFsc2UpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm90IGNoZWNrbWF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRoZSBhdHRhY2tlciB3YXMgZm91bmQsIG5vIGJsb2NraW5nIHBvc3NpYmxlXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcgJiYgIXRoaXMuaGlkZU91dHB1dClcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJsb2NraW5nIGNoZWNrbWF0ZSBub3QgcG9zc2libGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9ucy5FYXN0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbEluYy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb25zLk5vcnRoZWFzdDpcclxuICAgICAgICAgICAgICAgICAgICByb3dJbmMtLTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xJbmMtLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9ucy5Ob3J0aDpcclxuICAgICAgICAgICAgICAgICAgICByb3dJbmMtLTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9ucy5Ob3J0aHdlc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcm93SW5jLS07XHJcbiAgICAgICAgICAgICAgICAgICAgY29sSW5jKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuV2VzdDpcclxuICAgICAgICAgICAgICAgICAgICBjb2xJbmMrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9ucy5Tb3V0aHdlc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcm93SW5jKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sSW5jKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuU291dGg6XHJcbiAgICAgICAgICAgICAgICAgICAgcm93SW5jKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbnMuU291dGhlYXN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJvd0luYysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbEluYy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEaXJlY3Rpb25hbCBlcnJvciAyLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2hlc3NTdGF0ZTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgQ2hlc3NTdGF0ZTtcclxuLy9tb2R1bGUuZXhwb3J0cy5DaGVzc1N0YXRlID0gQ2hlc3NTdGF0ZVxyXG5leHBvcnRzLkNoZXNzU3RhdGUgPSBDaGVzc1N0YXRlO1xyXG4vL2V4cG9ydCB7IENoZXNzU3RhdGUgfVxyXG4vLyBtb2R1bGUuZXhwb3J0cyA9IENoZXNzU3RhdGVcclxuLy8gICAgICAgICByZXR1cm4gQ2hlc3NTdGF0ZVxyXG4vLyAgICAgfVxyXG4vLyAvL0B0cy1pZ25vcmVcclxuLy8gICAgIGlmKHR5cGVvZih3aW5kb3cuQ2hlc3NTdGF0ZSkgPT09ICd1bmRlZmluZWQnKXtcclxuLy8gLy9AdHMtaWdub3JlXHJcbi8vICAgICAgICAgd2luZG93LkNoZXNzU3RhdGUgPSBteUxpYigpXHJcbi8vICAgICB9XHJcbi8vIH0pKHdpbmRvdylcclxuLy8gZXhwb3J0IGRlZmF1bHQgbnVsbFxyXG4iXSwic291cmNlUm9vdCI6IiJ9