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