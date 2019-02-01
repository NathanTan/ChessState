var assert = require('assert')
import BoardLoaction from "../src/Interfaces/BoardLocation"
import FenLogic from "../src/FenLogic"
import FenExtras from "../src/Interfaces/FenExtras";
import StandardTurns from "../src/Interfaces/Enums/StandardTurns";

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

describe('BoardToFen static method', () => {
    it('test 1', () => {
        const expectedFen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
        const board = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', ],
                        ['8'],
                        ['8'],
                        ['4P3'],
                        ['8'],
                        ['P', 'P', 'P', 'P', '1', 'P', 'P', 'P'],
                        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']]
        const fenExtras = {
            turn: StandardTurns.black,
            castling: "KQkq",
            enPassant: "e3",
            halfMoves: 0,
            fullMoves: 1
        } as FenExtras

        const resultFen = FenLogic.BoardToFen(board, fenExtras, false)
        assert.strictEqual(expectedFen, resultFen)
    })
})