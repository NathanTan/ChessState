import BoardLoaction from "./Interfaces/BoardLocation"
import GameTypes from "./Interfaces/Enums/GameTypes"
import PieceTypes from "./Interfaces/Enums/PieceTypes"
import StandardTurns from "./Interfaces/Enums/StandardTurns"

const constants = {
    /* Default config object */
    defaultConfig: {
        gameType:   GameTypes.standard,
        fen:        null,
        debug:      false,
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
            { "row": 2, "column": -1 } as BoardLoaction,
            { "row": 2, "column": 1 } as BoardLoaction,
            { "row": 1, "column": 2 } as BoardLoaction,
            { "row": -1, "column": 2 } as BoardLoaction,
            { "row": -2, "column": 1 } as BoardLoaction,
            { "row": -2, "column": -1 } as BoardLoaction,
            { "row": -1, "column": -2 } as BoardLoaction,
            { "row": 1, "column": -2 } as BoardLoaction,
        ] as BoardLoaction[],
        "Bishop": [
            { "row": -1, "column": -1 } as BoardLoaction,
            { "row": -2, "column": -2 } as BoardLoaction,
            { "row": -3, "column": -3 } as BoardLoaction,
            { "row": -4, "column": -4 } as BoardLoaction,
            { "row": -5, "column": -5 } as BoardLoaction,
            { "row": -6, "column": -6 } as BoardLoaction,
            { "row": -7, "column": -7 } as BoardLoaction,
            { "row": 1, "column": -1 } as BoardLoaction,
            { "row": 2, "column": -2 } as BoardLoaction,
            { "row": 3, "column": -3 } as BoardLoaction,
            { "row": 4, "column": -4 } as BoardLoaction,
            { "row": 5, "column": -5 } as BoardLoaction,
            { "row": 6, "column": -6 } as BoardLoaction,
            { "row": 7, "column": -7 } as BoardLoaction,
            { "row": -1, "column": 1 } as BoardLoaction,
            { "row": -2, "column": 2 } as BoardLoaction,
            { "row": -3, "column": 3 } as BoardLoaction,
            { "row": -4, "column": 4 } as BoardLoaction,
            { "row": -5, "column": 5 } as BoardLoaction,
            { "row": -6, "column": 6 } as BoardLoaction,
            { "row": -7, "column": 7 } as BoardLoaction,
            { "row": 1, "column": 1 } as BoardLoaction,
            { "row": 2, "column": 2 } as BoardLoaction,
            { "row": 3, "column": 3 } as BoardLoaction,
            { "row": 4, "column": 4 } as BoardLoaction,
            { "row": 5, "column": 5 } as BoardLoaction,
            { "row": 6, "column": 6 } as BoardLoaction,
            { "row": 7, "column": 7 } as BoardLoaction,
        ] as BoardLoaction[],
        "Rook": [
            { "row": 1, "column": 0 } as BoardLoaction,
            { "row": 2, "column": 0 } as BoardLoaction,
            { "row": 3, "column": 0 } as BoardLoaction,
            { "row": 4, "column": 0 } as BoardLoaction,
            { "row": 5, "column": 0 } as BoardLoaction,
            { "row": 6, "column": 0 } as BoardLoaction,
            { "row": 7, "column": 0 } as BoardLoaction,
            { "row": -1, "column": 0 } as BoardLoaction,
            { "row": -2, "column": 0 } as BoardLoaction,
            { "row": -3, "column": 0 } as BoardLoaction,
            { "row": -4, "column": 0 } as BoardLoaction,
            { "row": -5, "column": 0 } as BoardLoaction,
            { "row": -6, "column": 0 } as BoardLoaction,
            { "row": -7, "column": 0 } as BoardLoaction,
            { "row": 0, "column": 1 } as BoardLoaction,
            { "row": 0, "column": 2 } as BoardLoaction,
            { "row": 0, "column": 3 } as BoardLoaction,
            { "row": 0, "column": 4 } as BoardLoaction,
            { "row": 0, "column": 5 } as BoardLoaction,
            { "row": 0, "column": 6 } as BoardLoaction,
            { "row": 0, "column": 7 } as BoardLoaction,
            { "row": 0, "column": -1 } as BoardLoaction,
            { "row": 0, "column": -2 } as BoardLoaction,
            { "row": 0, "column": -3 } as BoardLoaction,
            { "row": 0, "column": -4 } as BoardLoaction,
            { "row": 0, "column": -5 } as BoardLoaction,
            { "row": 0, "column": -6 } as BoardLoaction,
            { "row": 0, "column": -7 } as BoardLoaction,
//            { "row": , "column":  } as BoardLoaction,
        ] as BoardLoaction[],
        "King": [
            { "row": -1, "column": -1 } as BoardLoaction,
            { "row": -1, "column": 0 } as BoardLoaction,
            { "row": -1, "column": 1 } as BoardLoaction,
            { "row": 0, "column": 1 } as BoardLoaction,
            { "row": 1, "column": 1 } as BoardLoaction,
            { "row": 1, "column": 0 } as BoardLoaction,
            { "row": 1, "column": -1 } as BoardLoaction,
            { "row": 0, "column": -1 } as BoardLoaction,
        ] as BoardLoaction[],
        "Queen": [
            { "row": -1, "column": -1 } as BoardLoaction,
            { "row": -2, "column": -2 } as BoardLoaction,
            { "row": -3, "column": -3 } as BoardLoaction,
            { "row": -4, "column": -4 } as BoardLoaction,
            { "row": -5, "column": -5 } as BoardLoaction,
            { "row": -6, "column": -6 } as BoardLoaction,
            { "row": -7, "column": -7 } as BoardLoaction,
            { "row": -1, "column": 0 } as BoardLoaction,
            { "row": -2, "column": 0 } as BoardLoaction,
            { "row": -3, "column": 0 } as BoardLoaction,
            { "row": -4, "column": 0 } as BoardLoaction,
            { "row": -5, "column": 0 } as BoardLoaction,
            { "row": -6, "column": 0 } as BoardLoaction,
            { "row": -7, "column": 0 } as BoardLoaction,
            { "row": -1, "column": 1 } as BoardLoaction,
            { "row": -2, "column": 2 } as BoardLoaction,
            { "row": -3, "column": 3 } as BoardLoaction,
            { "row": -4, "column": 4 } as BoardLoaction,
            { "row": -5, "column": 5 } as BoardLoaction,
            { "row": -6, "column": 6 } as BoardLoaction,
            { "row": -7, "column": 7 } as BoardLoaction,
            { "row": 0, "column": 1 } as BoardLoaction,
            { "row": 0, "column": 2 } as BoardLoaction,
            { "row": 0, "column": 3 } as BoardLoaction,
            { "row": 0, "column": 4 } as BoardLoaction,
            { "row": 0, "column": 5 } as BoardLoaction,
            { "row": 0, "column": 6 } as BoardLoaction,
            { "row": 0, "column": 7 } as BoardLoaction,
            { "row": 1, "column": 1 } as BoardLoaction,
            { "row": 2, "column": 2 } as BoardLoaction,
            { "row": 3, "column": 3 } as BoardLoaction,
            { "row": 4, "column": 4 } as BoardLoaction,
            { "row": 5, "column": 5 } as BoardLoaction,
            { "row": 6, "column": 6 } as BoardLoaction,
            { "row": 7, "column": 7 } as BoardLoaction,
            { "row": 1, "column": 0 } as BoardLoaction,
            { "row": 2, "column": 0 } as BoardLoaction,
            { "row": 3, "column": 0 } as BoardLoaction,
            { "row": 4, "column": 0 } as BoardLoaction,
            { "row": 5, "column": 0 } as BoardLoaction,
            { "row": 6, "column": 0 } as BoardLoaction,
            { "row": 7, "column": 0 } as BoardLoaction,
            { "row": 1, "column": -1 } as BoardLoaction,
            { "row": 2, "column": -2 } as BoardLoaction,
            { "row": 3, "column": -3 } as BoardLoaction,
            { "row": 4, "column": -4 } as BoardLoaction,
            { "row": 5, "column": -5 } as BoardLoaction,
            { "row": 6, "column": -6 } as BoardLoaction,
            { "row": 7, "column": -7 } as BoardLoaction,
            { "row": 0, "column": -1 } as BoardLoaction,
            { "row": 0, "column": -2 } as BoardLoaction,
            { "row": 0, "column": -3 } as BoardLoaction,
            { "row": 0, "column": -4 } as BoardLoaction,
            { "row": 0, "column": -5 } as BoardLoaction,
            { "row": 0, "column": -6 } as BoardLoaction,
            { "row": 0, "column": -7 } as BoardLoaction,
        ] as BoardLoaction[],
    },

    /* Only intended for standard games */
    "BoardWidth": 8,
    "BoardHeight": 8,

    "PieceTypes": {
        "p": PieceTypes.Pawn,
        "P": PieceTypes.Pawn,
        "n": PieceTypes.Knight,
        "N": PieceTypes.Knight,
        "b": PieceTypes.Bishop,
        "B": PieceTypes.Bishop,
        "r": PieceTypes.Rook,
        "R": PieceTypes.Rook,
        "q": PieceTypes.Queen,
        "Q": PieceTypes.Queen,
        "k": PieceTypes.King,
        "K": PieceTypes.King
    },

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


    "PiecePGNToColor": {
        "p": StandardTurns.black,
        "P": StandardTurns.white,
        "n": StandardTurns.black,
        "N": StandardTurns.white,
        "b": StandardTurns.black,
        "B": StandardTurns.white,
        "r": StandardTurns.black,
        "R": StandardTurns.white,
        "q": StandardTurns.black,
        "Q": StandardTurns.white,
        "k": StandardTurns.black,
        "K": StandardTurns.white
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
}

export default constants