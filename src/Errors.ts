import GameTypes from "./Interfaces/Enums/GameTypes";

/* Errors.js */

class Errors {

    // TODO: Update this.
    static checkGameType(state: any): any {
        if (typeof (state.gameType) === "undefined") {
            console.log("----------------------------------")
            console.log("-Error: Unrecognized variant type-")
            console.log("----------------------------------")
        }
        return null
    }

    static gameTypeNotYetImplemented(state: any): any {
        if (state.gameType !== GameTypes.standard ||
            state.gameType !== GameTypes.bughouse) {
            throw new Error(`Error: Gametype '${state.gameType}' not yet implemented.`)
        }
        else {
            // If this case is reached, the function was called at the incorrect place.
            throw new Error(`Game Type ${state.gameType} is implemented.`)
        }
    }
}

export default Errors