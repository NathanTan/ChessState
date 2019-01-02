var assert = require('assert');
//let HelperFunctions = require("../dist/src/HelperFunctions.js")
import HelperFunctions from "../dist/src/HelperFunctions.js"

describe('test', function () {
    it('test', () => {
        const pgn = "e4"
        const turn = "w"
        const expected = { "row": 3, "col": 3 }
        // assert.equal(expected, HelperFunctions.pgnToGridCordinates(pgn, turn))
        assert.equal(1, 1)
        assert.equal(1, HelperFunctions.testMethod())
    })
})