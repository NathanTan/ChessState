import ChessState from './ChessState'
import TestGames from '../test/TestGames'
import GameTypes from './Interfaces/Enums';

let game = new ChessState(GameTypes.standard, null, true, TestGames["FourMove"])

console.log("        ---Game Start---\n")

game.play()