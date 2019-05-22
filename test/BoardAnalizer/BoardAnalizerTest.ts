const assert = require('assert')
import BoardAnalyser from "../../src/BoardAnalyser"
import FenLogic from "../../src/FenLogic"
import BoardLoaction from "../../src/Interfaces/BoardLocation";
import StandardTurns from "../../src/Interfaces/Enums/StandardTurns";

describe('Board Analyser - Find King', () => {
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

        assert.strictEqual(JSON.stringify(expectedWhite), JSON.stringify(BoardAnalyser.findKing(board, StandardTurns.white)))
        assert.strictEqual(JSON.stringify(expectedBlack), JSON.stringify(BoardAnalyser.findKing(board, StandardTurns.black)))
    })
})

describe('Board Analyser - Checkmate', () => {
    it('Tests avoidable checkmate', () => {
        const board = FenLogic.FenToBoard("rnbq1bnr/pppppppp/k7/8/8/Q7/PPPPPPPP/RNB1KBNR w KQkq - 0 1")

        assert.strictEqual(true, BoardAnalyser.canAvoidCheckmateRaw(board, StandardTurns.black))
    })

    it('Tests unavoidable checkmate', () => {
        const board = FenLogic.FenToBoard("rnbq1bnr/pppppp2/kp6/1p6/8/Q7/PPPPPPPP/RNB1KBNR w KQkq - 0 1")
        assert.strictEqual(false, BoardAnalyser.canAvoidCheckmateRaw(board, StandardTurns.black))
    })
})

describe('Board Analyser - Path Between Pieces', () => {
    it('Verifies that there is a straight path between A2 and A7 from an initial position', () => {
        const board = FenLogic.FenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        // A2
        const loc1 = {
            row: 6,
            column: 0
        } as BoardLoaction
        // A7
        const loc2 = {
            row: 1,
            column: 0
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc1, loc2))
    })
    it('Verifies that there is not a straight path between A2 and A7 from an initial position', () => {
        const board = FenLogic.FenToBoard("rnbqkbnr/pppppppp/8/p7/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        // A2
        const loc1 = {
            row: 6,
            column: 0
        } as BoardLoaction
        // A7
        const loc2 = {
            row: 1,
            column: 0
        } as BoardLoaction

        assert.strictEqual(false, BoardAnalyser.existsAStraightPath(board, loc1, loc2))
    })
    it('Verifies that there is a straight path between A2 and A7 from an initial position but with flipped locations', () => {
        const board = FenLogic.FenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        // A2
        const loc1 = {
            row: 6,
            column: 0
        } as BoardLoaction
        // A7
        const loc2 = {
            row: 1,
            column: 0
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc2, loc1))
    })

    // The adjacent vertical case
    it('Verifies that there is a straight path between A2 and A1 from an initial position', () => {
        const board = FenLogic.FenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
        // A2
        const loc1 = {
            row: 6,
            column: 0
        } as BoardLoaction
        // A1
        const loc2 = {
            row: 7,
            column: 0
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc1, loc2))
    })
    it('Verifies that there is a straight path between 2 rooks on an empty board', () => {
        const board = FenLogic.FenToBoard("r6r/8/8/8/8/8/8/8 w KQkq - 0 1")
        const loc1 = {
            row: 0,
            column: 0
        } as BoardLoaction
        const loc2 = {
            row: 0,
            column: 7
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc1, loc2))
    })
    it('Verifies that there is a straight path between 2 rooks on an empty board but flipped locations', () => {
        const board = FenLogic.FenToBoard("r6r/8/8/8/8/8/8/8 w KQkq - 0 1")
        const loc1 = {
            row: 0,
            column: 0
        } as BoardLoaction
        const loc2 = {
            row: 0,
            column: 7
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc2, loc1))
    })
    it('Verifies that there is a straight diagonal path between 2 rooks on an empty board', () => {
        const board = FenLogic.FenToBoard("r7/8/8/8/8/8/8/7r w KQkq - 0 1")
        const loc1 = {
            row: 0,
            column: 0
        } as BoardLoaction
        const loc2 = {
            row: 7,
            column: 7
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc1, loc2))
    })
    it('Verifies that there is a straight diagonal path between 2 rooks on an empty board but flipped', () => {
        const board = FenLogic.FenToBoard("r7/8/8/8/8/8/8/7r w KQkq - 0 1")
        const loc1 = {
            row: 0,
            column: 0
        } as BoardLoaction
        const loc2 = {
            row: 7,
            column: 7
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc2, loc1))
    })
    it('Verifies that there is a straight diagonal path from NE to SW between 2 rooks on an empty board', () => {
        const board = FenLogic.FenToBoard("7r/8/8/8/8/8/8/r7 w KQkq - 0 1")
        const loc1 = {
            row: 0,
            column: 7
        } as BoardLoaction
        const loc2 = {
            row: 7,
            column: 0
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc1, loc2))
    })
    it('Verifies that there is a straight diagonal path from SW to NE between 2 rooks on an empty board', () => {
        const board = FenLogic.FenToBoard("7r/8/8/8/8/8/8/r7 w KQkq - 0 1")
        const loc1 = {
            row: 0,
            column: 7
        } as BoardLoaction
        const loc2 = {
            row: 7,
            column: 0
        } as BoardLoaction

        assert.strictEqual(true, BoardAnalyser.existsAStraightPath(board, loc2, loc1))
    })
})