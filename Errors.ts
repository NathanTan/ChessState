/* Errors.js */

class Errors {
    static checkGameType(state) {
        if (typeof (state.gameType) === "undefined") {
            console.log("----------------------------------")
            console.log("-Error: Unrecognized variant type-")
            console.log("----------------------------------")
        }
        return null
    }
}

export default Errors