import History from "./History"

interface State {
    board: Array<Array<string>>;
    history: History;
    gameOver: boolean;
    turn: number;
}

export default State