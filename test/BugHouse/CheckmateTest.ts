var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import TestGames from "./TestGames"
import ExpectedPlayerStatus from "./ExpectedPlayerStatus";

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      true,
    hideOutput: true
}


describe('BugHouse: Tests checkmate', () => {
    it('Checks player status for fastest piece drop', () => {
        const game = new ChessState(config)
        const board0 = 0
        const board1 = 1
        const gameName = "Test For Checkmate - Bughouse"
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
    })
})