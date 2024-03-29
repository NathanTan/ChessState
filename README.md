# ChessState

### A chess game state manager that is intended to be variant friendly (eventually).

## Download
```
npm install --save chessstate
```
Link to NPM page: https://www.npmjs.com/package/chessstate

## Using ChessState
```
let ChessState = require("chessstate")

// Initalize a new game
let game = new ChessState.ChessState()  // Uses default config object

// Execute move "e4" for white.
game.move("e4")

// Execute move "e5" for black.
game.move("e5")

// Print out an ascii representation of the board.
game.printBoard()
```
Example of usage: https://github.com/NathanTan/ChessStateExample

## Initalization
```
// Defaul config object
const config = {
  gameType: 0, // Standard Chess (Currently only type availible)
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // Example FEN string of the starting position
  hideOutput: true // Will not output to the console
}

// Example config object
const config = {
  gameType: 0, // Standard Chess (Currently only type availible)
  fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", // Example FEN string of the boards position after the move "e4"
  hideOutput: true // Will not output to the console
}
```

## Methods
### move()
Executes a move.

Parameters: 
- **Move:** a string representing a chess move. Acceptable forms of moves constist of PGN string, FEN string, or resigning with the string "resign".

Examples:
```
> game.move("e4") // Move the white pawn to "e4" as the first move of the game
```
```
> game.move("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1") // Move the white pawn to "e4" as the first move of the game
```
```
> game.move("resign") // White resigns (Provided no player has moved yet)
```
### getStatus()
Returns an object containing the status of the game.

Parameters: None

Example:
```
> game.getStatus()
{ gameOver: false, turn: null, winner: null }
```

## Output
Standard Chess Grid:
```
               Black
  ---------------------------------
0 | r | n | b | q | k | b | n | r |
  ---------------------------------
1 | p | p | p | p | p | p | p | p |
  ---------------------------------
2 |   |   |   |   |   |   |   |   |
  ---------------------------------
3 |   |   |   |   |   |   |   |   |
  ---------------------------------
4 |   |   |   |   |   |   |   |   |
  ---------------------------------
5 |   |   |   |   |   |   |   |   |
  ---------------------------------
6 | P | P | P | P | P | P | P | P |
  ---------------------------------
7 | R | N | B | Q | K | B | N | R |
  ---------------------------------
    A   B   C   D   E   F   G   H
               White
```


## Basic Chess Information
**What is a [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) string?**

A FEN string represents a standard chess board and includes information about the state of the game, including important details such as which player has the next turn, castling availability, En Passant, Halfmoves, and Fullmoves.

**What is a [PGN](https://en.wikipedia.org/wiki/Portable_Game_Notation) string?**

A PGN string represents an individual chess move.

## Supported Varients
### Bughouse
Description:

Bughouse is a 4 player, 2v2 version of chess where 2 seperate games of chess happen simultaneously. But you and your teammate play opposite colors and when you capture a piece on your board, you pass it to your teammate where they can spend a turn placing it on their board.

#### Varient Usage

When placing a piece on the board that was captured by a teammate, add a tilda to the pgn.
Example:
```
> game.move("e4~")
```

Use the function "getExtraPieces" to get the extra pieces a player has available to them.
Example:
```
// Get the extra pieces for the first board that white can use
> game.getExtraPieces(0, StandardTurns.white)
```


## Notes
This library has no dependencies.

Base repository location: https://github.com/NathanTan/ChessState
