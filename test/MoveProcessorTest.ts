var assert = require('assert')
import ChessState from "../src/ChessState"
import ExecuteTurn from "../src/MoveProcessor.js"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import TestGames from "./TestGames"
import MoveResult from "../src/Interfaces/MoveResult"
import Config from "../src/Interfaces/Config"

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    testGame:   null,
    hideOutput: true
}

describe('Move Execution: e4', function () {
    it('should return the correct move result object, and the state should be appropriately updated.', () => {
        let game = new ChessState(config)
        const pgn = "e4"
        const expected = { whiteKingSideCastle: false,
            whiteQueenSideCastle: false,
            blackKingSideCastle: false,
            blackQueenSideCastle: false,
            kingLocation: null
          } as MoveResult
        
        let expectedFen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR0 KQkq - 0 1"

        const result = ExecuteTurn(game, pgn)

        // TODO: evaulate objects in a more robust way.
        assert.equal(true, (JSON.stringify(expected) === JSON.stringify(result) ))

        // Check board position to make sure the pawn was moved.
        assert.equal(expectedFen, game.getFen())
    })
})

describe('Move Execution: e4 e5', function () {
    it('should return the correct move result object, and the state should be appropriately updated.', () => {
        let game = new ChessState(config)
        const expected = { whiteKingSideCastle: false,
            whiteQueenSideCastle: false,
            blackKingSideCastle: false,
            blackQueenSideCastle: false,
            kingLocation: null
          } as MoveResult
        
        let expectedFen = "rnbqkbnr/pppp1ppp/8/4P3/4P3/8/PPPP1PPP/RNBQKBNR0 KQkq - 0 2"

        let result = game.move("e4")
        assert.strictEqual(true, (JSON.stringify(expected) === JSON.stringify(result) ))

        result = game.move("e5")
        console.log(expectedFen)
        console.log(game.getFen())
        console.log(expectedFen === game.getFen())

        // TODO: evaulate objects in a more robust way.
        assert.strictEqual(true, (JSON.stringify(expected) === JSON.stringify(result) ))

        // Check board position to make sure the pawn was moved.
        assert.strictEqual(expectedFen, game.getFen())
    })
})