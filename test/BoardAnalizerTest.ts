const assert = require('assert')
import BoardAnalizer from "../src/BoardAnalizer"
import FenLogic from "../src/FenLogic"
import BoardLoaction from "../src/Interfaces/BoardLocation";
import StandardTurns from "../src/Interfaces/Enums/StandardTurns";

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