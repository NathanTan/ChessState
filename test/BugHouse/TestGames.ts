const TestGames = {
    "Basic pawn drop - Bughouse": {
        "expectedFens": {
            board0 : "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3",
            board1 : "rnbqkbnr/pppppppp/8/8/4P3/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
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
                move: "e4~"
            }
        ]
    },
    "Basic pawn drop on board1 - Bughouse": {
        "expectedFens": {
            board0 : "rnbqkbnr/pppppppp/8/8/4P3/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            board1 : "rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3"
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
                move: "e4~"
            }
        ]
    }
}

export default TestGames
