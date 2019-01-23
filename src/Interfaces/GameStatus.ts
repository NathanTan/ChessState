import StandardTurns from "./Enums/StandardTurns"

interface GameStatus {
    gameOver:   boolean
    turn:       StandardTurns
    // totalTurns: number
    winner:     string
}

export default GameStatus