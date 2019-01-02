var assert = require('assert');
import MoveProcessor from "../dist/src/MoveProcessor.js"
import GameTypes from "../dist/src/GameTypes.js"
import TestGames from "."

let game = new ChessState(GameTypes.standard, null, true, TestGames["Yugoslav Attack"])

describe('test', function () {
    it('test', () => {
        const pgn = "e4"
        const turn = "w"
        const expected = { "row": 3, "col": 3 }
        // assert.equal(expected, HelperFunctions.pgnToGridCordinates(pgn, turn))
        assert.equal(1, 1)
        assert.equal(1, MoveProcessor.ExecuteTurn())
    })
})