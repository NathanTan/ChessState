var assert = require('assert')
import ChessState from "../src/ChessState"
import ExecuteTurn from "../src/MoveProcessor.js"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import MoveResult from "../src/Interfaces/MoveResult"
import Config from "../src/Interfaces/Config"
import BoardPrinter from "../src/BoardPrinter";
import StandardTurns from "../src/Interfaces/Enums/StandardTurns";

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    hideOutput: true
}

describe('Board Printer', function () {
    it(`Displays the board with a starting position from white's perspective.`, () => {
        let game = new ChessState(config)
        const expected = `---------------------------------
| r | n | b | q | k | b | n | r |
---------------------------------
| p | p | p | p | p | p | p | p |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
| P | P | P | P | P | P | P | P |
---------------------------------
| R | N | B | Q | K | B | N | R |
---------------------------------
`

        // Check board position to make sure the pawn was moved.
        assert.strictEqual(expected, BoardPrinter.printBoard(game, StandardTurns.white, true))
    })

    it(`Displays the board with a starting position from black's perspective.`, () => {
        let game = new ChessState(config)
        const expected = `---------------------------------
| R | N | B | Q | K | B | N | R |
---------------------------------
| P | P | P | P | P | P | P | P |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
|   |   |   |   |   |   |   |   |
---------------------------------
| p | p | p | p | p | p | p | p |
---------------------------------
| r | n | b | q | k | b | n | r |
---------------------------------
`

        // Check board position to make sure the pawn was moved.
        assert.strictEqual(expected, BoardPrinter.printBoard(game, StandardTurns.black, true))
    })

    it(`Displays the board with a starting position from white's perspective for debugging.`, () => {
        let game = new ChessState(config)
        const expected = `
  ---------------------------------
8 0 | r | n | b | q | k | b | n | r |
  ---------------------------------
7 1 | p | p | p | p | p | p | p | p |
  ---------------------------------
6 2 |   |   |   |   |   |   |   |   |
  ---------------------------------
5 3 |   |   |   |   |   |   |   |   |
  ---------------------------------
4 4 |   |   |   |   |   |   |   |   |
  ---------------------------------
3 5 |   |   |   |   |   |   |   |   |
  ---------------------------------
2 6 | P | P | P | P | P | P | P | P |
  ---------------------------------
1 7 | R | N | B | Q | K | B | N | R |
  ---------------------------------
      0   1   2   3   4   5   6   7
      A   B   C   D   E   F   G   H
`

        // Check board position to make sure the pawn was moved.
        assert.strictEqual(expected, BoardPrinter.printBoardDebug(game, false))
    })
})