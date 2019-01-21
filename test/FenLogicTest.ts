var assert = require('assert')
import BoardLoaction from "../src/Interfaces/BoardLocation"
import FenLogic from "../src/FenLogic"

describe('Fen logic static methods', () => {
    it ('Identifies the white king location in the fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"', () => {
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        const kingLocationExpected = { row: 0, column: 4 } as BoardLoaction
        const kingLocationResult = FenLogic.GetWhiteKingLocation(fen)

        assert.strictEqual(kingLocationExpected.toString(), kingLocationResult.toString())
    })

    it ('Handles null when trying to get the white king location', () => {
        const fen = null
        const kingLocationExpected = null
        const kingLocationResult = FenLogic.GetWhiteKingLocation(fen)

        assert.strictEqual(kingLocationExpected, kingLocationResult)
    })

    it ('Identifies the black king location in the fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"', () => {
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        const kingLocationExpected = { row: 0, column: 4 } as BoardLoaction
        const kingLocationResult = FenLogic.GetBlackKingLocation(fen)

        assert.strictEqual(kingLocationExpected.toString(), kingLocationResult.toString())
    })

    it ('Handles null when trying to get the black king location', () => {
        const fen = null
        const kingLocationExpected = null
        const kingLocationResult = FenLogic.GetBlackKingLocation(fen)

        assert.strictEqual(kingLocationExpected, kingLocationResult)
    })
})