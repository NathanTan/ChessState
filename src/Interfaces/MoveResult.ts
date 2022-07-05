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
    invalidMove?:           string
    enableEnPassant:        string	        // If En Passant is allowed as a result of this move,
                                            //      fill with the proper string, else null
    executeEnPassant?:      boolean
    wasCapture?:            string	        // Null if no piece was captured, else the piece type that was captured.
    wasPieceDrop?:          string	        // Null if no piece was dropped, else the piece type that was dropped.
}

export default MoveResult