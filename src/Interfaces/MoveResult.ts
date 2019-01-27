import BoardLoaction from "./BoardLocation";
import PieceTypes from "./Enums/PieceTypes"

interface MoveResult {
    whiteKingSideCastle:    boolean
    whiteQueenSideCastle:   boolean
    blackKingSideCastle:    boolean
    blackQueenSideCastle:   boolean
    kingLocation:           BoardLoaction
    movedPiece:             PieceTypes	    // If null then the move was a castle.
    movedPieceDest:         BoardLoaction
    check:                  boolean         // An indication if check happened.
    gameIsOver:             boolean
    moveIsInvalid:          boolean
    invalidMove?:            string
}

export default MoveResult