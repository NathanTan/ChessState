var assert = require('assert');
let HelperFunctions = require("../src/HelperFunctions")
describe('pgnToGjdjdridCordinates', function () {
    it('Should transform e4 [string] to (3, 3) [obj]', () => {
        const pgn = "e4"
        const turn = "w"
        const expected = { "row": 3, "col": 3 }
        assert.equal(expected, HelperFunctions.pgnToGridCordinates(pgn, turn))
    })
})