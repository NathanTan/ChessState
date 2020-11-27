var assert = require('assert')
import BoardAnalyzer from "../src/BoardAnalyzer"
import ChessState from "../src/ChessState"
import Config from "../src/Interfaces/Config"
import GameTypes from "../src/Interfaces/Enums/GameTypes"
import StandardTurns from "../src/Interfaces/Enums/StandardTurns"
import HelperFunctions from "../src/HelperFunctions"


const config: Config = {
    gameType: GameTypes.standard,
    fen: null,
    debug: true,
    hideOutput: true
}


describe('BoardAnalyzer', function () {
    it('should find the location of all the pieces on the board', () => {
        let game = new ChessState(config)

        let expected = [
            'a2', 'b2', 'c2', 'd2',
            'e2', 'f2', 'g2', 'h2',
            'a1', 'b1', 'c1', 'd1',
            'e1', 'f1', 'g1', 'h1'
        ];
        let result = game.getAllPossibleMovesForColor('w');

        for (let i = 0; i < expected.length; i++) {
            assert.strictEqual(expected[i], result[i])
        }


        // TODO: evaulate objects in a more robust way.
        // assert.strictEqual(JSON.stringify(expected), JSON.stringify(result))
    })
})

describe('BoardAnalyzer gets all possible moves for a piece properly', () => {
    it(`returns [e4, e3] for e2 from the starting position (white)`, () => {
        const game = new ChessState(config)
        const expected = ['e3', 'e4']
        const board = game.getBoardArray()
        const source = HelperFunctions.mapChessNotationToBoardPosition(`e2`)
        const color = StandardTurns.white
        const enPassant = null
        const gameType = GameTypes.standard

        // let result = game.getAllPossibleMovesForPiece('e2')
        let result = BoardAnalyzer.getAllPossibleMovesForAPawn(board, source, color, enPassant, gameType)

        assert.strictEqual(JSON.stringify(expected),
            JSON.stringify(result))
    })

    it(`returns [e5, e6] for e7 from the starting position (black)`, () => {
        const game = new ChessState(config)
        const expected = ['e6', 'e5']
        const board = game.getBoardArray()
        const source = HelperFunctions.mapChessNotationToBoardPosition(`e7`)
        const color = StandardTurns.black
        const enPassant = null
        const gameType = GameTypes.standard

        // let result = game.getAllPossibleMovesForPiece('e2')
        let result = BoardAnalyzer.getAllPossibleMovesForAPawn(board, source, color, enPassant, gameType)

        assert.strictEqual(JSON.stringify(expected),
            JSON.stringify(result))
    })

    it(`handles possible pawn movement for capturing a pawn`, () => {
        const game = new ChessState(config)
        game.move('e4')
        game.move('a5')
        game.move('e5')
        game.move('a4')
        game.move('e6')
        game.move('a3')

        let expected = ['f7', 'd7']
        let board = game.getBoardArray()
        let source = HelperFunctions.mapChessNotationToBoardPosition(`e6`)
        let color = StandardTurns.white
        let enPassant = null
        let gameType = GameTypes.standard

        let result = BoardAnalyzer.getAllPossibleMovesForAPawn(board, source, color, enPassant, gameType)

        assert.strictEqual(JSON.stringify(expected),
            JSON.stringify(result))

        game.move(`h4`)

        expected = [`b2`]
        board = game.getBoardArray()
        source = HelperFunctions.mapChessNotationToBoardPosition(`a3`)
        color = StandardTurns.black

        result = BoardAnalyzer.getAllPossibleMovesForAPawn(board, source, color, enPassant, gameType)

        assert.strictEqual(JSON.stringify(expected),
            JSON.stringify(result))
    })
})