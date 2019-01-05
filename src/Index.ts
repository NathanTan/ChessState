import ChessState from './ChessState'
import TestGames from '../test/TestGames'
import GameTypes from './Interfaces/Enums/GameTypes';
import Config from './Interfaces/Config';

const config: Config = {
    gameType:   GameTypes.standard,
    fen:        null,
    debug:      true,
    testGame:   TestGames["e4"],
    hideOutput: false
}

let game = new ChessState(config)

console.log("        ---Game Start---\n")

game.play()