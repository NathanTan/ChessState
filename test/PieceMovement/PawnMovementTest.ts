var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import GameStatus from "../../src/Interfaces/GameStatus";

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    hideOutput: true
}

const TestGames = {
    "En Passant": [
        "e4",   "c5",
        "e5",   "d5",
        "exd6", "c4",   // White does En Passant
        "b4",   "cxb3", // Black does En Passant
    ],
}

describe('Pawn Movement: Normal', () => {
    it('e4', () => {
        const game = new ChessState(config)
        const expectedStatus = {
            gameOver:   false,
            turn:       null,
            winner:     null
        } as GameStatus
        const expectedFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 1 1'
        const expectedResult = { whiteKingSideCastle: false,
            whiteQueenSideCastle: false,
            blackKingSideCastle: false,
            blackQueenSideCastle: false,
            kingLocation: null,
            movedPiece: 0,
            movedPieceDest: { row: 4, column: 4 },
            check: false,
            gameIsOver: false,
            moveIsInvalid: false,
            invalidMove: null,
            enableEnPassant: 'e3',
            executeEnPassant: false }

        let result = game.move('e4')

        /* Check game status */
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))

        /* Check board position */
        assert.strictEqual(expectedFen, game.getFen())

        /* Check move result */
        assert.strictEqual(JSON.stringify(expectedResult),
            JSON.stringify(result))
    })
})

describe('Pawn Movement: En Passant', () => {
    it('En Passant for both white and black', () => {
        const game = new ChessState(config)
        const expectedStatus = {
            gameOver:   false,
            turn:       null,
            winner:     null
        } as GameStatus
        const expectedFen = 'rnbqkbnr/pp2pppp/3P4/8/8/1p6/P1PP1PPP/RNBQKBNR w KQkq - 0 5'

        for (let move of TestGames["En Passant"]) {
            game.move(move)
        }

        /* Check game status */
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))

        /* Check board position */
        assert.strictEqual(expectedFen, game.getFen())
        
    })
})