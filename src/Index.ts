import ChessState from './ChessState'
import TestGames from '../test/TestGames'
import GameTypes from './Interfaces/Enums/GameTypes';
import Config from './Interfaces/Config';

const config: Config = {
    gameType:   GameTypes.bughouse,
    fen:        null,
    debug:      true,
    hideOutput: false
}

let game = new ChessState(config)

console.log("        ---Game Start---\n")

for (let move of TestGames["4 Move Checkmate"]) {
    console.log("Move: " + JSON.stringify(move))
    game.move(move)
}
console.log(game.getStatus())