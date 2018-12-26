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
}

export default Errors