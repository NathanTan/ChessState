var assert = require('assert');
import HelperFunctions from "../src/HelperFunctions";
import BoardLoaction from "../src/Interfaces/BoardLocation";

describe('mapBoardPositionToChessNotation', () => {
    it('maps position row 7 col 0 to a1', () => {
        const expected = 'a1'
        const result = HelperFunctions.mapBoardPositionToChessNotation(7, 0)

        assert.strictEqual(expected, result)
    })

    it('maps position row 0 col 0 to a8', () => {
        const expected = 'a8'
        const result = HelperFunctions.mapBoardPositionToChessNotation(0, 0)

        assert.strictEqual(expected, result)
    })

    it('maps position row 4 col 4 to e4', () => {
        const expected = 'e4'
        const result = HelperFunctions.mapBoardPositionToChessNotation(4, 4)

        assert.strictEqual(expected, result)
    })

    it('maps position row 7 col 7 to h1', () => {
        const expected = 'h1'
        const result = HelperFunctions.mapBoardPositionToChessNotation(7, 7)

        assert.strictEqual(expected, result)
    })
})

describe('mapChessNotationToBoardPosition', () => {
    it('maps notation e4 to position (4,4)', () => {
        const expected: BoardLoaction = {
            row: 4,
            column: 4
        }
        const result = HelperFunctions.mapChessNotationToBoardPosition("e4")

        assert.strictEqual(JSON.stringify(expected), JSON.stringify(result))
    })

    it('maps notation a1 to position (7,0)', () => {
        const expected: BoardLoaction = {
            row: 7,
            column: 0
        }
        const result = HelperFunctions.mapChessNotationToBoardPosition("a1")

        assert.strictEqual(JSON.stringify(expected), JSON.stringify(result))
    })


    it('maps notation a8 to position (0,0)', () => {
        const expected: BoardLoaction = {
            row: 0,
            column: 0
        }
        const result = HelperFunctions.mapChessNotationToBoardPosition("a8")

        assert.strictEqual(JSON.stringify(expected), JSON.stringify(result))
    })
})