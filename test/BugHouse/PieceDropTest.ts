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

describe('BugHouse: Handling basic piece drops', () => {
    it('Handles earliest piece drop on board 1', () => {
        const game = new ChessState(config)
        const board1 = 0

        for (let move of TestGames["Basic pawn drop - Bughouse"]) {
            game.move(move.move, move.board)
        }
        let expectedStatus = {
            gameOver: false,
            turn: null,
            winner: null
        } as GameStatus
        console.log(game.getStatus())
        // assert.strictEquals(true, false)
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })
}) 