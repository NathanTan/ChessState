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
    static pgnToGridCordinates(pgn: string, turn: StandardTurns, gameType: GameTypes, capture: boolean, debug?: boolean): BoardLoaction {
        let location: BoardLoaction = { "row": -1, "column": -1 }
        
        if (gameType != undefined && gameType !== GameTypes.standard) {
            console.log("gameType: ")
            console.log(gameType)
            throw new Error("pgnToGridCordinate is not yet implemented for " + gameType.toString() + " variant")
        }
        
        switch (pgn[0]) {
            case "N": // Knight
            case "n":
                location.column = (pgn[1].charCodeAt(0) - 97)
                location.row =  (8 - +pgn[2]) 
                break
            case "B": // Bishop
            case "b":
                location.column = (pgn[1].charCodeAt(0) - 97)
                location.row =  (8 - +pgn[2]) 
                break
            case "R": // Rook
            case "r": 
                throw new Error("Rook not yet implemented")
                break
            case "Q": // Queen
            case "q":
                throw new Error("Queen not yet implemented")
                break
            case "K": // King 
            case "k":
                throw new Error("King not yet implemented")
                break
            default: // Pawn
                if(debug)
                    console.log("==pawn")
                if (!capture) {

                    location.column = (pgn[0].charCodeAt(0) - 97)
                    location.row = (turn === StandardTurns.white) ? (+pgn[1]) : (8 - +pgn[1])
                }
                else {
                    location.column = (pgn[2].charCodeAt(0) - 97)
                    location.row = (turn === StandardTurns.white) ? (+pgn[3]) : (8 - +pgn[3])
                }
            }
        return location
    }
}

export default HelperFunctions