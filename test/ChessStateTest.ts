var assert = require('assert')
import ChessState from "../src/ChessState"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import BoardLoaction from "../src/Interfaces/BoardLocation"
import StandardTurns from "../src/Interfaces/Enums/StandardTurns"
import Config from "../src/Interfaces/Config"
import GameStatus from "../src/Interfaces/GameStatus";
import TestGames from "./TestGames";

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    hideOutput: true
}

describe('ChessState config handling', () => {
    it('Handles null config', () => {
        const game = new ChessState(null)
        console.log(game.getStatus())
        const expectedStatus = {
            gameOver:   false,
            turn:       null,
            winner:     null
        } as GameStatus

        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })
}) 

describe('ChessState squareIsSafeForKing function', function () {
    it(`Indicates that the square 0, 0 (A8) is safe from white's pieces on turn 1`, () => {
        const game = new ChessState(config)
        let squareOfInterest: BoardLoaction = {
            row:    0,
            column: 0
        }
        assert.equal(true, game.squareIsSafeForKing(squareOfInterest, StandardTurns.white, GameTypes.standard))
    })

    it(`Indicates that the square 5, 2 (C3) is not safe from white's pieces on turn 1`, () => {
        const game = new ChessState(config)
        // C3
        let squareOfInterest: BoardLoaction = {
            row:    5,
            column: 2
        }

        // Should return false because a knight can move to C3 on the first turn.
        assert.equal(false, game.squareIsSafeForKing(squareOfInterest, StandardTurns.white, GameTypes.standard, true))
    })

    it(`Indicates that the square 0, 0 (A8) is safe from black's pieces on turn 1`, () => {
        const game = new ChessState(config)
        let squareOfInterest: BoardLoaction = {
            row:    0,
            column: 0
        }
        assert.equal(true, game.squareIsSafeForKing(squareOfInterest, StandardTurns.black, GameTypes.standard))
    })
})

describe('ChessState games', () => {
    it(`Properly handles the '4 Move Checkmate'`, () => {
        const game = new ChessState(config)
        for (let move of TestGames["4 Move Checkmate"]) {
            game.move(move)
        }
        let expectedStatus = {
            gameOver: true,
            turn: null,
            winner: "white"
        } as GameStatus

        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })

    it(`Properly handles the 'The Immortal Game'`, () => {
        const game = new ChessState(config)
        for (let move of TestGames["The Immortal Game"]) {
            game.move(move)
        }
        let expectedStatus = {
            gameOver: true,
            turn: null,
            winner: "white"
        } as GameStatus

        assert.strictEqual(JSON.stringify(expectedStatus),
            JSON.stringify(game.getStatus()))
    })
})