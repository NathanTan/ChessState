import ChessState from './ChessState'
import TestGames from '../test/TestGames'
import Enums from './Interfaces/Enums'

let game = new ChessState(Enums.GameTypes.standard, null, true, TestGames["FourMove"])

console.log("        ---Game Start---\n")

game.play()