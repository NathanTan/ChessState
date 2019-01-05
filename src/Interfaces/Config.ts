import GameTypes from "./Enums/GameTypes"

interface Config {
    gameType?:   GameTypes
    fen?:        string	        // Starting fen string
    debug?:      boolean
    testGame?:   any	            // For debugging purposes
    hideOutput?: boolean
}

export default Config