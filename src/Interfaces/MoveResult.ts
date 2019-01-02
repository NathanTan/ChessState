import BoardLoaction from "./BoardLocation";

interface MoveResult {
    whiteKingSideCastle:    boolean
    whiteQueenSideCastle:   boolean
    blackKingSideCastle:    boolean
    blackQueenSideCastle:   boolean
    kingLocation:           BoardLoaction
}

export default MoveResult