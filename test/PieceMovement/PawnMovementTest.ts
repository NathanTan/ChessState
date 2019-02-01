var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import BoardLoaction from "../../src/Interfaces/BoardLocation"
import StandardTurns from "../../src/Interfaces/Enums/StandardTurns"
import Config from "../../src/Interfaces/Config"
import GameStatus from "../../src/Interfaces/GameStatus";

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    hideOutput: false
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
        const game = new ChessState(null)
        console.log(game.getStatus())
        const expectedStatus = {
            gameOver:   false,
            turn:       null,
            winner:     null
        } as GameStatus
        const expectedFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 1 1'

        let result = game.move('e4')

        /* Check game status */
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))

        /* Check board position */
        assert.strictEqual(expectedFen, game.getFen())
        
    })
})

describe('Pawn Movement: En Passant', () => {
    it('En Passant for both white and black', () => {
        const game = new ChessState(config)
        console.log(game.getStatus())
        const expectedStatus = {
            gameOver:   false,
            turn:       null,
            winner:     null
        } as GameStatus
        const expectedFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 1 1'

        let count = 1
        for (let move of TestGames["En Passant"]) {
            game.move(move)
            console.log(`Move: ${count}`)
            count++
        }

        /* Check game status */
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))

        /* Check board position */
        assert.strictEqual(expectedFen, game.getFen())
        
    })
})