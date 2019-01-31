var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import BoardLoaction from "../../src/Interfaces/BoardLocation"
import StandardTurns from "../../src/Interfaces/Enums/StandardTurns"
import Config from "../../src/Interfaces/Config"
import GameStatus from "../../src/Interfaces/GameStatus";
import TestGames from "../TestGames";

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    hideOutput: true
}

describe('Pawn Movement', () => {
    it('e4', () => {
        const game = new ChessState(config)
        console.log(game.getStatus())
        const expectedStatus = {
            gameOver:   false,
            turn:       null,
            winner:     null
        } as GameStatus
        const expectedFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 1 1'

        game.move('e4')

        /* Check game status */
        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))

        /* Check board position */
        assert.strictEqual(expectedFen, game.getFen())
        
    })
})