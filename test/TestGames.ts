const TestGames = {
    "Fried Liver Attack": [
        //w     b
        "e4",   "e5",   
        "Nf3",  "Nc6",
        "Bc4",  "Nf6",
        "Ng5",  "d5",
        "exd5", "Nxd5",
        "Nxf7", "Kxf7",
        "Qf3+", "Ke6",
        "Nc3",
    ],
    "Ruy Lopez": [
        "e4",   "e5",
        "Nf3",  "Nc6",
        "Bb5",  "a6",
        "Ba4",  "Nf6",
        "0-0",  "d6"
    ],
    "Yugoslav Attack": [
        "e4",   "c5",
        "Nf3",  "d6",
        "d4",   "cxd4",
        "Nxd4", "Nf6",
        "Nc3",  "g6",
        "Be3",  "Bg7",
        "f3",   "0-0",
        "Qd2",  "Nc6",
        "Bc4",  "Bd7",
        "0-0-0"
    ],
    "e4": [
        "e4"
    ],
    "4 Move Checkmate": [
        "e4",   "e5",
        "Bc4",  "Nc6",
        "Qh5",  "d6",
        "Qxf7++"
    ],

    /* Adolf Anderssen vs Lionel Kieseritzky, 1851 */
    "The Immortal Game": [
        "e4",   "e5",
        "f4",   "exf4",
        "Bc4",  "Qh4+",
        "Kf1",  "b5",
        "Bxb5", "Nf6",
        "Nf3",  "Qh6",
        "d3",   "Nh5",
        "Nh4",  "Qg5",
        "Nf5",  "c5",
        "g4",   "Nf6",
        "Rg1",  "cxb5",
        "h4",   "Qg6",
        "h5",   "Qg5",
        "Qf3",  "Ng8",
        "Bxf4", "Qf6",
        "Nc3",  "Bc5",
        "Nd5",  "Qxb2",
        "Bd6",  "Bxg1",
        "e5",   "Qxa1+",
        "Ke2",  "Na6",
        "Nxg7+", "Kd8",
        "Qf6+", "Nxf6",
        "Be7",  "resign"
    ],

    "Test King Side Castling White": [
        "e4",   "e5",   
        "Nf3",  "Nc6",
        "Bc4",  "Nf6",
        "O-O"
    ]
}

export default TestGames
