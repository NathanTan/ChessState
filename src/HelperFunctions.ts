import GameTypes from "./Interfaces/Enums/GameTypes";
import StandardTurns from "./Interfaces/Enums/StandardTurns";
import BoardLoaction from "./Interfaces/BoardLocation";

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
    // Use this to find piece start locations
    static pgnToGridCordinates(pgn: string, turn: StandardTurns, gameType: GameTypes): BoardLoaction {
        let location: BoardLoaction = { "row": -1, "column": -1 }
        
        if (gameType != undefined && gameType !== GameTypes.standard) {
            console.log("gameType: ")
            console.log(gameType)
            throw new Error("pgnToGridCordinate is not yet implemented for " + gameType.toString() + " variant")
        }
        
        switch (pgn[0]) {
            case "N": // Knight
                location.column = (pgn[1].charCodeAt(0) - 97)
                location.row = (turn === StandardTurns.white) ? (8 - +pgn[2]) : (+pgn[2])
                break
            case "B": // Bishop
                throw new Error("Bishop not yet implemented")
                break
            case "R": // Rook
                throw new Error("Rook not yet implemented")
                break
            case "Q": // Queen
                throw new Error("Queen not yet implemented")
                break
            case "K": // King 
                throw new Error("King not yet implemented")
                break
            default: // Pawn
                location.column = (pgn[0].charCodeAt(0) - 97)
                location.row = (turn === StandardTurns.white) ? (+pgn[1]) : (8 - +pgn[1])
        }
        return location
    }
}

export default HelperFunctions