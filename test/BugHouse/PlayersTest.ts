var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import GameStatus from "../../src/Interfaces/GameStatus"
import TestGames from "./TestGames"
import PlayerStatus from "../../src/Interfaces/PlayerStatus";
import ExpectedPlayerStatus from "./ExpectedPlayerStatus";

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      true,
    hideOutput: true
}


describe('BugHouse: Checks player status', () => {
    it('Checks player status for fastest piece drop', () => {
        const game = new ChessState(config)
        const board0 = 0
        const board1 = 1
        const gameName = "Basic pawn drop - Bughouse"
        const expectedStatus = ExpectedPlayerStatus[gameName]

        for (let i = 0; i < 4; i++) {
            assert.strictEqual(JSON.stringify(expectedStatus[i]), 
                JSON.stringify(game.getPlayerStatus(i)))
        }

        let counter = 0
        for (let move of TestGames[gameName].moves) {
            game.move(move.move, move.board)
            counter++
            for (let i = 0; i < 4; i++) {
                assert.strictEqual(JSON.stringify(expectedStatus[i + (4 * counter)]), 
                    JSON.stringify(game.getPlayerStatus(i)))
            } 
        }

        let expectedGameStatus = {
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
        assert.strictEqual(JSON.stringify(expectedGameStatus),
            JSON.stringify(game.getStatus()))
    })

    it('Checks player status for fastest piece drop on board 2', () => {
        const game = new ChessState(config)
        const board0 = 0
        const board1 = 1
        const gameName = "Basic pawn drop on board1 - Bughouse"
        const expectedStatus = ExpectedPlayerStatus[gameName]

        for (let i = 0; i < 4; i++) {
            assert.strictEqual(JSON.stringify(expectedStatus[i]), 
                JSON.stringify(game.getPlayerStatus(i)))
        }

        let counter = 0
        for (let move of TestGames[gameName].moves) {
            game.move(move.move, move.board)
            counter++
            for (let i = 0; i < 4; i++) {
                assert.strictEqual(JSON.stringify(expectedStatus[i + (4 * counter)]), 
                    JSON.stringify(game.getPlayerStatus(i)))
            } 
        }

        let expectedGameStatus = {
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
        assert.strictEqual(JSON.stringify(expectedGameStatus),
            JSON.stringify(game.getStatus()))
    })
})