var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import GameStatus from "../../src/Interfaces/GameStatus"
import TestGames from "./TestGames"
import StandardTurns from "../../src/Interfaces/Enums/StandardTurns"

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      false,
    hideOutput: true
}


describe('BugHouse: Handling basic piece drops', () => {
    it('Handles earliest piece drop on board 0', () => {
        let temp = config
        const game = new ChessState(temp)
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
        const game = new ChessState(config)
        const board0 = 0
        const board1 = 1
        const gameName = "Basic pawn drop on board1 - Bughouse"
        let i = 0

        for (let move of TestGames[gameName].moves) {
            game.move(move.move, move.board)

            if (i === 2 || i === 3) {
                assert.strictEqual(0, game.getExtraPieces(board0, StandardTurns.white).length)
                assert.strictEqual('p', game.getExtraPieces(board0, StandardTurns.black)[0])
                assert.strictEqual(0, game.getExtraPieces(board1, StandardTurns.white).length)
                assert.strictEqual(0, game.getExtraPieces(board1, StandardTurns.black).length)
            }
            i++
        }

        let expectedStatus = {
            gameOver: false,
            turn: null,
            winner: null
        } as GameStatus

        // Check for board 0 position
        assert.strictEqual(TestGames[gameName].expectedFens.board0,
            game.getFen(board0, true, true)
        )

        // Check for board 1 position
        assert.strictEqual(TestGames[gameName].expectedFens.board1,
            game.getFen(board1, true, true)
        )

        // Check for game status
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })
}) 