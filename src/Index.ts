import ChessState from './ChessState'
import TestGames from '../PGNTestGame'

let game = new ChessState("standard", null, true, TestGames["FourMove"])

console.log("        ---Game Start---\n")

game.play()