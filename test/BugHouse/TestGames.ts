const TestGames = {
    "Basic pawn drop - Bughouse": {
        "expectedFens": {
            board0: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 1 2",
            board1: "rnbqkbnr/pppppppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
        },
        "moves": [
            {
                board: 0,
                move: "e4"
            },
            {
                board: 0,
                move: "d5"
            },
            {
                board: 0,
                move: "exd5"
            },
            {
                board: 1,
                move: "e4"
            },
            {
                board: 1,
                move: "e5~"
            },

        ]
    },
    "Basic pawn drop on board1 - Bughouse": {
        "expectedFens": {
            board0: "rnbqkbnr/pppppppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
            board1: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 1 2"
        },
        "moves": [
            {
                board: 1,
                move: "e4"
            },
            {
                board: 1,
                move: "d5"
            },
            {
                board: 1,
                move: "exd5"
            },
            {
                board: 0,
                move: "e4"
            },
            {
                board: 0,
                move: "e5~"
            }
        ]
    },
    "Test For Checkmate - Bughouse": {
        "expectedFens": {
            board0: "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 1 2",
            board1: "rnbqkbnr/pppppppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"
        },
        "moves": [
            {
                board: 0,
                move: "e4"
            }
        ]
    }
}

export default TestGames
