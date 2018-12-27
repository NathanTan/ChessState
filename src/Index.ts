import ChessState from './ChessState'
import TestGames from '../test/TestGames'
import GameTypes from './Interfaces/Enums/GameTypes';

let game = new ChessState(GameTypes.standard, null, true, TestGames["FriedLiverAttack"])

console.log("        ---Game Start---\n")

game.play()