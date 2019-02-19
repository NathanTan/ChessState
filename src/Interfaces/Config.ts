import GameTypes from "./Enums/GameTypes"

interface Config {
    gameType?:   GameTypes
    fen?:        string	        // Starting fen string
    fen2?:       string	        // Bughouse second fen string
    debug?:      boolean
    hideOutput?: boolean
}

export default Config