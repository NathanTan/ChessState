var constants = {
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
            { "row": 2, "col": -1 },
            { "row": 2, "col": 1 },
            { "row": 1, "col": 2 },
            { "row": -1, "col": 2 },
            { "row": -2, "col": 1 },
            { "row": -2, "col": -1 },
            { "row": -1, "col": -2 },
            { "row": 1, "col": -2 },
        ]
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
};
export default constants;
