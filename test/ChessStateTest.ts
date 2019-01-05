var assert = require('assert')
import ChessState from "../src/ChessState"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import BoardLoaction from "../src/Interfaces/BoardLocation"
import StandardTurns from "../src/Interfaces/Enums/StandardTurns"
import Config from "../src/Interfaces/Config"

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    testGame:   null,
    hideOutput: true
}

describe('ChessState squareIsSafeForKing function', function () {
    it(`Indicates that the square 0, 0 (A8) is safe from white's pieces on turn 1`, () => {
        const game = new ChessState(config)
        let squareOfInterest: BoardLoaction = {
            row:    0,
            column: 0
        }
        assert.equal(true, game.squareIsSafeForKing(squareOfInterest, StandardTurns.white, GameTypes.standard))
    })

    it(`Indicates that the square 5, 2 (C3) is not safe from white's pieces on turn 1`, () => {
        const game = new ChessState(config)
        // C3
        let squareOfInterest: BoardLoaction = {
            row:    5,
            column: 2
        }

        // Should return false because a knight can move to C3 on the first turn.
        assert.equal(false, game.squareIsSafeForKing(squareOfInterest, StandardTurns.white, GameTypes.standard, true))
    })

    it(`Indicates that the square 0, 0 (A8) is safe from black's pieces on turn 1`, () => {
        const game = new ChessState(config)
        let squareOfInterest: BoardLoaction = {
            row:    0,
            column: 0
        }
        assert.equal(true, game.squareIsSafeForKing(squareOfInterest, StandardTurns.black, GameTypes.standard))
    })
})