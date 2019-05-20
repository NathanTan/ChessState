const assert = require('assert')
import BoardAnalizer from "../src/BoardAnalizer"
import FenLogic from "../src/FenLogic"
import BoardLoaction from "../src/Interfaces/BoardLocation";
import StandardTurns from "../src/Interfaces/Enums/StandardTurns";
import BoardPrinter from "../src/BoardPrinter";

describe('Board Analizer - Find King', () => {
    it('Finds both kings at starting location', () => {
        const board = FenLogic.FenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        const expectedWhite = {
            row: 7,
            column: 4
        } as BoardLoaction

        const expectedBlack = {
            row: 0,
            column: 4
        } as BoardLoaction

        assert.strictEqual(JSON.stringify(expectedWhite), JSON.stringify(BoardAnalizer.findKing(board, StandardTurns.white)))
        assert.strictEqual(JSON.stringify(expectedBlack), JSON.stringify(BoardAnalizer.findKing(board, StandardTurns.black)))
    })
})

describe('Board Analizer - Checkmate', () => {
    it('Tests avoidable checkmate', () => {
        const board = FenLogic.FenToBoard("rnbq1bnr/pppppppp/k7/8/8/Q7/PPPPPPPP/RNB1KBNR w KQkq - 0 1")

        assert.strictEqual(true, BoardAnalizer.canAvoidCheckmateRaw(board, StandardTurns.black))
    })

    it('Tests unavoidable checkmate', () => {
        const board = FenLogic.FenToBoard("rnbq1bnr/pppppp2/kp6/1p6/8/Q7/PPPPPPPP/RNB1KBNR w KQkq - 0 1")
        BoardPrinter.printBoard(board, StandardTurns.white, false)
        assert.strictEqual(false, BoardAnalizer.canAvoidCheckmateRaw(board, StandardTurns.black))
    })
})