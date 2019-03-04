var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import GameStatus from "../../src/Interfaces/GameStatus"
import TestGames from "./TestGames"

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      true,
    hideOutput: true
}
const config2: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      true,
    hideOutput: false
}


describe('BugHouse: Handling basic piece drops', () => {
    it('Handles earliest piece drop on board 0', () => {
        const game = new ChessState(config)
        const board0 = 0
        const board1 = 1
        const gameName = "Basic pawn drop - Bughouse"

        for (let move of TestGames[gameName].moves) {
            game.move(move.move, move.board)
        }

        let expectedStatus = {
            gameOver: false,
            turn: null,
            winner: null
        } as GameStatus

        // Check for board 0 position
        assert.strictEqual(TestGames[gameName].expectedFens.board0,
            game.getFen(board0)
        )

        // Check for board 0 position
        assert.strictEqual(TestGames[gameName].expectedFens.board1,
            game.getFen(board1)
        )

        // Check for game status
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })

    it('Handles earliest piece drop on board 1', () => {
        const game = new ChessState(config2	)
        const board0 = 0
        const board1 = 1
        const gameName = "Basic pawn drop on board1 - Bughouse"

        for (let move of TestGames[gameName].moves) {
            game.move(move.move, move.board)
        }

        let expectedStatus = {
            gameOver: false,
            turn: null,
            winner: null
        } as GameStatus

        // Check for board 0 position
        assert.strictEqual(TestGames[gameName].expectedFens.board0,
            game.getFen(board0)
        )

        // Check for board 1 position
        assert.strictEqual(TestGames[gameName].expectedFens.board1,
            game.getFen(board1)
        )

        // Check for game status
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })
}) 