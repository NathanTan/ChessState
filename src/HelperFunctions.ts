import GameTypes from "./Interfaces/Enums/GameTypes";
import StandardTurns from "./Interfaces/Enums/StandardTurns";

/* Helper function */
class HelperFunctions {

    static isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Has one optional parameter for testing
    static getMove(opt: string) {
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
    static pgnToGridCordinates(pgn: string, turn: StandardTurns, gameType: GameTypes) {
        let foo = { "row": "", "col": "" }
        
        if (gameType != undefined && gameType !== GameTypes.standard) {
            console.log("gameType: ")
            console.log(gameType)
            throw new Error("pgnToGridCordinate is not yet implemented for " + gameType.toString() + " variant")
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
                foo.col = (pgn[0].charCodeAt(0) - 97).toString()
                foo.row = (turn === StandardTurns.white) ? (+pgn[1]).toString() : (8 - +pgn[1]).toString()
        }
        return foo
    }
}

export default HelperFunctions