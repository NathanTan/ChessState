/* Helper function */
class HelperFunctions {

    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Has one optional parameter for testing
    static getMove(opt) {
        if (opt) {
            return opt
        }
    }

    /*
     * Parameters:
     *      - PGN move
     *      - Which plays turn it is
     *      - game type [OPTIONAL]
     */
    static pgnToGridCordinates(pgn, turn, gameType) {
        let foo = { "row": "", "col": "" }
        
        if (gameType != undefined || gameType !== "standard") {
            Error("pgnToGridCordinate is not yet implemented for " + gameType + " variant")
        }
        
        switch (pgn[0]) {
            case "N": // Knight
                Error("Knight not yet implemented")
                break
            case "B": // Bishop
                Error("Bishop not yet implemented")
                break
            case "R": // Rook
                Error("Rook not yet implemented")
                break
            case "Q": // Queen
                Error("Queen not yet implemented")
                break
            case "K": // King 
                Error("King not yet implemented")
                break
            default: // Pawn
                foo.col = pgn[0].charCodeAt(0) - 97
                foo.row = pgn[1] - 1
        }
        return foo
    }
}

export default HelperFunctions