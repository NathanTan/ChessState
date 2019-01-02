var assert = require('assert');
import ChessState from "../src/ChessState"
import ExecuteTurn from "../src/MoveProcessor.js"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import TestGames from "./TestGames"
import MoveResult from "../src/Interfaces/MoveResult";

let game = new ChessState(GameTypes.standard, null, false, TestGames["Yugoslav Attack"])

describe('Move Execution', function () {
    it('should return the correct move result object, and the state should be appropriately updated.', () => {
        const pgn = "e4"
        const expected = { whiteKingSideCastle: false,
            whiteQueenSideCastle: false,
            blackKingSideCastle: false,
            blackQueenSideCastle: false,
            kingLocation: null
          } as MoveResult
        const result = ExecuteTurn(game, pgn)
        console.log(result)
        // assert.equal(expected, HelperFunctions.pgnToGridCordinates(pgn, turn))
        assert.equal(1, 1)
        assert.equal(true, (JSON.stringify(expected) === JSON.stringify(result) ))
    })
})