import History from "./History"
import FenExtras from "./FenExtras"
import BoardLoaction from "./BoardLocation";
import StandardTurns from "./Enums/StandardTurns";

interface State {
    board: Array<Array<string>>
    history: History
    gameOver: boolean
    turn: number
    fenExtras: FenExtras
    whiteKingLocation: BoardLoaction
    blackKingLocation: BoardLoaction
    winner: StandardTurns
    extraPiecesWhite: Array<string>
    extraPiecesBlack: Array<string>
}

export default State