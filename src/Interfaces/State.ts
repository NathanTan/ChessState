import History from "./History"
import FenExtras from "./FenExtras"
import BoardLoaction from "./BoardLocation";

interface State {
    board: Array<Array<string>>
    history: History
    gameOver: boolean
    turn: number
    fenExtras: FenExtras
    whiteKingLocation: BoardLoaction
    blackKingLocation: BoardLoaction
}

export default State