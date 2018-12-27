import BoardLoaction from "./Interfaces/BoardLocation";

const constants = {
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

    "GameTypesEnum": Object.freeze({
        "standard": 1,
        "bughouse": 2,
        "plunder": 3,
    }),
   

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
    }
}

export default constants