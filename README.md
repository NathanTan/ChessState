A chess game state manager that is intended to be variant friendly.

Notes:
Uses webpack-cli

Build:
npm run build

Run:
npm start

Build Then Run:
npm run super


Library Terminology:
Moded Fen, ModFen, Moded Board, ModBoard => the normal fen string, just with the game start information ripped off the last row.


Standard Chess Grid:

  ---------------------------------
7 | r | n | b | q | k | b | n | r |
  ---------------------------------
6 | p | p | p | p | p | p | p | p |
  ---------------------------------
5 |   |   |   |   |   |   |   |   |
  ---------------------------------
4 |   |   |   |   |   |   |   |   |
  ---------------------------------
3 |   |   |   |   |   |   |   |   |
  ---------------------------------
2 |   |   |   |   |   |   |   |   |
  ---------------------------------
1 | P | P | P | P | P | P | P | P |
  ---------------------------------
0 | R | N | B | Q | K | B | N | R |
  ---------------------------------
    0   1   2   3   4   5   6   7