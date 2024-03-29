var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import TestGames from "./TestGames"
import ExpectedPlayerStatus from "./ExpectedPlayerStatus";

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      false,
    hideOutput: true
}


describe('BugHouse: Test checkmate', () => {
    it('Checks player status for 2 move checkmate', () => {
        const game = new ChessState(config)
        const gameName = "Test For Checkmate - Bughouse"
        const expectedStatus = ExpectedPlayerStatus[gameName]

        // Check the inital position
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