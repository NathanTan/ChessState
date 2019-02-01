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
    static findPieceDestination(pgn: string, turn: StandardTurns, gameType: GameTypes, capture: boolean, debug?: boolean): BoardLoaction {
        let location: BoardLoaction = { "row": -1, "column": -1 }
        
        if (gameType != undefined && gameType !== GameTypes.standard) {
            console.log("gameType: ")
            console.log(gameType)
            throw new Error("pgnToGridCordinate is not yet implemented for " + gameType.toString() + " variant")
        }

        let pgnColumnIndex  = 1
        let pgnRowIndex     = 2

        if (capture) {
            pgnColumnIndex++
            pgnRowIndex++
        }

        // If not a pawn
        if (pgn[0] === "N" || pgn [0] === "n" ||
            pgn[0] === "B" || pgn [0] === "b" ||
            pgn[0] === "R" || pgn [0] === "r" ||
            pgn[0] === "K" || pgn [0] === "k" ||
            pgn[0] === "Q" || pgn [0] === "q" ||
            pgn[0] === "N" || pgn [0] === "n") {
            location.column = (pgn[pgnColumnIndex].charCodeAt(0) - 97)
            location.row =  (8 - +pgn[pgnRowIndex]) 
        }

        else {
            if(debug)
                    console.log("==pawn")
            if (!capture) {

                location.column = (pgn[0].charCodeAt(0) - 97)
                location.row = (8 - +pgn[1])
            }
            else {
                location.column = (pgn[2].charCodeAt(0) - 97)
                location.row = (8 - +pgn[3])
            }
        }
        
        return location
    }
}

export default HelperFunctions