class ExtraFenData {

    /*
     * Params:
     *      - who's turn it is ('w' or 'b')
     *      - castling availiblity (ex: 'KQkq')
     *      - the square where an en passant could potentially happen,
     *          even if no pawn can actually execut
     *      - number of halfmoves since the last capture or pawn advance
     *      - number of the full moves starting at 1, and  
     *          increments after Black moves
     */

    constructor(turn, castling, enPassant, halfMoves, fullMoves) {
        this.turn = turn
        this.castling = castling
        this.enPassant = enPassant
        this.halfMoves = halfMoves
        this.fullMoves = fullMoves
    }

    getFenTail() {
        return this.turn + " " +
            this.castling + " " +
            this.enPassant + " " +
            this.halfMoves + " " +
            this.fullMoves
    }
}

export default ExtraFenData