import History from "./History"
import FenExtras from "./FenExtras"

interface State {
    board: Array<Array<string>>;
    history: History;
    gameOver: boolean;
    turn: number;
    fenExtras: FenExtras;
}

export default State