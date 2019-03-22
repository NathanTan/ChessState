var assert = require('assert')
import ChessState from "../../src/ChessState"
import GameTypes from "../../src/Interfaces/Enums/GameTypes"
import Config from "../../src/Interfaces/Config"
import BoardPrinter from "../../src/BoardPrinter";
import StandardTurns from "../../src/Interfaces/Enums/StandardTurns";

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      false,
    hideOutput: false
}


describe('BugHouse: Board Printer Test', () => {
    it('Prints the starting default board', () => {
        const game = new ChessState(config)
        const hideOutput = true

        const expectedBoardPrint = `\t\tPlayer 0                                Player 2
		[]					[]

---------------------------------       ---------------------------------
| r | n | b | q | k | b | n | r |       | R | N | B | Q | K | B | N | R |
---------------------------------       ---------------------------------
| p | p | p | p | p | p | p | p |       | P | P | P | P | P | P | P | P |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
| P | P | P | P | P | P | P | P |       | p | p | p | p | p | p | p | p |
---------------------------------       ---------------------------------
| R | N | B | Q | K | B | N | R |       | r | n | b | q | k | b | n | r |
---------------------------------       ---------------------------------

\t\tPlayer 1                                Player 3
\t\t[]					[]
\n
`
        
        assert.strictEqual(BoardPrinter.printBoardBughouse(game.getBoardArray(0), game.getBoardArray(1), 
                                [[], [], [], []], StandardTurns.white, hideOutput), expectedBoardPrint)
    })

    it('Prints the starting default board but flipped', () => {
        const game = new ChessState(config)
        const hideOutput = true

        const expectedBoardPrint = `\t\tPlayer 1                                Player 3
		[]					[]

---------------------------------       ---------------------------------
| R | N | B | Q | K | B | N | R |       | r | n | b | q | k | b | n | r |
---------------------------------       ---------------------------------
| P | P | P | P | P | P | P | P |       | p | p | p | p | p | p | p | p |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
|   |   |   |   |   |   |   |   |       |   |   |   |   |   |   |   |   |
---------------------------------       ---------------------------------
| p | p | p | p | p | p | p | p |       | P | P | P | P | P | P | P | P |
---------------------------------       ---------------------------------
| r | n | b | q | k | b | n | r |       | R | N | B | Q | K | B | N | R |
---------------------------------       ---------------------------------\n
\t\tPlayer 0                                Player 2
\t\t[]					[]
\n
`
        
        assert.strictEqual(BoardPrinter.printBoardBughouse(game.getBoardArray(0), game.getBoardArray(1), 
                                [[], [], [], []], StandardTurns.black, hideOutput), expectedBoardPrint)
    })
})