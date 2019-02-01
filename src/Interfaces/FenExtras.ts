import StandardTurn from "./Enums/StandardTurns";

interface FenExtras {
    
    turn: StandardTurn;
    castling: string;
    enPassant?: string;  // 
    halfMoves: number;
    fullMoves: number;
}

export default FenExtras