var assert = require('assert')
import ChessState from "../src/ChessState"
import ExecuteTurn from "../src/MoveProcessor.js"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import TestGames from "./TestGames"
import MoveResult from "../src/Interfaces/MoveResult"
import Config from "../src/Interfaces/Config"
import PieceTypes from "../src/Interfaces/Enums/PieceTypes"

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    hideOutput: true
}

describe('Move Execution: e4', function () {
    it('should return the correct move result object, and the state should be appropriately updated.', () => {
        let game = new ChessState(config)
        const pgn = "e4"
        const expected = { whiteKingSideCastle: false,
            whiteQueenSideCastle:   false,
            blackKingSideCastle:    false,
            blackQueenSideCastle:   false,
            kingLocation:           null,
            movedPiece:             PieceTypes.Pawn,
            movedPieceDest:         { row: 4, column: 4}, // e4
            check:                  false,
            gameIsOver:             false,
            moveIsInvalid:          false,
            invalidMove:            null
          } as MoveResult
        
        let expectedFen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1"

        const result = ExecuteTurn(game, pgn, config.hideOutput)

        // TODO: evaulate objects in a more robust way.
        assert.strictEqual(JSON.stringify(expected), JSON.stringify(result))

        // Check board position to make sure the pawn was moved.
        assert.strictEqual(expectedFen, game.getFen())
    })
})

describe('Move Execution: e4 e5', function () {
    it('should return the correct move result object, and the state should be appropriately updated.', () => {
        let game = new ChessState(config)
        const expected = { whiteKingSideCastle: false,
            whiteQueenSideCastle:   false,
            blackKingSideCastle:    false,
            blackQueenSideCastle:   false,
            kingLocation:           null,
            movedPiece:             PieceTypes.Pawn,
            movedPieceDest:         { row: 4, column: 4}, // e4  
            check:                  false,
            gameIsOver:             false,
            moveIsInvalid:          false,
            invalidMove:            null
        } as MoveResult
        const expected2 = { whiteKingSideCastle: false,
            whiteQueenSideCastle:   false,
            blackKingSideCastle:    false,
            blackQueenSideCastle:   false,
            kingLocation:           null,
            movedPiece:             PieceTypes.Pawn,
            movedPieceDest:         { row: 3, column: 4}, // e5
            check:                  false,
            gameIsOver:             false,
            moveIsInvalid:          false,
            invalidMove:            null 
        } as MoveResult
    
        let expectedFen = `rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2`

        let result = game.move("e4")
        assert.strictEqual(JSON.stringify(expected), JSON.stringify(result))

        result = game.move("e5")

        // TODO: evaulate objects in a more robust way.
        assert.strictEqual(JSON.stringify(expected2), JSON.stringify(result))

        // Check board position to make sure the pawn was moved.
        assert.strictEqual(expectedFen.trim(),game.getFen().trim())
    })
})