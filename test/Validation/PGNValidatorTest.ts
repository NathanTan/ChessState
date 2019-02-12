// var assert = require('assert')
// import ValidatePGN from "../../src/PGNValidator"
// import ChessState from "../../src/ChessState"


// describe('PGN Validation: Valid PGNs', () => {


//     it (`Valid PGNs`, () => {
//         const pgns = [
//             "e4",
//             "e5",
//             "h1",
//             "Bf5",

//         ]
//         const pgn = null
//         const result = ValidatePGN(null, pgn, true, false)
//         const expected = false 

//         assert.strictEqual(expected, result)
//     })

   
// })

// describe(`PGN Validation: Invalid PGNs`, () => {
//     it (`Test null`, () => {
//         const pgn = null
//         const result = ValidatePGN(null, pgn, true, false)
//         const expected = false 

//         assert.strictEqual(expected, result)
//     })
//     it (`Invalid PGNs`, () => {
//         const pgns = [
//             "ee4",
//             "e12",
//             ")0)",
//             "B5",
//             "Bz3",  //
            
//         ]
//         const pgn = null
//         const result = ValidatePGN(null, pgn, true, false)
//         const expected = false 

//         assert.strictEqual(expected, result)
//     })

//     it ("Invalid column", () => {
//         const pgns = [
//             "z4",
//             "_12",
//             ")0)",
//             "B5",
//             "Bz3",  //
            
//         ]
//         const pgn = null
//         const result = ValidatePGN(null, pgn, true, false)
//         const expected = false 

//         assert.strictEqual(expected, result)
//     })

//     it ("Out of row range", () => {
//         const pgns = [
//             "e-1",
//             "a0",
//             "h9",
//             "h19"
//         ]
//         let result = true

//         pgns.forEach(pgn => {
//             result = result && ValidatePGN(null, pgn, true, false)
//         })

//         assert.strictEqual(true, result)
//     })
// })